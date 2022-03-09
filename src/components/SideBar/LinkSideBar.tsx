import { Box, Icon, Link, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ElementType } from "react";

interface ItemSideBarProps {
  nameLink: string;
  icon: ElementType;
  goTo: string;
}

export default function LinkSideBar({
  nameLink,
  icon,
  goTo,
  ...rest
}: ItemSideBarProps) {
  const router = useRouter();

  return (
    <Box paddingLeft="10px">
      <Link
        onClick={() => router.push(`${goTo}`)}
        display="flex"
        alignItems="20px"
        {...rest}
      >
        <Icon as={icon} fontSize="20px" />
        <Text marginLeft="16px" fontWeight="medium">
          {" "}
          {nameLink}
        </Text>
      </Link>
    </Box>
  );
}
