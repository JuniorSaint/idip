import {
  Box,
  Button,
  Flex,
  FormLabel,
  Icon,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";

import Header from "../../components/Header/header";
import SidebarNav from "../../components/SideBar/SidebarNav";
import { IRegisterTraing } from "../../components/Training/ITraining";
import { useUserContextProvider } from "../../context/UserContext";
import { apiJson } from "../../services/api";

interface ListExerciseByUser {
  data: any;
}

export default function ListExerciseByUser({ data }) {
  const [userName, setUserName] = useState<string>("");
  const [initialDate, setInitialDate] = useState<string>();
  const [finalDate, setFinalDate] = useState<string>();
  const [listExercise, setListExercise] = useState<IRegisterTraing[]>([]);

  const { userForSelect } = useUserContextProvider();

  useEffect(() => {
    try {
      apiJson.get("registedTraing").then((response) => {
        setListExercise(response.data);
      });
    } catch (error) {
      console.error(error.toJson());
    }
  }, []);

  function searchExerciseByUser(initialDate, finalDate) {
    if (initialDate > finalDate) {
      [initialDate, finalDate] = [finalDate, initialDate];
      console.log(`inicial ${initialDate} final ${initialDate}`);
    }
    const result = listExercise.map((resp) => {
      return resp.dateTraining >= initialDate && resp.dateTraining <= finalDate
        ? resp
        : null;
    });

    console.log(listExercise);
  }

  return (
    <Box>
      <Header dataProp={data} />
      <Flex width="100%" my="6" maxWidth="1480px" mx="auto" px="6">
        <SidebarNav data={data} />

        <VStack>
          <Flex
            flexDirection="row"
            maxWidth="1480px"
            width="100%"
            borderRadius={8}
            backgroundColor="gray.800"
            padding={["6", "8"]}
          >
            <Flex flexDirection="column">
              <FormLabel as="legend">Nome do Usuário</FormLabel>

              <select
                style={{
                  width: "400px",
                  background: "#171923",
                  height: "48px",
                  paddingLeft: "10px",
                  borderRadius: "5px",
                  marginRight: "10px",
                  fontFamily: "Roboto",
                }}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                value={userName}
              >
                {userForSelect.map((resp) => {
                  return (
                    <option value={resp?.id} key={resp.id}>
                      {resp?.fullName}
                    </option>
                  );
                })}
              </select>
            </Flex>
            <Flex flexDirection="column" width="200px" marginLeft="1rem">
              <FormLabel>Período Inicial</FormLabel>
              <Input
                name="initialDate"
                type="date"
                value={initialDate?.toString()}
                onChange={(e) => setInitialDate(e.target.value)}
              />
            </Flex>
            <Flex flexDirection="column" width="200px" marginLeft="1rem">
              <FormLabel>Período Final</FormLabel>
              <Input
                name="dateTraining"
                type="date"
                value={finalDate?.toString()}
                onChange={(e) => setFinalDate(e.target.value)}
              />
            </Flex>
            <Flex>
              <Button
                height="43px"
                backgroundColor="orange.400"
                margin="30px 0 0 1rem"
                onClick={() => {
                  searchExerciseByUser(initialDate, finalDate);
                }}
              >
                <Icon as={BsSearch} />
                <span style={{ marginLeft: "5px" }}>Procurar</span>
              </Button>
            </Flex>
          </Flex>

          <Flex>{/* <ItemsToRender /> */}</Flex>
        </VStack>
      </Flex>
    </Box>
  );
}

import jwt_decode from "jwt-decode";
import { GetServerSideProps } from "next";

interface IDecodeToken {
  acr: string; // foto
  aud: string; //
  email: string; // email
  exp: number; // expiração
  sub: string; // tipo de usuário
  name: string; // userName
  sid: string; // id do usuário
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const destructureCookie: IDecodeToken = jwt_decode(
    context.req.cookies.idipToken
  );
  const data: IDecodeToken = destructureCookie;

  return { props: { data } };
};
