import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link as uiLink,
  useDisclosure,
  Button,
  InputGroup,
  InputLeftAddon,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Icon,
  ModalHeader,
  ModalCloseButton,
  Modal,
  Center
} from '@chakra-ui/react';
import Link from 'next/link';
import { IoLogoGoogle, IoLogoFacebook } from 'react-icons/io5';
import { useEffect, useState } from 'react';

import { MdEmail, MdLock } from 'react-icons/md';
import { CgGenderMale, CgGenderFemale } from 'react-icons/cg';
import GoogleLogin from 'react-google-login';

import { checkRegister } from '../UTS/loginUTS';
import { useSettingsStore } from '../../zustand/store';
import Toast from '../UTS/Toast';
import axios from 'axios';
function Login() {
  const loginBtn = useSettingsStore((state) => state.loginBtn);
  const theDefaultLoginBtn = useSettingsStore(
    (state) => state.theDefaultLoginBtn
  );
  const theLoginBtn = useSettingsStore((state) => state.theLoginBtn);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loginState, setLoginState] = useState('signin');

  const [formSubmited, setFormSubmited] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [registerData, setRegisterData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',

    gender: ''
  });
  const onChange = (e) => {
    e.target.name === 'email' && setEmailError(false);
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormSubmited(true);

    const checkLogin = checkRegister(loginState, registerData);
    checkLogin.error === 'mail' ? setEmailError(true) : setEmailError(false);
    if (checkLogin.error !== false) {
      return Toast('خطا في المعلومات', checkLogin.message);
    }
    if (loginState === 'signup') {
      try {
        const data = await axios.post(
          'http://localhost:5000/api/auth',
          registerData
        );
      } catch (e) {
        console.dir(e.response.data.error);
        alert(e.response.data.error);
      }
    }
    //  data);
  };
  // alert('everything is good :D');
  const responseGoogle = (response) => {
    console.log(response);
  };
  useEffect(() => {
    switch (loginBtn) {
      case 'signin':
        setLoginState('signin');
        setTimeout(theDefaultLoginBtn, [100]);
        return onOpen();
      case 'signup':
        setLoginState('signup');
        setTimeout(theDefaultLoginBtn, [100]);
        return onOpen();
    }
  }, [loginBtn, onOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader textAlign='center'>
          {loginState === 'signin' ? 'تسجيل الدخول' : 'انشاء حساب جديد '}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Stack spacing={1}>
            <Flex
              mt='0px'
              flexDirection={{ base: 'column', sm: 'row' }}
              justifyContent='space-around'
            >
              <Link href='https://localhost:5000/api/auth/facebook'>
                <Button
                  w={{ base: '100%', sm: 40 }}
                  mb={{ base: 2, sm: '' }}
                  size='lg'
                  fontSize='10px'
                  colorScheme='facebook'
                  rightIcon={<IoLogoFacebook fontSize='25px' />}
                >
                  باستخدام حساب فيسبوك
                </Button>
              </Link>
              <Link href='http://localhost:5000/api/auth/google'>
                <Button
                  w={{ base: '100%', sm: 40 }}
                  size='lg'
                  fontSize='10px'
                  colorScheme='red'
                  rightIcon={<IoLogoGoogle fontSize='25px' />}
                >
                  باستخدام حساب جوجل
                </Button>
              </Link>

              {/* <GoogleLogin
                clientId='658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com'
                render={(renderProps) => (
                  <Button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  w={{ base: '100%', sm: 40 }}
                  size='lg'
                  fontSize='10px'
                  colorScheme='red'
                  rightIcon={<IoLogoGoogle fontSize='25px' />}
                >
                  باستخدام حساب جوجل
                </Button>
                )}
                buttonText='Login'
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              /> */}
            </Flex>
            <hr />
            <Center fontSize='lg' fontWeight='bold'>
              او
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
                    <FormLabel>الاسم بالكامل</FormLabel>

                    <InputGroup size='sm'>
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
                    <FormLabel>اسم المستخدم </FormLabel>
                    <InputGroup size='sm'>
                      <Input
                        size='sm'
                        value={registerData.username}
                        type='text'
                        onChange={onChange}
                        name='username'
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl mt='3' id='gender'>
                    <FormLabel fontWeight='medium' fontSize='lg' p='1'>
                      الجنس
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
                        انثي
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
                        ذكر
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
                <FormLabel>البريد الالكتروني </FormLabel>
                <InputGroup size='sm'>
                  <InputLeftAddon
                    pointerEvents='none'
                    fontSize='0.7rem'
                    // eslint-disable-next-line
                    children={<MdEmail color='#023047' fontSize='1.5rem' />}
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
                <FormLabel>كلمة السر</FormLabel>
                <InputGroup size='sm'>
                  <InputLeftAddon
                    pointerEvents='none'
                    fontSize='0.5rem'
                    // eslint-disable-next-line
                    children={<MdLock color='#023047' fontSize='1.5rem' />}
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
                    <uiLink
                      color={'#c1121f'}
                      onClick={() =>
                        loginState !== 'signin' && theLoginBtn('signin')
                      }
                    >
                      {loginState === 'signin'
                        ? 'نسيت كلمة السر ؟'
                        : 'لديك حساب بالفعل ؟'}
                    </uiLink>
                    {loginState === 'signin' && (
                      <uiLink
                        color={'#081c15'}
                        onClick={() =>
                          loginState === 'signin' && theLoginBtn('signup')
                        }
                      >
                        {loginState === 'signin' && 'انشاء حساب جديد ؟'}
                      </uiLink>
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

export default Login;
