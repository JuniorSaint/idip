import { Text } from "@chakra-ui/react";

export default function Logo() {
  return (
    <Text
      fontSize={["2xl", "3xl"]}
      fontWeight="bold"
      letterSpacing="tight"
      width="256px"
    >
      IdIp{" "}
      <Text as="span" fontSize="0.8rem" color="gray.400">
        Tecnologia
      </Text>
      <Text as="span" marginLeft="4px" color="pink.500">
        .
      </Text>
    </Text>
  );
}
