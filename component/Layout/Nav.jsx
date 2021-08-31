import React from 'react';
import {
  Flex,
  Spacer,
  Text,
  Link as UiLink,
  Button,
  Icon,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  Wrap
} from '@chakra-ui/react';
import Link from 'next/link';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';
import { WiDaySunny } from 'react-icons/wi';
import { IoMoon } from 'react-icons/io5';
import { connect } from 'react-redux';
import { theLogin, theSignUP, theLogOut } from '../../Actions/mainAction';
const Nav = ({ user, theLogin, theSignUP, theLogOut }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const linkColor = useColorModeValue('gray.600', 'gray.200');

  return (
    <nav>
      <Flex
        p='2'
        bg={useColorModeValue('gray.200', 'gray.600')}
        direction={{ base: 'column', sm: 'row' }}
        alignItems='center'
        mx='auto'
      >
        <Flex
          display={{ base: 'flex', sm: 'none' }}
          justifyContent='space-between'
          w='100%'
          alignItems='center'
        >
          <Text fontSize={{ base: 'md', sm: 'xl' }}>The Straight Path</Text>
          <Wrap>
            <Icon
              w={6}
              h={6}
              color={colorMode !== 'light' && 'teal.100'}
              as={isOpen ? BsToggleOn : BsToggleOff}
              onClick={isOpen ? onClose : onOpen}
            />
            <Icon
              w={6}
              h={6}
              color={'yellow'}
              as={colorMode === 'light' ? IoMoon : WiDaySunny}
              onClick={toggleColorMode}
            />
          </Wrap>
        </Flex>

        <Text
          display={{ base: 'none', sm: 'inherit' }}
          fontSize={{ base: 'md', sm: 'xl' }}
          alignSelf='flex-start'
        >
          The Straight Path
        </Text>
        <Spacer />

        <Link href='2323'>
          <Text
            display={{ base: `${isOpen ? 'block' : 'none'}`, sm: 'inherit' }}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}
            mr={{ sm: 2 }}
          >
            Home
          </Text>
        </Link>
        <Link href='2323'>
          <Text
            display={{ base: `${isOpen ? 'block' : 'none'}`, sm: 'inherit' }}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}
          >
            Challenges
          </Text>
        </Link>

        <Spacer />
        <Icon
          w={6}
          h={6}
          display={{ base: 'none', sm: 'inherit' }}
          color={'yellow'}
          as={colorMode === 'light' ? IoMoon : WiDaySunny}
          onClick={toggleColorMode}
        />
        {user === null ? (
          <>
            <Link href='#logIn'>
              <Button
                onClick={theLogin}
                display={{
                  base: `${isOpen ? 'block' : 'none'}`,
                  sm: 'inherit'
                }}
                size='sm'
                mx={{ sm: 2 }}
                colorScheme='teal'
                variant='ghost'
              >
                Sign In
              </Button>
            </Link>
            <Link href='#singUp'>
              <Button
                onClick={theSignUP}
                display={{
                  base: `${isOpen ? 'block' : 'none'}`,
                  sm: 'inherit'
                }}
                size='sm'
                mr={{ sm: 2 }}
                colorScheme='teal'
                variant='solid'
              >
                Sign Up
              </Button>
            </Link>{' '}
          </>
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
    </nav>
  );
};

const mapStateToProps = (state) => ({
  user: state.main.user
});
export default connect(mapStateToProps, { theLogin, theSignUP, theLogOut })(
  Nav
);
