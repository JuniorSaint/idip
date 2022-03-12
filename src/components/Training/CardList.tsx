import {
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { api } from "../../services/api";
import { IRegisterTraing } from "./ITraining";

interface ItemsToRenderProps {
  idExercise: string;
}

export default function CardList({ idExercise }: ItemsToRenderProps) {
  const [listExercise, setListExercise] = useState<IRegisterTraing>();

  function salveExerciseConcluded(id) {
    // api.patch(`/exerciseTraining/${id}`, isPaid: true );
  }

  useEffect(() => {
    api
      .get(`/exerciseTraining/${idExercise}`)
      .then((resp) => setListExercise(resp.data));
  }, []);

  <Box>
    <Flex>
      <span>Data do Treino</span> <span>{listExercise.dateTraining}</span>
    </Flex>
    <Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Exercício</Th>
            <Th isNumeric>Carga</Th>
            <Th isNumeric>Repetição</Th>
          </Tr>
        </Thead>
        <Tbody>
          {listExercise.listTraining.map((resp) => {
            return (
              <Tr key={resp.id}>
                <Td>{resp.exerciseType}</Td>
                <Td isNumeric>{resp.weight}</Td>
                <Td isNumeric>{resp.amountRepetition}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Flex>
    <Flex>
      <Button
        onClick={() => {
          salveExerciseConcluded(listExercise.id);
        }}
      >
        Exercício Concluído
      </Button>
    </Flex>
  </Box>;
}
