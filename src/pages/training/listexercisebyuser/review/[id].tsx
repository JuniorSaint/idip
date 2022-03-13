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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { IDecodeToken } from "../../../../components/IDecodeToken";
import { IRegisterTraing } from "../../../../components/Training/ITraining";
import { apiJson } from "../../../../services/api";

interface CreateUserProps {
  data: any;
}

export default function Userexercisetodo({ data }: CreateUserProps) {
  const [listExec, setListExec] = useState<IRegisterTraing>();
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    apiJson.get(`/registedTraing/${id}`).then((resp) => setListExec(resp.data));
  }, []);

  function executeExercice(id) {}

  return (
    <Flex flexDirection="column">
      <Flex
        width="100%"
        margin="1.5rem 0"
        flexDirection="row"
        justifyContent="space-around"
      >
        <Flex>
          <Text fontSize="1rem" fontWeight="bold" marginRight="10px">
            Nome do Usuário:{" "}
          </Text>{" "}
          <span>{listExec?.userName}</span>
        </Flex>
        <Flex>
          <Text fontSize="1rem" fontWeight="bold" marginRight="10px">
            Data do Treino:
          </Text>
          <span>{listExec?.dateTraining}</span>
        </Flex>
      </Flex>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Tipo de Exercício</Th>
            <Th>Carga</Th>
            <Th>Repetição</Th>
          </Tr>
        </Thead>
        <Tbody>
          {listExec?.listTraining?.map((resp) => {
            return (
              <Tr key={resp.id}>
                <Td>{resp?.exerciseType}</Td>
                <Td>{resp?.weight}</Td>
                <Td>{resp?.amountRepetition}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Flex>
        <Button
          margin="1rem "
          backgroundColor="orange.400"
          onClick={() => router.push("/training/listexercisebyuser")}
        >
          Voltar a lista
        </Button>
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
