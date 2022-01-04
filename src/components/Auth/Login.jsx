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
  IconButton,
  InputLeftElement,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Icon,
  ModalHeader,
  ModalCloseButton,
  Modal,
  Center
} from '@chakra-ui/react';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';

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
import { BiHide, BiShow } from 'react-icons/bi';
function Login() {
  const loginBtn = useStore((state) => state.loginBtn);
  const theDefaultLoginBtn = useStore((state) => state.theDefaultLoginBtn);
  const theLoginBtn = useStore((state) => state.theLoginBtn);
  const theSetUser = useStore((state) => state.theSetUser);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loginState, setLoginState] = useState('signin');
  const [show, setShow] = useState('false');

  const [formSubmited, setFormSubmited] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [registerData, setRegisterData] = useState({
    fName: '',
    lName: '',
    username: '',
    email: '',
    password: '',
    age: 0,
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
    return () => onClose();
  }, [loginBtn, onOpen]);
  const setAge = (sign) => {
    if (sign === '+') {
      setRegisterData({ ...registerData, age: +registerData.age + 1 });
    } else {
      setRegisterData({ ...registerData, age: +registerData.age - 1 });
    }
  };
  const responseGoogle = async (response) => {
    if (response.error) return;
    try {
      const data = await fetcher('');
    } catch (error) {}
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader display='flex' flexDirection='column' textAlign='center'>
          {loginState === 'signin' ? 'تسجيل الدخول' : 'انشاء حساب جديد '}
          <UiLink
            mt='1'
            color={'gray.800'}
            fontSize='small'
            _hover={{
              background: 'white',
              color: 'green.500'
            }}
            onClick={() =>
              loginState === 'signin'
                ? theLoginBtn('signup')
                : theLoginBtn('signin')
            }
          >
            {loginState === 'signin'
              ? 'انشاء حساب جديد ؟'
              : 'بالفعل لدي حساب !'}
          </UiLink>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Stack spacing={1}>
            <Flex
              mt='0px'
              flexDirection={{ base: 'column', sm: 'row' }}
              justifyContent='space-around'
            >
              {/* href='https://localhost:5000/api/auth/facebook' */}
              <Link
                passHref
                href={
                  `https://wa.me/01032758989?text=haissbolla` +
                  registerData.fName
                }
              >
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
            <form onSubmit={onSubmit}>
              {loginState !== 'signin' && (
                <>
                  <Flex gridGap={'6'} flexWrap={'wrap'}>
                    <FormControl
                      flex='1'
                      id='fName'
                      isInvalid={formSubmited && registerData.fName === ''}
                    >
                      <FormLabel>اسمك </FormLabel>

                      <InputGroup size='sm'>
                        <Input
                          value={registerData.fName}
                          size='sm'
                          onChange={onChange}
                          type='text'
                          name='fName'
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl
                      flex='1'
                      id='lName'
                      isInvalid={formSubmited && registerData.lName === ''}
                    >
                      <FormLabel>اسم العائلة</FormLabel>

                      <InputGroup size='sm'>
                        <Input
                          value={registerData.lName}
                          size='sm'
                          onChange={onChange}
                          type='text'
                          name='lName'
                        />
                      </InputGroup>
                    </FormControl>
                  </Flex>
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
                  <Flex>
                    <FormControl
                      id='age'
                      isInvalid={formSubmited && registerData.age !== ''}
                    >
                      <FormLabel>العمر </FormLabel>
                      <InputGroup size='sm'>
                        <Input
                          size='sm'
                          value={registerData.age}
                          zIndex='1'
                          type='number'
                          onChange={onChange}
                          name='age'
                        />
                        <Flex
                          // flexDirection='row'
                          position='absolute'
                          top='6px'
                          zIndex='20'
                          left='1px'
                        >
                          <Icon
                            color='green'
                            aria-label='اضف واحد للعمر'
                            w={'20px'}
                            h={'20px'}
                            onClick={() => setAge('+')}
                            as={FiPlusCircle}
                          />
                          <Icon
                            color='red'
                            aria-label='انقص واحد من العمر'
                            w={'20px'}
                            h={'20px'}
                            onClick={() => setAge('-')}
                            as={FiMinusCircle}
                          />
                        </Flex>
                      </InputGroup>
                    </FormControl>
                  </Flex>
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
                    type={show ? 'password' : 'text'}
                    value={registerData.password}
                    onChange={onChange}
                    name='password'
                    autoComplete='password'
                  />
                  <InputLeftElement>
                    <IconButton
                      colorScheme={!show ? 'red' : 'green'}
                      aria-label={!show ? 'اخفاء' : 'اظهار'}
                      icon={show ? <BiHide /> : <BiShow />}
                      h='1.75rem'
                      size='sm'
                      onClick={() => setShow(!show)}
                    ></IconButton>
                  </InputLeftElement>
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
                    {loginState === 'signin' && (
                      <UiLink
                        color={'#c1121f'}
                        fontWeight='bold'
                        _hover={{
                          color: 'green.500'
                        }}
                        onClick={() =>
                          alert('forget password will be applied soon')
                        }
                      >
                        نسيت كلمة السر ؟
                      </UiLink>
                    )}
                  </Flex>
                </Stack>
                <Button
                  isDisabled={formSubmited}
                  bg={'green.400'}
                  color={'white'}
                  isLoading={formSubmited}
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
