import { Button, Divider, Flex, Icon, VStack } from "@chakra-ui/react";
import { BsTrash } from "react-icons/bs";
import { date } from "yup/lib/locale";
import { IListTraining } from "./ITraining";

interface ItemsToRenderProps {
  exerciseToDo: IListTraining[];
}

export function ItemsToRender({ exerciseToDo }: ItemsToRenderProps) {
  return (
    <VStack>
      {exerciseToDo.map((data, index) => {
        return (
          <Flex>
            <Flex key={index}>
              <Flex width="360px">{data.exerciseType}</Flex>
              <Flex width="209px">{data.weight}</Flex>
              <Flex width="209px">{data.amountRepetition}</Flex>
              <Flex>
                <Button backgroundColor="red.500">
                  {" "}
                  <Icon as={BsTrash}></Icon> Apagar
                </Button>
              </Flex>
            </Flex>
            <Divider />
          </Flex>
        );
      })}
    </VStack>
  );
}
