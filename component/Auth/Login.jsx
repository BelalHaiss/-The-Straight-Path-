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
  InputGroup,
  InputLeftAddon,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  FormErrorMessage,
  Modal,
  Center,
  useColorModeValue
} from '@chakra-ui/react';
import { IoLogoGoogle, IoLogoFacebook } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import { AiFillDownCircle } from 'react-icons/ai';
import { FcCalendar } from 'react-icons/fc';
import { MdEmail, MdLock } from 'react-icons/md';

import {
  theLogin,
  theSignUP,
  theDefaultLoginBtn
} from '../../Actions/mainAction';
import Toast from '../UTS/Toast';
function Login({ loginBtn, theLogin, theSignUP }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loginState, setLoginState] = useState('signin');

  const [formSubmited, setFormSubmited] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    age: ''
  });
  const onChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmited(true);
    console.log(registerData);
    if (!registerData.age || registerData.age <= 8 || registerData.age >= 70) {
      return Toast(
        'Check your age input',
        'Unable to create user account',
        'error'
      );
    }
    const re = /^([a-zA-Z0-9_\-?\.?]+)@([a-zA-Z]){3,}\.([a-zA-Z]){2,5}$/;
    if (!re.test(registerData.email)) {
      setRegisterData({ ...registerData, email: '' });
      return Toast(
        'Check your email input',
        'Unable to create user account',
        'error'
      );
    }
    if (registerData.username.indexOf(' ') >= 0) {
      return Toast(
        'Check Username Input ',
        'Make Sure There is no Space with',
        'error'
      );
    }
    Object.keys(registerData).map((item) => {
      if (registerData[item] === '') {
        return Toast(
          'Check your ' + item + ' input',
          'Unable to create user account',
          'error'
        );
      }
    });
    if (registerData.password.length < 8) {
      return Toast(
        'Password should be more than 8 letter',
        'Unable to create user account',
        'error'
      );
    }
  };
  useEffect(() => {
    switch (loginBtn) {
      case 'signin':
        setLoginState('signin');
        return onOpen();
      case 'signup':
        setLoginState('signup');
        return onOpen();
    }
  }, [loginBtn, onOpen]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader textAlign='center'>
          {loginState === 'signin' ? 'Login In' : 'Create a new acount '}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Stack spacing={1}>
            <Flex
              mt='0px'
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
            <hr />
            <Center fontSize='md' fontWeight='bold'>
              OR
            </Center>
            <form action='#' method='post' onSubmit={onSubmit}>
              {loginState !== 'signin' && (
                <>
                  <FormControl
                    isInvalid={formSubmited && registerData.name === ''}
                    id='name'
                  >
                    <FormLabel>Name</FormLabel>

                    <InputGroup size='sm'>
                      <InputLeftAddon
                        pointerEvents='none'
                        w='30%'
                        fontSize='0.5rem'
                        // eslint-disable-next-line
                        children=' "E.G" Mohamed Ahmed'
                      />
                      <Input
                        value={registerData.name}
                        size='sm'
                        onChange={onChange}
                        type='text'
                        name='name'
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl
                    id='username'
                    isInvalid={formSubmited && registerData.username === ''}
                  >
                    <FormLabel>Username</FormLabel>
                    <InputGroup size='sm'>
                      <InputLeftAddon
                        pointerEvents='none'
                        w='30%'
                        fontSize='0.5rem'
                        // eslint-disable-next-line
                        children=' "E.G" Medo10'
                      />
                      <Input
                        size='sm'
                        value={registerData.username}
                        type='text'
                        onChange={onChange}
                        name='username'
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl
                    id='age'
                    isInvalid={
                      formSubmited &&
                      (registerData.age <= 8 || registerData.age >= 70)
                    }
                  >
                    <FormLabel>Age</FormLabel>
                    <InputGroup size='sm'>
                      <InputLeftAddon
                        pointerEvents='none'
                        // eslint-disable-next-line
                        children={<FcCalendar fontSize='1.5rem' />}
                      />
                      <Input name='age' type='number' onChange={onChange} />
                    </InputGroup>
                  </FormControl>
                </>
              )}
              <FormControl
                id='email'
                isInvalid={
                  formSubmited &&
                  (registerData.email === '' || registerData.email === false)
                }
              >
                <FormLabel>Email address</FormLabel>
                <InputGroup size='sm'>
                  <InputLeftAddon
                    pointerEvents='none'
                    fontSize='0.5rem'
                    // eslint-disable-next-line
                    children={<MdEmail fontSize='1.5rem' />}
                  />
                  <Input
                    size='sm'
                    type='email'
                    value={registerData.email}
                    onChange={onChange}
                    autoComplete='email'
                    name='email'
                  />
                </InputGroup>
              </FormControl>
              <FormControl
                id='password'
                isInvalid={formSubmited && registerData.password.length < 8}
              >
                <FormLabel>Password</FormLabel>
                <InputGroup size='sm'>
                  <InputLeftAddon
                    pointerEvents='none'
                    fontSize='0.5rem'
                    // eslint-disable-next-line
                    children={<MdLock fontSize='1.5rem' />}
                  />
                  <Input
                    size='sm'
                    type='password'
                    onChange={onChange}
                    name='password'
                    autoComplete='password'
                  />
                </InputGroup>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  mt='2'
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Flex direction='column'>
                    <Link
                      color={'teal.400'}
                      onClick={loginState !== 'signin' && theLogin}
                    >
                      {loginState === 'signin'
                        ? 'Forget Password ?'
                        : 'Already Have An Account ?'}
                    </Link>
                    {loginState === 'signin' && (
                      <Link
                        color={'teal.400'}
                        onClick={loginState === 'signin' && theSignUP}
                      >
                        {loginState === 'signin' && 'Don`t Have an account ?'}
                      </Link>
                    )}
                  </Flex>
                </Stack>
                <Button
                  bg={'teal.400'}
                  color={'white'}
                  type='submit'
                  _hover={{
                    bg: 'teal.500'
                  }}
                >
                  Submit
                </Button>
              </Stack>
            </form>
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
