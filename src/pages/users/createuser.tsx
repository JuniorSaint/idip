import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input as InputC,
  Select,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { Input } from "../../components/Form/Input";
import Header from "../../components/Header/header";
import SidebarNav from "../../components/SideBar/SidebarNav";
import { IUserProps } from "../../components/User/IUser";
import { api } from "../../services/api";

const userSchema = yup
  .object({
    fullName: yup.string().required("Nome completo é obrigatório"),
    userName: yup.string().required("Nome do usuário é obrigatório"),
    userEmail: yup
      .string()
      .required("Email é obrigatório")
      .email("Formato do email errado"),
    password: yup.string().required("Senha é obrigatório"),
    passwordConfirm: yup
      .string()
      .oneOf([null, yup.ref("password")], "As senhas precisam ser iguais"),
    userImage: yup.string(),
    isActive: yup.bool().required("Situação do usuário deverá ser informada"),
    userType: yup.string().required("Tipo de usuário obrigatorio"),
    birthdayDate: yup.date(),
  })
  .required();

interface CreateUserProps {
  data: any;
}

export default function CreateUser({ data }) {
  function getServerSideProps() {
    return;
  }
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<IUserProps>({
    resolver: yupResolver(userSchema),
  });

  const handleCreateUser: SubmitHandler<IUserProps> = async (value, event) => {
    event.preventDefault();
    console.log(value);

    try {
      await api
        .post("/users", value)
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
        <Box
          as="form"
          flex="1"
          borderRadius={8}
          backgroundColor="gray.800"
          padding={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Cadastro de Usuário
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing="8">
            <Flex flexDirection="column" width="100%">
              <FormLabel htmlFor="fullName">Nome Completo</FormLabel>
              <InputC
                id="fullName"
                {...register("fullName")}
                focusBorderColor="pink.500"
                backgroundColor="gray.900"
                variant="filled"
                _hover={{ backgroundColor: "gray.900" }}
                size="lg"
              ></InputC>
              <p>{errors.fullName?.message}</p>
            </Flex>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">
              <Flex flexDirection="column">
                <Input
                  name="userName"
                  type="text"
                  labelName="Nome usuário"
                  {...register("userName")}
                />{" "}
                <p>{errors.userName?.message}</p>
              </Flex>
              <Flex flexDirection="column">
                <Input
                  name="userEmail"
                  type="userEmail"
                  labelName="E-mail"
                  {...register("userEmail")}
                />
                <p>{errors.userEmail?.message}</p>
              </Flex>
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">
              <Flex flexDirection="column">
                <Input
                  name="password"
                  type="password"
                  labelName="Senha"
                  {...register("password")}
                />
                <p>{errors.password?.message}</p>
              </Flex>
              <Flex flexDirection="column">
                <Input
                  name="passwordConfirm"
                  type="password"
                  labelName="Confirmar Senha"
                  {...register("passwordConfirm")}
                />
                <p>{errors.passwordConfirm?.message}</p>
              </Flex>
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">
              <Input
                name="userImage"
                type="userImage"
                labelName="Foto do usuário"
                {...register("userImage")}
              />
              <Flex flexDirection="column">
                <FormControl as="fieldset">
                  <Flex flexDirection="column">
                    <FormLabel as="legend">Tipo de Usuário</FormLabel>
                    <Select
                      placeholder="..."
                      {...register("userType")}
                      focusBorderColor="pink.500"
                      backgroundColor="gray.900"
                      height="48px"
                      variant="filled"
                    >
                      <option value="admin">Administrador</option>
                      <option value="user">Usuário </option>
                    </Select>
                    <p>{errors.userType?.message}</p>
                  </Flex>
                </FormControl>
              </Flex>
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">
              <Flex flexDirection="column">
                <FormLabel as="legend">Situação do Usuário</FormLabel>
                <Select
                  placeholder="..."
                  {...register("isActive")}
                  focusBorderColor="pink.500"
                  backgroundColor="gray.900"
                  height="48px"
                  variant="filled"
                  _hover={{ backgroundColor: "gray.900" }}
                >
                  <option value="true">Ativo</option>
                  <option value="false">Inativo </option>
                </Select>
                <p>{errors.isActive?.message}</p>
              </Flex>
              <Flex flexDirection="column">
                <Input
                  name="birthdayDate"
                  type="date"
                  labelName="Data de Nascimento"
                  {...register("birthdayDate")}
                />
                <p>{errors.birthdayDate?.message}</p>
              </Flex>
            </SimpleGrid>
          </VStack>
          <Flex marginTop="24px" gap="16px" justifyContent="flex-end">
            <HStack>
              <Button type="submit" colorScheme="twitter">
                Salvar
              </Button>

              <Button type="reset" colorScheme="teal">
                Limpar
              </Button>
            </HStack>
          </Flex>
        </Box>
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
