import React, { useState } from 'react';
import { Flex, useColorModeValue } from '@chakra-ui/react';
import LoginAR from '../../Translations/AR/LoginAR';
import LoginEn from '../../Translations/EN/LoginEn';

import NavItems from './NavItems';
const Nav = () => {
  return (
    <nav>
      <Flex
        p='2'
        bg={useColorModeValue('gray.200', 'gray.500')}
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
