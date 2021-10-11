import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link as UiLink,
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
import { useRouter } from 'next/router';
import { MdEmail, MdLock } from 'react-icons/md';
import { CgGenderMale, CgGenderFemale } from 'react-icons/cg';

import { checkRegister } from '../UTS/loginUTS';
import { useStore } from '../../zustand/store';
import Toast from '../UTS/Toast';
import { fetcher } from '../UTS/fetcher';
function Login() {
  const loginBtn = useStore((state) => state.loginBtn);
  const theDefaultLoginBtn = useStore((state) => state.theDefaultLoginBtn);
  const theLoginBtn = useStore((state) => state.theLoginBtn);
  const theSetUser = useStore((state) => state.theSetUser);
  const router = useRouter();
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
    setFormSubmited(false);
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
        const data = await fetcher(
          'http://localhost:5000/api/auth',
          'POST',
          registerData
        );
        if (data) {
          theSetUser(data);
          setRegisterData({});
          onClose();
          let welcomeMsg = 'السلام عليكم  ' + data.name;
          Toast('تم انشاء الحساب بنجاح', welcomeMsg, 'success');
          router.replace('/users/' + data.username);
        }
      } catch (e) {
        const theError = e.message;

        let errorMessage;

        switch (theError) {
          case 'undefined':
            errorMessage = 'خطاء في البيانات ';
            break;
          case 'email':
            errorMessage = 'البريد الالكتروني مسجل بالفعل ';
            break;
          case 'username':
            errorMessage = 'اسم المستخدم مسجل بالفعل ';
            break;
          default:
            errorMessage = 'خطاء في البيانات ';
        }
        return Toast('خطاء عند تسجيل الحساب', errorMessage);
      }
    } else {
      try {
        const { email, password } = registerData;
        const data = await fetcher(
          'http://localhost:5000/api/auth/login',
          'POST',
          {
            email,
            password
          }
        );
        if (data) {
          theSetUser(data);
          setRegisterData({});
          onClose();
          let welcomeMsg = 'السلام عليكم  ' + data.name;
          Toast(welcomeMsg, null, 'success');
          router.replace('/users/' + data.username);
        }
      } catch (error) {
        let errorMSG =
          error.message === 'email'
            ? 'هذا البريد الاكتروني غير مسجل'
            : 'تاكد من البريد الاكتروني وكلمة السر';

        return Toast('خطاء عند تسجيل  الدخول', errorMSG);
      }
    }
    //  data);
  };
  // alert('everything is good :D');

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
    return () => onClose;
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
              <Link passHref href='https://localhost:5000/api/auth/facebook'>
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
              <Link passHref href='http://localhost:5000/api/auth/google'>
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
                    <UiLink
                      color={loginState === 'signin' ? '#c1121f' : 'gray.800'}
                      fontWeight='bold'
                      _hover={{
                        color: 'green.500'
                      }}
                      onClick={() =>
                        loginState !== 'signin' && theLoginBtn('signin')
                      }
                    >
                      {loginState === 'signin'
                        ? 'نسيت كلمة السر ؟'
                        : 'لديك حساب بالفعل ؟'}
                    </UiLink>
                    {loginState === 'signin' && (
                      <UiLink
                        color={'gray.800'}
                        _hover={{
                          background: 'white',
                          color: 'green.500'
                        }}
                        onClick={() =>
                          loginState === 'signin' && theLoginBtn('signup')
                        }
                      >
                        {loginState === 'signin' && 'انشاء حساب جديد ؟'}
                      </UiLink>
                    )}
                  </Flex>
                </Stack>
                <Button
                  isDisabled={formSubmited}
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
