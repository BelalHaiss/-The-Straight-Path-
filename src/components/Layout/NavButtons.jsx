import { Button, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useStore } from '../../zustand/store';
const firstName = (name) => {
  const i = name.indexOf(' ');
  const fName = name.slice(0, i);
  return fName;
};
const NavButtons = () => {
  const user = useStore((state) => state.user);
  const theLogout = useStore((state) => state.theLogout);
  const theLoginBtn = useStore((state) => state.theLoginBtn);

  return (
    <Flex
      ml={{ base: '0', sm: '3' }}
      p='2'
      // w='100%'
      flex='3'
      justifyContent='flex-start'
      alignItems='center'
      gridGap={1}
    >
      <Button
        onClick={() => theLoginBtn('signin')}
        size='sm'
        colorScheme='gray'
        variant='outline'
      >
        دخول
      </Button>
      <Button
        onClick={() => theLoginBtn('signup')}
        size='sm'
        mr={{ sm: 2 }}
        colorScheme='green'
        variant='solid'
        whiteSpace='normal'
      >
        سجل مجانا
      </Button>
    </Flex>
  );
};

export default NavButtons;
