import React, { useState } from 'react';
import {
  Button,
  Flex,
  Icon,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react';
import { connect } from 'react-redux';
import { WiDaySunny } from 'react-icons/wi';
import { IoMoon } from 'react-icons/io5';
import { theLogin, theSignUP, theLogOut } from '../../Actions/mainAction';
import { useRouter } from 'next/router';
const NavButtons = ({ vertical, user, theLogin, theSignUP, theLogOut }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const Router = useRouter();
  const { locale } = Router;
  const [lang, setLang] = useState(locale);

  const changeLang = () => {
    lang === 'en' ? setLang('ar') : setLang('en');
    const newLang = lang === 'en' ? 'ar' : 'en';
    Router.push('/', '/', { locale: newLang });
  };

  return (
    <Flex
      alignItems='center'
      direction={vertical && 'column'}
      gridGap={vertical && '5'}
      w='100%'
    >
      <Flex
        justifyContent={vertical && 'space-between'}
        w='100%'
        alignItems='center'
      >
        <Button
          colorScheme='red'
          size='sm'
          fontSize='15px'
          aria-label='change language'
          onClick={changeLang}
          w={vertical && '40%'}
        >
          {lang === 'en' ? 'عربي' : 'EN'}
        </Button>
        <Icon
          w={6}
          h={6}
          mx={vertical ? '10' : '1'}
          color={colorMode === 'light' ? 'grey.400' : 'yellow'}
          as={colorMode === 'light' ? IoMoon : WiDaySunny}
          onClick={toggleColorMode}
        />
      </Flex>

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
            onClick={theLogin}
            size='sm'
            w={vertical && '40%'}
            colorScheme='green'
            variant='ghost'
          >
            {lang === 'en' ? 'Sign in' : 'دخول'}
          </Button>
          <Button
            onClick={theSignUP}
            size='sm'
            mr={{ sm: 2 }}
            colorScheme='green'
            w={vertical && '40%'}
            variant='solid'
          >
            {lang === 'en' ? 'Register' : 'سجل مجانا'}
          </Button>
        </Flex>
      ) : (
        <Button
          onClick={theLogOut}
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
const mapStateToProps = (state) => ({
  user: state.main.user
});
export default connect(mapStateToProps, { theLogOut, theLogin, theSignUP })(
  NavButtons
);
