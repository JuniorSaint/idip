import { GiHamburgerMenu } from "react-icons/gi";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";

import SideBarNav from "./SidebarNav";

export default function SidebarToggle() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  });

  if (isDrawerSidebar) {
    return (
      <>
        <Button backgroundColor="gray.900" onClick={onOpen} marginRight="8px">
          <GiHamburgerMenu />
        </Button>
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent backgroundColor="gray.800">
            <DrawerCloseButton />
            <DrawerHeader>Navegação</DrawerHeader>

            <DrawerBody>{/* <SideBarNav /> */}</DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  }
  return <></>;
}
