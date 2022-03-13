import {
  Button,
  Flex,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";

import jwt_decode from "jwt-decode";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../../components/Header/header";
import { IDecodeToken } from "../../../components/IDecodeToken";
import SidebarNav from "../../../components/SideBar/SidebarNav";
import { IRegisterTraing } from "../../../components/Training/ITraining";
import { apiJson } from "../../../services/api";

interface ListUsersProps {
  data: any;
}

export default function UserExerciseToDo({ data }: ListUsersProps) {
  const [listExec, setListExec] = useState<IRegisterTraing>();
  const router = useRouter();

  function reviewTraining(id) {
    router?.push(`/training/userexercisetodo/review/${id}`);
  }

  useEffect(() => {
    // api.get(`/registedTraining/users/${data.sid}`)
    // .then((resp) => setListExec(resp.data));
    apiJson.get("/registedTraing").then((resp) => {
      setListExec(resp.data), console.log(resp.data);
    });
  }, []);

  return (
    <Flex flexDirection="column">
      <Head>
        <title>Exercícios a fazer</title>
      </Head>{" "}
      <Header dataProp={data} />
      <Flex width="100%" my="6" maxWidth="1480px" mx="auto" px="6">
        <SidebarNav data={data} />
      </Flex>
      <Flex>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nome do Usuário</Th>
              <Th isNumeric>Data </Th>
              <Th isNumeric>Ação</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr key={listExec?.id}>
              <Td>{listExec?.userName}</Td>
              <Td>{listExec?.dateTraining}</Td>
              <Td>
                {" "}
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
          </Tbody>
        </Table>
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
