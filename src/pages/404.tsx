import { Divider, Flex, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function PageNotFound() {
  const router = useRouter();
  const handleReturnToLogIn = (e) => {
    e.preventDefault();
    router.push("/");
  };
  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      backgroundColor="gray.800"
      flexDirection="column"
    >
      <Flex
        flexDirection="column"
        width="450px"
        backgroundColor="gray.400"
        padding="1rem"
        borderRadius="1rem"
      >
        <Text fontSize="3.5rem" margin="auto" color="pink.400">
          Erro 404
        </Text>
        <Text as="h1" fontSize="1.5rem" margin="0 auto 2rem" color="white">
          {" "}
          PAGE NOT FOUND{" "}
        </Text>

        <Text color="white">
          Looks like you have followed a broken link or entered a URL that does
          not exist on this site.
        </Text>
        <Divider margin="1rem 0" />
        <Text color="white">
          Se você encontra-se nessa página é por ter acessado um link ou página
          inexistente.
        </Text>
        <Flex>
          <Button
            width="100%"
            marginTop="2rem"
            colorScheme="pink"
            onClick={handleReturnToLogIn}
          >
            Home
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
