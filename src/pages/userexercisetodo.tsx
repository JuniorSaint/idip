import { Flex } from "@chakra-ui/react";

import jwt_decode from "jwt-decode";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Header from "../components/Header/header";
import { IDecodeToken } from "../components/IDecodeToken";
import SidebarNav from "../components/SideBar/SidebarNav";
import { getServerSideProps } from "../context/CookieContex";

interface ListUsersProps {
  data: any;
}

export default function UserExerciseToDo({ data }: ListUsersProps) {
  return (
    <Flex>
      <Head>
        <title>Exercícios a fazer</title>
      </Head>{" "}
      <Header dataProp={data} />
      <Flex width="100%" my="6" maxWidth="1480px" mx="auto" px="6">
        <SidebarNav data={data} />
      </Flex>
    </Flex>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const destructureCookie: IDecodeToken = jwt_decode(
//     context.req.cookies.idipToken
//   );
//   const data: IDecodeToken = destructureCookie;

//   return { props: { data } };
// };
