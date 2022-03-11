import { Box, Flex } from "@chakra-ui/react";
import jwt_decode from "jwt-decode";
import { GetServerSideProps } from "next";
import Head from "next/head";

import Header from "../components/Header/header";
import { IDecodeToken } from "../components/IDecodeToken";
import SidebarNav from "../components/SideBar/SidebarNav";

export default function Welcome({ data }) {
  return (
    <Box>
      <Head>
        <title>Bem vindo ao IdIp</title>
      </Head>{" "}
      <Header dataProp={data} />
      <Flex width="100%" my="6" maxWidth="1480px" mx="auto" px="6">
        <SidebarNav data={data} />
        <Flex>{data.email}</Flex>
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
