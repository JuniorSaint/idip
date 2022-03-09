import { Button, Divider, Flex, FormLabel, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { apiJson } from "../../services/api";
import { IListExercise, IListTraining } from "./ITraining";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../Form/Input";
import { ItemsToRender } from "./ItemsToRender";

const trainingSchema = yup
  .object({
    exercise: yup.string().required("Email é obrigatório"),
    amountRepetition: yup
      .number()
      .required("Quantidade de vezes é obrigatório"),
    weight: yup.number().required("Carga é obrigatório"),
  })
  .required();

export default function InsertItemsToRender() {
  const [listExercise, setListExercise] = useState<IListExercise[]>([]);
  const [exerciseToDo, setExerciseToDo] = useState<IListTraining[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IListTraining>({
    resolver: yupResolver(trainingSchema),
  });

  const handleCreateListTraining: SubmitHandler<IListTraining> = (
    value,
    event
  ) => {
    event.preventDefault();
    let newList = [...exerciseToDo];
    newList.push(value);
    setExerciseToDo(newList);
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

  return (
    <Flex
      flex="1"
      borderRadius={8}
      backgroundColor="gray.800"
      padding={["6", "8"]}
      flexDirection="column"
    >
      <Flex as="form" onSubmit={handleSubmit(handleCreateListTraining)}>
        <HStack spacing="10px">
          <Flex>
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
              >
                {listExercise.map((data) => {
                  return (
                    <option value={data.exerciseType}>
                      {data.exerciseType}
                    </option>
                  );
                })}
              </select>
            </Flex>

            <Input
              name="weight"
              type="number"
              labelName="Carga"
              {...register("weight")}
            />
            <span style={{ marginRight: "10px" }}></span>
            <Input
              name="amountRepetion"
              type="number"
              labelName="Quantidade de repetição"
              {...register("amountRepetition")}
            />
          </Flex>
          <Flex justifyContent="flex-end">
            <Button
              height="42px"
              margin="30px 0 0 1rem"
              backgroundColor="orange.500"
              _hover={{ backgroundColor: "orange.400" }}
              type="submit"
            >
              Adicionar
            </Button>
          </Flex>
        </HStack>
        <Flex></Flex>
      </Flex>
      <Divider margin="1rem 0" />
      <Flex justifyContent="flex-end" alignItems="center">
        <ItemsToRender exerciseToDo={exerciseToDo} />
      </Flex>
    </Flex>
  );
}
