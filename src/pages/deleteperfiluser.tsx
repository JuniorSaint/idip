import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import jwt_decode from "jwt-decode";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useState } from "react";

import Header from "../components/Header/header";
import { IDecodeToken } from "../components/IDecodeToken";
import SidebarNav from "../components/SideBar/SidebarNav";
import { signOut } from "../context/AuthContext";
import { api } from "../services/api";

interface RegisterTrainingProps {
  data: any;
}

export default function DeletePerfilUser({ data }: RegisterTrainingProps) {
  const [inputValue, setInputValue] = useState<string>("");

  function deletePerfil() {
    if (inputValue === data.email) {
      api.delete(`users/all/${data.sid}`);
      signOut();
    }
  }

  return (
    <Flex flexDirection="column">
      <Head>
        <title>Apagar Usuário</title>
      </Head>{" "}
      <Header dataProp={data} />
      <Flex width="100%" my="6" maxWidth="1480px" mx="auto" px="6">
        <SidebarNav data={data} />
        <Flex w="100vw" h="80vh" align="center" justifyContent="center">
          <Flex
            as="form"
            width="100%"
            maxWidth="500px"
            backgroundColor="gray.800"
            padding="8"
            borderRadius={8}
            flexDirection="column"
          >
            <Box>
              <Text
                fontSize="1.5rem"
                fontWeight="bold"
                align="center"
                marginBottom="1rem"
                color="red.400"
              >{`Exclusão de perfil do usuário ${data.name}`}</Text>
              <Text>Se deseje exlcuir seu perfil digite seu email:</Text>
              <Text fontSize="1.2rem" margin="15px 0" align="center">
                {" "}
                {data.email}
              </Text>

              <Text marginBottom="1rem">
                Lembrando caso opte em excluir será deletado seu perfil e todo
                seu histórico{" "}
              </Text>
            </Box>
            <Divider margin="1rem 0" />
            <Stack spacing="8px">
              <Input
                name="email"
                type="email"
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
              />
            </Stack>
            <Button
              marginTop="6"
              colorScheme="pink"
              size="lg"
              onClick={() => {
                deletePerfil();
              }}
            >
              Deletar{" "}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const destructureCookie: IDecodeToken = jwt_decode(
    context.req.cookies.idipToken
  );

  const data: IDecodeToken = destructureCookie;

  return { props: { data } };
};
