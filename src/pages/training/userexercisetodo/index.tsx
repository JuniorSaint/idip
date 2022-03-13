import {
  Box,
  Button,
  Flex,
  FormLabel,
  Icon,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import jwt_decode from "jwt-decode";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";

import Header from "../../../components/Header/header";
import { IDecodeToken } from "../../../components/IDecodeToken";
import SidebarNav from "../../../components/SideBar/SidebarNav";
import { IRegisterTraing } from "../../../components/Training/ITraining";
import { apiJson } from "../../../services/api";

interface ListExerciseByUser {
  data: any;
}

export default function ListExerciseByUser({ data }) {
  const [userName, setUserName] = useState<string>("");
  const [initialDate, setInitialDate] = useState<string>();
  const [finalDate, setFinalDate] = useState<string>();
  const [listExercise, setListExercise] = useState<IRegisterTraing[]>([]);
  const [searchExercise, setSearchExercise] = useState<IRegisterTraing[]>([]);
  const router = useRouter();

  function reviewTraining(id) {
    router?.push(`/training/userexercisetodo/review/${id}`);
  }

  function searchExerciseByUser(value) {
    apiJson.get("/registedTraing").then((resp) => {
      setListExercise(resp.data), console.log(resp.data);
    }); // fazer verificação do id do usuário e condição de treino
  }

  useEffect(() => {
    try {
      apiJson.get("registedTraing").then((response) => {
        setListExercise(response.data),
          console.log(JSON.stringify(listExercise, null, 2));
      });
    } catch (error) {
      console.error(error.toJson());
    }
  }, []);

  return (
    <Box>
      <Head>
        <title>Exercício Usuário</title>
      </Head>
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
                <option value="">... </option>
                <option value="true"> Concluído</option>
                <option value="false"> Não Concluído</option>
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
                  searchExerciseByUser(initialDate);
                }}
              >
                <Icon as={BsSearch} />
                <span style={{ marginLeft: "5px" }}>Procurar</span>
              </Button>
            </Flex>
          </Flex>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nome do Usuário</Th>
                <Th isNumeric>Data </Th>
                <Th isNumeric>Situação do Treino</Th>
                <Th isNumeric>Ação</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listExercise?.map((data) => {
                return (
                  <Tr key={data.id}>
                    <Td>{data?.userName}</Td>
                    <Td isNumeric>
                      {new Intl.DateTimeFormat("pt-BR").format(
                        new Date(data?.dateTraining)
                      )}
                    </Td>
                    <Td isNumeric>
                      {data.isPaid === true ? "Concluído" : "Não Concluído"}
                    </Td>
                    <Td isNumeric>
                      <Button
                        backgroundColor="red.300"
                        onClick={() => {
                          reviewTraining(data?.id);
                        }}
                      >
                        Visualizar Treino
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </VStack>
      </Flex>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const destructureCookie: IDecodeToken = jwt_decode(
    context.req.cookies.idipToken
  );
  const data: IDecodeToken = destructureCookie;

  return { props: { data } };
};
