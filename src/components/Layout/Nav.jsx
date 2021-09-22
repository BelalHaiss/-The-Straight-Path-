import { Flex, useColorModeValue } from '@chakra-ui/react';

import NavItems from './NavItems';
const Nav = () => {
  return (
    <nav>
      <Flex
        p='2'
        bg='gray.700'
        alignItems='center'
        mx='auto'
        justifyContent='space-between'
      >
        <NavItems />
      </Flex>
    </nav>
  );
};

export default Nav;
