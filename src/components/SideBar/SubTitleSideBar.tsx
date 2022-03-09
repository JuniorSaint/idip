import { Flex, Text } from "@chakra-ui/react";

interface SubTitleSideBarProps {
  subTitle: string;
}

export default function SubTitleSideBar({ subTitle }: SubTitleSideBarProps) {
  return (
    <Flex>
      <Text
        fontWeight="bold"
        color="gray.400"
        fontSize="medium"
        margin="0 auto"
      >
        {" "}
        {subTitle}
      </Text>
    </Flex>
  );
}
