import { Box, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { apiJson } from "../../services/api";
import { IRegisterTraing } from "./ITraining";

interface ItemsToRenderProps {
  listUsers: IRegisterTraing[];
}

export default function CardList({ listUsers }: ItemsToRenderProps) {
  return listUsers.map((resp) => {
    return (
      <Box>
        <Flex>
          <span>Nome:</span> <span>{resp.userName}</span>
        </Flex>
        <Flex>
          <span>Data do Treino</span> <span>{resp.dateTraining}</span>
        </Flex>
        <Flex>
          <span>Treino Pago</span> <span>{resp.isPaid}</span>
        </Flex>
        <Flex></Flex>
      </Box>
    );
  });
}
