import { Flex, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

import {
  IListTraining,
  IRegisterTraing,
} from "../../components/Training/ITraining";

interface ItemsToRenderProps {
  listExe: IRegisterTraing[];
}

export default function ItemsToRender({ listExe }: ItemsToRenderProps) {
  return (
    <Flex
      flexDirection="column"
      width="100%"
      my="6"
      maxWidth="1480px"
      mx="auto"
      px="6"
    ></Flex>
  );
}
