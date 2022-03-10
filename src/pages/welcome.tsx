import { Box, Flex } from "@chakra-ui/react";
import jwt_decode from "jwt-decode";
import { GetServerSideProps } from "next";

import Header from "../components/Header/header";
import SidebarNav from "../components/SideBar/SidebarNav";

export default function Welcome({ data }) {
  return (
    <Box>
      <Header dataProp={data} />
      <Flex width="100%" my="6" maxWidth="1480px" mx="auto" px="6">
        <SidebarNav data={data} />
        <Flex>{data.email}</Flex>
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
