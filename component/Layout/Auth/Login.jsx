import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  useDisclosure,
  Button,
  Heading,
  Text,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  Modal,
  useColorModeValue
} from '@chakra-ui/react';
import { IoLogoGoogle, IoLogoFacebook } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  theLogin,
  theSignUP,
  theDefaultLoginBtn
} from '../../../Actions/mainAction';
function Login({ loginBtn, theLogin, theSignUP, theDefaultLoginBtn }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loginState, setLoginState] = useState('signin');
  useEffect(() => {
    switch (loginBtn) {
      case 'signin':
        setLoginState('signin');
        return onOpen();
      case 'signup':
        setLoginState('signup');
        return onOpen();
    }
  }, [loginBtn]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader textAlign='center'>
          {loginState === 'signin' ? 'Login With You Account ' : 'Sign Up Now '}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Stack spacing={4}>
            <Flex
              flexDirection={{ base: 'column', sm: 'row' }}
              justifyContent='space-around'
            >
              <Button
                w={{ base: '100%', sm: 40 }}
                mb={{ base: 2, sm: '' }}
                size='lg'
                colorScheme='facebook'
                leftIcon={<IoLogoFacebook />}
              >
                Facebook
              </Button>
              <Button
                w={{ base: '100%', sm: 40 }}
                size='lg'
                colorScheme='red'
                leftIcon={<IoLogoGoogle />}
              >
                Google
              </Button>
            </Flex>
            <FormControl id='email'>
              <FormLabel>Email address</FormLabel>
              <Input type='email' />
            </FormControl>
            <FormControl id='password'>
              <FormLabel>Password</FormLabel>
              <Input type='password' autoComplete='password' />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={'teal.400'}>Forgot password?</Link>
              </Stack>
              <Button
                bg={'teal.400'}
                color={'white'}
                _hover={{
                  bg: 'teal.500'
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  loginBtn: state.main.loginBtn
});

export default connect(mapStateToProps, {
  theDefaultLoginBtn,
  theLogin,
  theSignUP
})(Login);
