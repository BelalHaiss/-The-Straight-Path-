/* eslint-disable react/no-children-prop */
import React, { useState } from 'react';
import {
  Button,
  InputGroup,
  Input,
  Flex,
  FormControl,
  Icon,
  Wrap,
  FormErrorMessage,
  InputLeftAddon,
  InputLeftElement
} from '@chakra-ui/react';
import { useStore } from '../../zustand/store';
import ProtectedRoute from '../hoc/ProtectedRoute';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import { useFormik } from 'formik';
import Select from 'react-select';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';
import ChangePassword from './ChangePassword';
import { fetcher } from '../UTS/fetcher';
import Toast from '../UTS/Toast';

const options = [
  { value: '1', label: 'الجزء رقم(1- البقرة)' },
  { value: '2', label: 'الجزء رقم(2)' },
  { value: '3', label: 'الجزء رقم(3)' },
  { value: '4', label: 'الجزء رقم(4)' },
  { value: '5', label: 'الجزء رقم(5)' },
  { value: '6', label: 'الجزء رقم(6)' },
  { value: '7', label: 'الجزء رقم(7)' },
  { value: '8', label: 'الجزء رقم(8)' },
  { value: '9', label: 'الجزء رقم(9)' },
  { value: '10', label: 'الجزء رقم(10)' },
  { value: '11', label: 'الجزء رقم(11)' },
  { value: '12', label: 'الجزء رقم(12)' },
  { value: '13', label: 'الجزء رقم(13)' },
  { value: '14', label: 'الجزء رقم(14)' },
  { value: '15', label: 'الجزء رقم(15)' },
  { value: '16', label: 'الجزء رقم(16)' },
  { value: '17', label: 'الجزء رقم(17)' },
  { value: '18', label: 'الجزء رقم(18)' },
  { value: '19', label: 'الجزء رقم(19)' },
  { value: '20', label: 'الجزء رقم(20)' },
  { value: '21', label: 'الجزء رقم(21)' },
  { value: '22', label: 'الجزء رقم(22)' },
  { value: '23', label: 'الجزء رقم(23)' },
  { value: '24', label: 'الجزء رقم(24)' },
  { value: '25', label: 'الجزء رقم(25)' },
  { value: '26', label: 'الجزء رقم(26)' },
  { value: '27', label: 'الجزء رقم(27)' },
  { value: '28', label: 'الجزء رقم(28)' },
  { value: '29', label: 'الجزء رقم(29)' },
  { value: '30', label: 'الجزء رقم(30 -عم)' }
];

