//
import { Divider, Flex, VStack, Text, Icon, Button } from "@chakra-ui/react";
import { BsListCheck } from "react-icons/bs";
import { FiUserPlus, FiUsers } from "react-icons/fi";
import { MdDirectionsRun } from "react-icons/md";
import { RiTodoLine } from "react-icons/ri";
import { ImExit } from "react-icons/im";

import LinkSideBar from "./LinkSideBar";
import SubTitleSideBar from "./SubTitleSideBar";
import { signOut } from "../../context/AuthContext";

interface SideBarProps {
  data: any;
}
export default function SidebarNav({ data }: SideBarProps) {
  const handleLogOut = () => {
    signOut();
  };

  return (
    <Flex
      width="350px"
      marginRight="20px"
      backgroundColor="gray.800"
      padding="15px 0"
      height="85vh"
    >
      <Flex flexDirection="column" justifyContent="space-between">
        <VStack spacing="1rem">
          {data?.sub === "admin" && (
            <VStack spacing="16px" marginTop="24px" alignItems="flex-start">
              <SubTitleSideBar subTitle="Administrador" />
              <LinkSideBar
                nameLink="Lista de Usuários"
                icon={FiUsers}
                goTo="/users"
              />
              <LinkSideBar
                nameLink="Criar Usuário"
                icon={FiUserPlus}
                goTo="/users/new"
              />
              <LinkSideBar
                nameLink="Cadastro de treinamento"
                icon={RiTodoLine}
                goTo="/training/registertraining"
              />
              <LinkSideBar
                nameLink="Lista de Treinos por usuário"
                icon={BsListCheck}
                goTo="/training/listexercisebyuser"
              />
              <Divider />
            </VStack>
          )}

          <VStack spacing="16px" marginTop="24px" alignItems="flex-start">
            <SubTitleSideBar subTitle="Usuários" />
            <LinkSideBar
              nameLink="Exercício a fazer"
              icon={MdDirectionsRun}
              goTo="/training/userexercisetodo"
            />
            <LinkSideBar
              nameLink="Apagar perfil"
              icon={FiUserPlus}
              goTo="/deleteperfiluser"
            />
          </VStack>
        </VStack>
        <Flex marginLeft="1rem">
          <Button
            onClick={() => handleLogOut()}
            color="pink.300"
            backgroundColor="gray.800"
            _hover={{ backgroundColor: "gray.800" }}
          >
            Logout{" "}
            <Icon
              marginLeft="10px"
              fontSize="25px"
              color="pink.300"
              as={ImExit}
            ></Icon>{" "}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
