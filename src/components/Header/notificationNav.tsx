import { Flex, HStack, Icon, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { RiNotificationLine, RiUserAddLine } from 'react-icons/ri';

export default function NotificationNav() {
  const [searchText, setSearchText] = useState('');
  return (
    <>
      <Flex
        as="label"
        flex="1"
        padding="16px 32px"
        marginLeft="24px"
        maxWidth="400px"
        alignSelf="center"
        color="gray.800"
        position="relative"
        backgroundColor="gray.800"
        borderRadius="full"
      >
        <Input
          color="gray.50"
          variant="unstyled"
          paddingRight="4"
          marginRight="4"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          placeholder="Buscar na plataforma"
          _placeholder={{ color: 'gray.400' }}
        />
      </Flex>
      <Flex alignItems="center" marginLeft="auto">
        <HStack
          spacing={['6', '8']}
          mx={['6', '8']}
          pr={['6', '8']}
          py="1"
          borderRightWidth="1px"
          borderColor="green.700"
        >
          <Icon as={RiNotificationLine} fontSize="20" />
          <Icon as={RiUserAddLine} fontSize="20" />
        </HStack>
      </Flex>
    </>
  );
}
