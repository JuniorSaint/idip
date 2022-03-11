import {
  Box,
  Button,
  Flex,
  FormLabel,
  HStack,
  Icon,
  VStack,
  Input,
} from "@chakra-ui/react";
import jwt_decode from "jwt-decode";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { BsTrash } from "react-icons/bs";
import * as yup from "yup";

import { Input as Inputc } from "../../components/Form/Input";
import Header from "../../components/Header/header";
import { IDecodeToken } from "../../components/IDecodeToken";
import SidebarNav from "../../components/SideBar/SidebarNav";
import {
  IListExercise,
  IRegisterTraing,
} from "../../components/Training/ITraining";
import { useUserContextProvider } from "../../context/UserContext";
import { apiJson } from "../../services/api";

const trainingSchema = yup
  .object({
    userName: yup.string().required("Nome completo é obrigatório"),
    dateTraining: yup.date().required("Data do exercício é obrigatório"),
    listTraining: yup.object({
      id: yup.number(),
      exercise: yup.string().required("Email é obrigatório"),
      amount: yup.number().required("Quantidade de vezes é obrigatório"),
      weight: yup.number().required("Carga é obrigatório"),
    }),
  })
  .required();

interface RegisterTrainingProps {
  data: any;
}

export default function RegisterTraining({ data }: RegisterTrainingProps) {
  const { userForSelect } = useUserContextProvider();
  const [listExercise, setListExercise] = useState<IListExercise[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IRegisterTraing>({
    defaultValues: {
      listTraining: [
        {
          id: undefined,
          exerciseType: "",
          weight: undefined,
          amountRepetition: undefined,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "listTraining",
  });

  useEffect(() => {
    try {
      apiJson
        .get("exercises")
        .then((response) => setListExercise(response.data));
    } catch (error) {
      console.log(error.toJson());
    }
  }, []);

  const handleCreateListTraining = () => {
    append({
      exerciseType: "",
      weight: undefined,
      amountRepetition: undefined,
    });
  };

  const handleCreateListSubmit: SubmitHandler<IRegisterTraing> = async (
    value,
    event
  ) => {
    event.preventDefault();
    (values) => alert(JSON.stringify(values, null, 2));

    // try {
    //   await apiJson
    //     .post("/registedTraing", value)
    //     .then((response) => {
    //       console.log(response.data), reset();
    //     })
    //     .catch((error) => console.log(error.response.request._response));
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <Box>
      <Head>
        <title>Cadastrar Treino</title>
      </Head>{" "}
      <Header dataProp={data} />
      <Flex width="100%" my="6" maxWidth="1480px" mx="auto" px="6">
        <SidebarNav data={data} />
        <Flex as="form" onSubmit={handleSubmit(handleCreateListSubmit)}>
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
                <Inputc
                  name="dateTraining"
                  type="date"
                  labelName="Data do Treino"
                  {...register("dateTraining")}
                />
                <p>{errors.dateTraining?.message}</p>
              </Flex>
            </Flex>

            <Flex>
              <Flex
                flex="1"
                borderRadius={8}
                backgroundColor="gray.800"
                padding={["6", "8"]}
                flexDirection="column"
              >
                {fields.map((field, index) => {
                  return (
                    <HStack spacing="10px" key={field.id}>
                      <Flex flexDirection="column" flex="1">
                        <FormLabel marginLeft="10px">
                          Selecione o Exercício
                        </FormLabel>
                        <select
                          style={{
                            width: "360px",
                            background: "#171923",
                            height: "48px",
                            paddingLeft: "10px",
                            borderRadius: "5px",
                            marginRight: "10px",
                            fontFamily: "Roboto",
                          }}
                          {...register(
                            `listTraining.${index}.exerciseType` as const
                          )}
                        >
                          <option value="">...</option>
                          {listExercise.map((data) => {
                            return (
                              <option value={data.exerciseType} key={data.id}>
                                {data.exerciseType}
                              </option>
                            );
                          })}
                        </select>
                      </Flex>
                      <Flex flexDirection="column">
                        <FormLabel marginLeft="10px">Carga</FormLabel>
                        <Input
                          key={field.id}
                          type="number"
                          backgroundColor="gray.900"
                          variant="filled"
                          _hover={{ backgroundColor: "gray.900" }}
                          size="lg"
                          {...register(`listTraining.${index}.weight` as const)}
                        />
                      </Flex>

                      <Flex flexDirection="column">
                        <FormLabel marginLeft="10px">Repetição</FormLabel>
                        <Input
                          backgroundColor="gray.900"
                          variant="filled"
                          _hover={{ backgroundColor: "gray.900" }}
                          size="lg"
                          type="number"
                          {...register(
                            `listTraining.${index}.amountRepetion` as const
                          )}
                        />
                      </Flex>

                      <span style={{ marginRight: "10px" }}></span>

                      <Flex>
                        {index > 0 ? (
                          <Button
                            marginTop="32px"
                            onClick={() => remove(index)}
                            backgroundColor="red.500"
                            _hover={{ backgroundColor: "red.300" }}
                          >
                            {" "}
                            <Icon as={BsTrash} fontSize="20px"></Icon>{" "}
                          </Button>
                        ) : (
                          <Button
                            width="52px"
                            backgroundColor="gray.800"
                            _hover={{ backgroundColor: "gray.800" }}
                            _active={{ borderColor: "gray.800" }}
                          ></Button>
                        )}
                      </Flex>
                    </HStack>
                  );
                })}
                <Flex justifyContent="flex-end">
                  <Button
                    height="42px"
                    width="120px"
                    margin="30px 0 0 1rem"
                    backgroundColor="orange.500"
                    _hover={{ backgroundColor: "orange.400" }}
                    onClick={() => {
                      handleCreateListTraining();
                    }}
                  >
                    Adicionar
                  </Button>
                </Flex>
              </Flex>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const destructureCookie: IDecodeToken = jwt_decode(
    context.req.cookies.idipToken
  );
  const data: IDecodeToken = destructureCookie;

  return { props: { data } };
};
