import { Flex, useBreakpointValue } from "@chakra-ui/react";
import SidebarToggle from "../SideBar/SidebarToggle";
import Logo from "./logo";
import NotificationNav from "./notificationNav";
import Profile from "./Profile";

export default function Header() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <Flex
      as="header"
      width="100%"
      maxWidth="1480px"
      height="80px"
      mx="auto"
      marginTop="8px"
      alignItems="center"
      px="6"
    >
      <SidebarToggle />
      <Logo />
      <NotificationNav />
      <Profile showProfileData={isWideVersion} />
    </Flex>
  );
}
