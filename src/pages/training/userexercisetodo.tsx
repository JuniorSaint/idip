import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { api, apiJson } from "../../services/api";

export default function Userexercisetodo() {
  const [listExec, setListExec] = useState("");

  useEffect(() => {
    apiJson.get("/registedTraing").then((resp) => setListExec(resp.data));
  }, []);

  return (
    <>
      <Flex>userexercisetodo</Flex>
    </>
  );
}
