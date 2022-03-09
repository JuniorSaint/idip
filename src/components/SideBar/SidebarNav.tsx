//
import { Divider, Flex, VStack } from "@chakra-ui/react";
import { BsListCheck } from "react-icons/bs";
import { FiUserPlus, FiUsers } from "react-icons/fi";
import { MdDirectionsRun } from "react-icons/md";
import { RiTodoLine } from "react-icons/ri";

import LinkSideBar from "./LinkSideBar";
import SubTitleSideBar from "./SubTitleSideBar";

const user = {
  name: "José Atanázio",
  userType: "admin",
  avatar: "rosto.jpg",
  email: "junior.garbage@gmail.com",
};

export default function SidebarNav() {
  return (
    <Flex
      width="300px"
      marginRight="20px"
      backgroundColor="gray.800"
      padding="15px 0"
      height="85vh"
    >
      <VStack spacing="1rem">
        {user.userType === "admin" ? (
          <VStack spacing="16px" marginTop="24px" alignItems="flex-start">
            <SubTitleSideBar subTitle="Usuários" />
            <LinkSideBar
              nameLink="Lista de Usuários"
              icon={FiUsers}
              goTo="/users"
            />
            <LinkSideBar
              nameLink="Criar Usuário"
              icon={FiUserPlus}
              goTo="/users/createuser"
            />
          </VStack>
        ) : (
          ""
        )}
        {user.userType === "admin" ? (
          <Flex>
            <Divider width="300px" />
          </Flex>
        ) : (
          ""
        )}
        <VStack spacing="16px" marginTop="24px" alignItems="flex-start">
          <SubTitleSideBar subTitle="Treinamento" />
          {user.userType === "admin" ? (
            <VStack spacing="16px">
              <LinkSideBar
                nameLink="Cadastro de treinamento"
                icon={RiTodoLine}
                goTo="/training/registertraining"
              />
              <LinkSideBar
                nameLink="Lista de Treinos por usuário"
                icon={BsListCheck}
                goTo="listexercisebyuser"
              />
            </VStack>
          ) : (
            ""
          )}

          <LinkSideBar
            nameLink="Exercício a fazer"
            icon={MdDirectionsRun}
            goTo="userexercisetodo"
          />
        </VStack>
      </VStack>
    </Flex>
  );
}
