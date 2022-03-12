import {
  Flex,
  Table,
  TableCaption,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import jwt_decode from "jwt-decode";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

import { IDecodeToken } from "../../components/IDecodeToken";
import { IRegisterTraing } from "../../components/Training/ITraining";
import { apiJson } from "../../services/api";

interface CreateUserProps {
  data: any;
}

export default function Userexercisetodo({ data }: CreateUserProps) {
  const [listExec, setListExec] = useState<IRegisterTraing[]>([]);

  useEffect(() => {
    const result = apiJson.get("/registedTraing");
    console.log(result);
  }, []);

  useEffect(() => {}, []);

  function executeExercice(id) {}

  return (
    <Flex flexDirection="row">
      <Table variant="simple">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>Usuário</Th>
            <Th>Data</Th>
            <Th>Ação</Th>
          </Tr>
        </Thead>
        <Tbody>
          {/* {
            {listExec.map(resp => {
              return(
                <Tr key={resp.id}>
          <Td>{resp.userName}</Td>
          <Td>{resp.dateTraining}</Td>
          <Td><Button   onClick={() => executeExercice(resp.id)}  >Visualizar</Button></Td>
     
                </Tr>
              )
            })}
          } */}
        </Tbody>
      </Table>
      <Flex>{/* <CardList listUsers={} /> */}</Flex>
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
