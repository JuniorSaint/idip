import { Box, Button, Flex, FormLabel, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import jwt_decode from "jwt-decode";
import { GetServerSideProps } from "next";

import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { Input } from "../../components/Form/Input";
import Header from "../../components/Header/header";
import SidebarNav from "../../components/SideBar/SidebarNav";
import InsertItemsToRender from "../../components/Training/InsertItemsToRender";
import { IRegisterTraing } from "../../components/Training/ITraining";
import { useUserContextProvider } from "../../context/UserContext";
import { apiJson } from "../../services/api";

const trainingSchema = yup
  .object({
    // userName: yup.string().required("Nome completo é obrigatório"),
    // exercise: yup.string().required("Email é obrigatório"),
    // amount: yup.number().required("Quantidade de vezes é obrigatório"),
    // weight: yup.number().required("Carga é obrigatório"),
    // dateTraining: yup.date().required("Data do exercício é obrigatório"),
  })
  .required();

interface RegisterTrainingProps {
  data: any;
}

export default function RegisterTraining({ data }: RegisterTrainingProps) {
  const { userForSelect } = useUserContextProvider();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IRegisterTraing>({
    resolver: yupResolver(trainingSchema),
  });

  const handleCreateListTraining: SubmitHandler<IRegisterTraing> = async (
    value,
    event
  ) => {
    event.preventDefault();
    console.log("passei aqui");

    try {
      await apiJson
        .post("/registedTraing", value)
        .then((response) => {
          console.log(response.data), reset();
        })
        .catch((error) => console.log(error.response.request._response));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Header dataProp={data} />
      <Flex width="100%" my="6" maxWidth="1480px" mx="auto" px="6">
        <SidebarNav data={data} />
        <Flex as="form" onSubmit={handleSubmit(handleCreateListTraining)}>
          <VStack>
            <Flex
              flexDirection="row"
              maxWidth="1480px"
              width="100%"
              borderRadius={8}
              backgroundColor="gray.800"
              padding={["6", "8"]}
            >
              <Flex flexDirection="column" flex="1">
                <FormLabel as="legend">Nome do Usuário</FormLabel>

                <select
                  {...register("userName")}
                  style={{
                    background: "#171923",
                    height: "48px",
                    paddingLeft: "10px",
                    borderRadius: "5px",
                    marginRight: "10px",
                    fontFamily: "Roboto",
                  }}
                >
                  <option>...</option>
                  {userForSelect?.map((resp) => {
                    return (
                      <option key={resp.id} value={resp?.id}>
                        {resp?.fullName}
                      </option>
                    );
                  })}
                </select>
                <p>{errors.userName?.message}</p>
              </Flex>
              <Flex flexDirection="column" width="200px" marginLeft="1rem">
                <Input
                  name="dateTraining"
                  type="date"
                  labelName="Data do Treino"
                  {...register("dateTraining")}
                />
                <p>{errors.dateTraining?.message}</p>
              </Flex>
            </Flex>

            <Flex>
              <InsertItemsToRender />
            </Flex>
            <Flex width="100%">
              <Button
                type="submit"
                width="120px"
                backgroundColor="green.500"
                _hover={{ backgroundColor: "green.300" }}
                margin="15px 0"
              >
                Salvar
              </Button>
            </Flex>
          </VStack>
        </Flex>
      </Flex>
    </Box>
  );
}

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
