import { Button, Flex } from '@chakra-ui/react';
import { useUserStore, useSettingsStore } from '../../zustand/store';

const NavButtons = ({ vertical }) => {
  const user = useUserStore((state) => state.user);
  const theLogout = useUserStore((state) => state.theLogout);

  const theLoginBtn = useSettingsStore((state) => state.theLoginBtn);
  return (
    <Flex
      alignItems='center'
      direction={vertical && 'column'}
      gridGap={vertical && '5'}
      w='100%'
    >
      {user === null ? (
        <Flex
          p='2'
          borderTop={vertical && '1px'}
          borderTopColor={'gray.500'}
          justifyContent={vertical && 'space-between'}
          w='100%'
          alignItems='center'
          gridGap={1}
        >
          <Button
            onClick={() => theLoginBtn('signin')}
            size='sm'
            w={vertical && '40%'}
            colorScheme='green'
            variant='ghost'
          >
            دخول
          </Button>
          <Button
            onClick={() => theLoginBtn('signup')}
            size='sm'
            mr={{ sm: 2 }}
            colorScheme='green'
            w={vertical && '40%'}
            variant='solid'
          >
            سجل مجانا
          </Button>
        </Flex>
      ) : (
        <Button
          onClick={theLogout}
          display={{ base: `${isOpen ? 'block' : 'none'}`, sm: 'inherit' }}
          size='sm'
          mr={{ sm: 2 }}
          colorScheme='red'
          variant='solid'
        >
          Logout
        </Button>
      )}
    </Flex>
  );
};

export default NavButtons;