const EditProfile = () => {
  const user = useStore((state) => state.user);
  const initJuzValues = () => {
    const filterd = options.filter(
      (option) => user?.juz?.indexOf(+option.value) > -1
    );
    return filterd;
  };
  const [juzValue, setJuzValues] = useState(initJuzValues);
  const handleJuzChange = (options) => {
    setJuzValues(options);
    const values = options.map((option) => +option.value);
    formik.setFieldValue('juz', values);
  };
  const textInputs = [
    { children: 'البريد الالكتروني ', name: 'email', type: 'text' },
    { children: 'الاسم بالكامل', name: 'name', type: 'text' }
  ];

  const numInputs = [
    { children: 'رقم الواتساب', name: 'whatsapp', type: 'number' },
    { children: ' العمر', name: 'age', type: 'number' }
  ];
  const validate = (values) => {
    let errors = {};
    if (values.name.length < 8) errors.name = 'برجاء ادخال الاسم بالكامل';
    const re = /^([a-zA-Z0-9_\-?\.?]+){3,}@([a-zA-Z]){2,}\.([a-zA-Z]){2,5}$/;
    if (!re.test(values.email))
      errors.email = 'برجاء التاكد من عنوان البريد الالكتروني';
    if (values.age < 5 || values.age > 100)
      errors.age = 'لايمكن ان يقل العمر عن 5 سنوات ';
    if (values.whatsapp.toString().length < 6)
      errors.whatsapp = 'برجاء ادخال رقم صحيح';
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      age: user.age ?? '',
      whatsapp: user.whatsapp ?? '',
      juz: user.juz ?? ''
    },
    validate,
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
      try {
        const req = await fetcher('/users/edit', 'POST', {
          ...values,
          whatsapp: values.whatsapp.toString()
        });
      } catch (error) {
        Toast('برجاء مراجعة المعلومات');
      }
    }
  });
  const setAge = (sign) => {
    if (sign === '+') {
      formik.setFieldValue('age', +formik.values.age + 1);
    } else {
      formik.setFieldValue('age', +formik.values.age - 1);
    }
  };
  return (
    <Flex p={{ base: '1', md: '6' }} flexDirection='column'>
      <form onSubmit={formik.handleSubmit}>
        <Flex flexDirection={{ base: 'column', md: 'row' }} gridGap='3'>
          {textInputs.map((input) => (
            <FormControl
              id={input.name}
              isInvalid={
                formik.errors[input.name] && formik.touched[input.name]
              }
              key={input.name}
            >
              <InputGroup>
                <InputLeftAddon
                  fontSize={{ base: '10px', md: '15px' }}
                  children={input.children}
                />

                <Input
                  type={input.type}
                  fontSize={{ base: '10px', md: '15px' }}
                  onChange={formik.handleChange}
                  name={input.name}
                  onBlur={formik.handleBlur}
                  value={formik.values[input.name]}
                />
              </InputGroup>
              <FormErrorMessage mr='2'>
                {formik.errors[input.name]}
              </FormErrorMessage>
            </FormControl>
          ))}
        </Flex>
        <Flex my='2' flexDirection={{ base: 'column', md: 'row' }} gridGap='3'>
          {numInputs.map((input) => (
            <FormControl
              id={input.name}
              flex={input.name === 'age' ? '1' : '3'}
              isInvalid={
                formik.errors[input.name] && formik.touched[input.name]
              }
              key={input.name}
            >
              <InputGroup w={input.name === 'age' ? '180px' : 'auto'}>
                <InputLeftAddon
                  fontSize={{ base: '10px', md: '15px' }}
                  children={input.children}
                />
                {input.name === 'whatsapp' && (
                  <InputLeftElement
                    pointerEvents='none'
                    children={
                      <AiOutlineWhatsApp fontSize='1rem' color='green' />
                    }
                  />
                )}

                <Input
                  type={input.type}
                  fontSize={{ base: '10px', md: '15px' }}
                  onChange={formik.handleChange}
                  zIndex='1'
                  placeholder={input.name === 'age' ? '20' : ''}
                  name={input.name}
                  onBlur={formik.handleBlur}
                  value={formik.values[input.name]}
                />
                {input.name === 'age' && (
                  <Flex
                    flexDirection='column'
                    position='absolute'
                    top='1px'
                    zIndex='20'
                    left='1px'
                  >
                    <Icon
                      color='green'
                      aria-label='اضف واحد للعمر'
                      w={'19px'}
                      h={'19px'}
                      onClick={() => setAge('+')}
                      as={FiPlusCircle}
                    />
                    <Icon
                      color='red'
                      aria-label='انقص واحد من العمر'
                      w={'19px'}
                      h={'19px'}
                      onClick={() => setAge('-')}
                      as={FiMinusCircle}
                    />
                  </Flex>
                )}
              </InputGroup>
              <FormErrorMessage mr='2'>
                {formik.errors[input.name]}
              </FormErrorMessage>
            </FormControl>
          ))}
        </Flex>
        <Flex
          flexDirection={{ base: 'column', md: 'row' }}
          alignItems='center'
          gridGap='1.5'
          my='2'
          w='100%'
        >
          <Wrap
            backgroundColor='gray.100'
            border='1px'
            borderRadius='sm'
            borderColor='gray.300'
            p='2'
            fontSize={{ base: '10px', md: '15px' }}
          >
            <label htmlFor='juz'> الاجزاء المحفوظة</label>
          </Wrap>
          <Select
            styles={{ menu: (provided) => ({ ...provided, zIndex: 9999 }) }}
            value={juzValue}
            onChange={(options) => {
              handleJuzChange(options);
            }}
            id='juz'
            name='juz'
            isSearchable
            menuPlacement='auto'
            isClearable
            closeMenuOnSelect={false}
            aria-label='اختر جميع الاجزاء التي تحفظها'
            isMulti
            placeholder='اختر جميع الاجزاء التي تحفظها'
            options={options}
          />
        </Flex>
        <Flex justifyContent='center' my='2' gridGap='3'>
          <Button
            w='300px'
            fontSize='15px'
            bg={'green.400'}
            color={'white'}
            type='submit'
            _hover={{
              bg: 'green.500'
            }}
          >
            حفظ التعديل{' '}
          </Button>
          {formik.values !== formik.initialValues && (
            <Button
              w='300px'
              fontSize='15px'
              colorScheme='gray'
              onClick={(e) => {
                formik.handleReset(e);
                setJuzValues(initJuzValues);
              }}
            >
              الغاء التعديل{' '}
            </Button>
          )}
        </Flex>
      </form>
      <ChangePassword user={user} />
    </Flex>
  );
};

export default ProtectedRoute(EditProfile);
