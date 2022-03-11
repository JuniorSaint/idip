import { Flex } from "@chakra-ui/react";

import jwt_decode from "jwt-decode";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { IDecodeToken } from "../components/IDecodeToken";

export default function UserExerciseToDo() {
  return (
    <>
      <Flex>
        <Head>
          <title>Exercícios a fazer</title>
        </Head>{" "}
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const destructureCookie: IDecodeToken = jwt_decode(
    context.req.cookies.idipToken
  );
  const data: IDecodeToken = destructureCookie;

  return { props: { data } };
};
