import { Flex } from "@chakra-ui/react";

export default function UserExerciseToDo() {
  return (
    <>
      <Flex></Flex>
    </>
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
