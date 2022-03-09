import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { useContext } from "react";

interface ProfileProps {
  showProfileData: boolean;
  data;
}
export default function Profile({
  showProfileData = true,
  data,
}: ProfileProps) {
  // const avatar = `/public/images/${data.acr}`;
  return (
    <Flex align="center">
      {showProfileData && (
        <Box marginRight="center" textAlign="right">
          <Text>{data?.name}</Text>
          <Text color="gray.300" fontSize="small">
            {data?.email}
          </Text>
        </Box>
      )}
      {/* <Avatar marginLeft="8px" size="md" name="José Atanazio" src={avatar} /> */}
    </Flex>
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

import jwt_decode from "jwt-decode";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const destructureCookie: IDecodeToken = jwt_decode(
    context.req.cookies.idipToken
  );
  const data: IDecodeToken = destructureCookie;

  return { props: { data } };
};
