import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import Header from "../../components/Header/header";
import SidebarNav from "../../components/SideBar/SidebarNav";
import { IUserListProps } from "../../components/User/IUser";

import { api } from "../../services/api";

interface ListUsersProps {
  data: any;
}

export default function ListUsers({ data }) {
  const router = useRouter();

  const [users, setUsers] = useState<IUserListProps[]>([]);

  async function updateTable() {
    const response = await api.get("users");
    setUsers(response.data);
  }

  function handleDelete(id) {
    api.delete(`users/${id}`).then(() => updateTable());
  }

  function handleUpdate(id) {
    Router.push(`/users/${id}`);
  }

  const fetchData = async () => {
    const retriveData = await api.get("users");
    return retriveData.data;
  };

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await fetchData();
      if (allUsers) setUsers(allUsers);
    };
    getAllUsers();
  }, []);

  return (
    <Box>
      <Head>
        <title>Lista de Usuário</title>
      </Head>
      <Header dataProp={data} />
      <Flex width="100%" my="6" maxWidth="1480px" mx="auto" px="6">
        <SidebarNav data={data} />

        <Flex as="main" flex="1">
          <Flex>
            <Flex>
              <Table variant="simple">
                <Thead>
                  <Tr height="20px">
                    <Th>Nome / Email</Th>
                    <Th>Tipo de usuário</Th>
                    <Th>Estado do usuário</Th>
                    <Th>Data da Aniversário</Th>
                    <Th>Ações</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {users.map((data) => {
                    return (
                      <Tr key={data.id} height="30px">
                        <Td>
                          {data.userName} <br /> <span>{data.userEmail}</span>
                        </Td>
                        <Td>{data.userType}</Td>
                        <Td>{data.isActive === true ? "Ativo" : "Inativo"}</Td>
                        <Td>
                          {" "}
                          {new Intl.DateTimeFormat("pt-BR").format(
                            data.birthdayDate
                          )}
                        </Td>
                        <Td>
                          <HStack spacing="10px">
                            <Button
                              backgroundColor="gray.900"
                              _hover={{ bg: "gray.800" }}
                              onClick={() => handleUpdate(data.id)}
                            >
                              {" "}
                              <Icon
                                as={AiOutlineEdit}
                                fontSize="25px"
                                color="blue.500"
                              />
                            </Button>
                            <Button
                              onClick={() => handleDelete(data.id)}
                              backgroundColor="gray.900"
                              _hover={{ bg: "gray.800" }}
                              _active={{
                                borderColor: "gray.900",
                              }}
                            >
                              {" "}
                              <Icon
                                as={BsTrash}
                                fontSize="25px"
                                color="red.500"
                              />
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    );
                  })}
                  <Tr></Tr>
                </Tbody>
              </Table>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

import jwt_decode from "jwt-decode";
import { GetServerSideProps } from "next";
import Head from "next/head";

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
