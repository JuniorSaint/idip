import { Box, Button, Flex, FormLabel, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { Input } from "../../components/Form/Input";
import Header from "../../components/Header/header";
import SidebarNav from "../../components/SideBar/SidebarNav";
import InsertItemsToRender from "../../components/Training/InsertItemsToRender";
import { IRegisterTraing } from "../../components/Training/ITraining";
import { useUserContextProvider } from "../../context/UserContext";

const trainingSchema = yup
  .object({
    userName: yup.string().required("Nome completo é obrigatório"),
    exercise: yup.string().required("Email é obrigatório"),
    amount: yup.number().required("Quantidade de vezes é obrigatório"),
    weight: yup.number().required("Carga é obrigatório"),
    dateTraining: yup.date().required("Data do exercício é obrigatório"),
  })
  .required();

export default function RegisterTraining() {
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
    console.log(value);

    // try {
    //   await api
    //     .post("/users", value)
    //     .then((response) => {
    //       console.log(response.data), reset();
    //     })
    //     .catch((error) => console.log(error.response.request._response));
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <Box as="form" onSubmit={handleSubmit(handleCreateListTraining)}>
      <Header />
      <Flex width="100%" my="6" maxWidth="1480px" mx="auto" px="6">
        <SidebarNav />
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
                style={{
                  background: "#171923",
                  height: "48px",
                  paddingLeft: "10px",
                  borderRadius: "5px",
                  marginRight: "10px",
                  fontFamily: "Roboto",
                }}
              >
                {userForSelect?.map((data) => {
                  return (
                    <option value={data?.fullName}>{data?.fullName}</option>
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
              backgroundColor="green.500"
              _hover={{ backgroundColor: "green.300" }}
              margin="15px 0"
            >
              Salvar
            </Button>
          </Flex>
        </VStack>
      </Flex>
    </Box>
  );
}
