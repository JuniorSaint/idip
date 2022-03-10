import { Button, Flex, FormLabel, HStack, Icon, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { BsTrash } from "react-icons/bs";

import { apiJson } from "../../services/api";
import { IListExercise } from "./ITraining";

interface IListToDo {
  exerciseType: string;
  weight: number;
  amountRepetition: number;
}
interface IInsertItemsToRender {
  exerciseToDo: IListToDo[];
}

export default function InsertItemsToRender() {
  const [listExercise, setListExercise] = useState<IListExercise[]>([]);
  const { control, register, handleSubmit } = useForm<IInsertItemsToRender>({
    defaultValues: {
      exerciseToDo: [
        { exerciseType: "", weight: undefined, amountRepetition: undefined },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "exerciseToDo",
  });

  const handleCreateListTraining = () => {
    append({
      exerciseType: "",
      weight: undefined,
      amountRepetition: undefined,
    });
  };

  useEffect(() => {
    try {
      apiJson
        .get("exercises")
        .then((response) => setListExercise(response.data));
    } catch (error) {
      console.log(error.toJson());
    }
  }, []);

  const handleCreateListExercise = async (value, event) => {
    event.preventDefault();
    console.log(value);
  };

  return (
    <Flex
      flex="1"
      borderRadius={8}
      backgroundColor="gray.800"
      padding={["6", "8"]}
      flexDirection="column"
    >
      {fields.map((field, index) => {
        return (
          <HStack spacing="10px" key={field.id}>
            <Flex flexDirection="column" flex="1">
              <FormLabel marginLeft="10px">Selecione o Exercício</FormLabel>
              <select
                style={{
                  width: "360px",
                  background: "#171923",
                  height: "48px",
                  paddingLeft: "10px",
                  borderRadius: "5px",
                  marginRight: "10px",
                  fontFamily: "Roboto",
                }}
                {...register(`exerciseToDo.${index}.exerciseType`)}
              >
                <option value="">...</option>
                {listExercise.map((data) => {
                  return (
                    <option value={data.exerciseType} key={data.id}>
                      {data.exerciseType}
                    </option>
                  );
                })}
              </select>
            </Flex>
            <Flex flexDirection="column">
              <FormLabel marginLeft="10px">Carga</FormLabel>
              <Input
                type="number"
                focusBorderColor="pink.500"
                backgroundColor="gray.900"
                variant="filled"
                _hover={{ backgroundColor: "gray.900" }}
                size="lg"
                {...register(`exerciseToDo.${index}.weight`)}
              />
            </Flex>

            <Flex flexDirection="column">
              <FormLabel marginLeft="10px">Repetição</FormLabel>
              <Input
                focusBorderColor="pink.500"
                backgroundColor="gray.900"
                variant="filled"
                _hover={{ backgroundColor: "gray.900" }}
                size="lg"
                type="number"
                {...register(`exerciseToDo.${index}.amountRepetion`)}
              />
            </Flex>

            <span style={{ marginRight: "10px" }}></span>

            <Flex>
              {index > 0 ? (
                <Button
                  marginTop="32px"
                  onClick={() => remove(index)}
                  backgroundColor="red.500"
                  _hover={{ backgroundColor: "red.300" }}
                >
                  {" "}
                  <Icon as={BsTrash} fontSize="20px"></Icon>{" "}
                </Button>
              ) : (
                <Button
                  width="52px"
                  backgroundColor="gray.800"
                  _hover={{ backgroundColor: "gray.800" }}
                  _active={{ borderColor: "gray.800" }}
                ></Button>
              )}
            </Flex>
          </HStack>
        );
      })}
      <Flex justifyContent="flex-end">
        <Button
          height="42px"
          width="120px"
          margin="30px 0 0 1rem"
          backgroundColor="orange.500"
          _hover={{ backgroundColor: "orange.400" }}
          onClick={() => {
            handleCreateListTraining();
          }}
        >
          Adicionar
        </Button>
      </Flex>
    </Flex>
  );
}
