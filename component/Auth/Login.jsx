import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Stack,
  Link,
  useDisclosure,
  Button,
  InputGroup,
  InputLeftAddon,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Icon,
  Box,
  ModalHeader,
  ModalCloseButton,
  Modal,
  Center
} from '@chakra-ui/react';

import { IoLogoGoogle, IoLogoFacebook } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

import { FcCalendar } from 'react-icons/fc';
import { MdEmail, MdLock } from 'react-icons/md';
import { CgGenderMale, CgGenderFemale } from 'react-icons/cg';
import { FaUserGraduate } from 'react-icons/fa';
import { GiTeacher } from 'react-icons/gi';
import { checkRegister } from '../UTS/loginUTS';
import {
  theLogin,
  theSignUP,
  theDefaultLoginBtn
} from '../../Actions/mainAction';
import Toast from '../UTS/Toast';
import axios from 'axios';
function Login({ loginBtn, theLogin, theSignUP, lang }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loginState, setLoginState] = useState('signin');

  const [formSubmited, setFormSubmited] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [registerData, setRegisterData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    age: '',
    type: '',
    gender: ''
  });
  const onChange = (e) => {
    e.target.name === 'email' && setEmailError(false);
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormSubmited(true);

    const checkLogin = checkRegister(loginState, registerData, lang);
    checkLogin.error === 'mail' ? setEmailError(true) : setEmailError(false);
    if (checkLogin.error !== false) {
      return Toast(
        lang === 'en' ? 'invalid credentials' : 'خطا في المعلومات',
        checkLogin.message
      );
    }
    if (loginState === 'signup') {
      try {
        const data = await axios.post('http://localhost:5000/api/auth', {
          ...registerData,
          lang
        });
      } catch (e) {
        console.dir(e.response.data.error);
        alert(e.response.data.error);
      }
    }
    //  data);
  };
  // alert('everything is good :D');

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
          {loginState === 'signin' ? 'Login In' : 'Create a new account '}
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
            <form
              action='/api/auth'
              method={loginState === 'signin' ? 'get' : 'post'}
              onSubmit={onSubmit}
            >
              {loginState !== 'signin' && (
                <>
                  <FormControl
                    isInvalid={formSubmited && registerData.name.length < 8}
                    id='name'
                  >
                    <FormLabel>Name</FormLabel>

                    <InputGroup size='sm'>
                      <InputLeftAddon
                        pointerEvents='none'
                        w='30%'
                        fontSize='0.7rem'
                        // eslint-disable-next-line
                        children={'e.g ' + 'Mohammed Rady'}
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
                    isInvalid={formSubmited && registerData.username.length < 4}
                  >
                    <FormLabel>Username</FormLabel>
                    <InputGroup size='sm'>
                      <InputLeftAddon
                        pointerEvents='none'
                        w='30%'
                        fontSize='0.7rem'
                        // eslint-disable-next-line
                        children={'e.g ' + 'Medo10'}
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
                    isInvalid={formSubmited && registerData.age < 5}
                  >
                    <FormLabel>Age</FormLabel>
                    <InputGroup size='sm'>
                      <InputLeftAddon
                        pointerEvents='none'
                        // eslint-disable-next-line
                        children={<FcCalendar fontSize='1.5rem' />}
                      />
                      <Input
                        name='age'
                        value={registerData.age}
                        type='number'
                        onChange={onChange}
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl mt='3' id='gender'>
                    <FormLabel fontWeight='medium' fontSize='lg' p='1'>
                      Gender
                    </FormLabel>
                    <Flex
                      justifyContent='space-between'
                      gridGap='1'
                      p='1'
                      alignItems='center'
                      border={formSubmited && !registerData.gender && '2px'}
                      borderColor={
                        formSubmited && !registerData.gender && 'red'
                      }
                    >
                      <Button
                        w='45%'
                        colorScheme='pink'
                        p='1'
                        name='gender'
                        value='female'
                        variant={
                          registerData.gender === 'female' ? 'solid' : 'outline'
                        }
                        onClick={onChange}
                        fontSize='lg'
                        leftIcon={<CgGenderFemale />}
                      >
                        Female
                      </Button>
                      <Button
                        colorScheme='green'
                        name='gender'
                        value='male'
                        p='1'
                        variant={
                          registerData.gender === 'male' ? 'solid' : 'outline'
                        }
                        onClick={onChange}
                        leftIcon={<CgGenderMale />}
                        w='45%'
                        fontSize='lg'
                      >
                        MALE
                      </Button>
                    </Flex>
                  </FormControl>
                  <FormControl mt='3' id='gender'>
                    <FormLabel fontWeight='medium' fontSize='lg' p='1'>
                      Account Type:
                    </FormLabel>
                    <Flex
                      justifyContent='space-between'
                      gridGap='1'
                      p='1'
                      alignItems='center'
                      border={formSubmited && !registerData.type && '2px'}
                      borderColor={formSubmited && !registerData.type && 'red'}
                    >
                      <Button
                        w='45%'
                        colorScheme='blue'
                        p='1'
                        name='type'
                        value='student'
                        variant={
                          registerData.type === 'student' ? 'solid' : 'outline'
                        }
                        onClick={onChange}
                        fontSize='lg'
                        leftIcon={<FaUserGraduate />}
                      >
                        Student
                      </Button>
                      <Button
                        colorScheme='blue'
                        p='1'
                        name='type'
                        value='teacher'
                        variant={
                          registerData.type === 'teacher' ? 'solid' : 'outline'
                        }
                        onClick={onChange}
                        leftIcon={<GiTeacher />}
                        w='45%'
                        fontSize='lg'
                      >
                        Teacher
                      </Button>
                    </Flex>
                  </FormControl>
                </>
              )}
              <FormControl
                id='email'
                isInvalid={
                  formSubmited &&
                  (registerData.email === '' || emailError === true)
                }
              >
                <FormLabel>Email address</FormLabel>
                <InputGroup size='sm'>
                  <InputLeftAddon
                    pointerEvents='none'
                    fontSize='0.7rem'
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
                    value={registerData.password}
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
                  <Flex direction='column'>
                    <Link
                      color={'green.400'}
                      onClick={() => loginState !== 'signin' && theLogin()}
                    >
                      {loginState === 'signin'
                        ? 'Forget Password ?'
                        : 'Already Have An Account ?'}
                    </Link>
                    {loginState === 'signin' && (
                      <Link
                        color={'green.400'}
                        onClick={() => loginState === 'signin' && theSignUP()}
                      >
                        {loginState === 'signin' && 'Don`t Have an account ?'}
                      </Link>
                    )}
                  </Flex>
                </Stack>
                <Button
                  bg={'green.400'}
                  color={'white'}
                  type='submit'
                  _hover={{
                    bg: 'green.500'
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
  loginBtn: state.main.loginBtn,
  lang: state.main.lang
});

export default connect(mapStateToProps, {
  theDefaultLoginBtn,
  theLogin,
  theSignUP
})(Login);
