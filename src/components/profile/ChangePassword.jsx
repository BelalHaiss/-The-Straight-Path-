import { useFormik } from 'formik';
import {
  Accordion,
  AccordionItem,
  Flex,
  AccordionIcon,
  FormControl,
  AccordionButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Button,
  FormErrorMessage,
  AccordionPanel,
  IconButton
} from '@chakra-ui/react';
import { BiHide, BiShow } from 'react-icons/bi';

import { useState } from 'react';
const ChangePassword = ({ user }) => {
  const [show, setShow] = useState({ 0: false, 1: false });
  const validate = (values) => {
    let errors = {};
    if (values.oldPassword.length < 8)
      errors.oldPassword = 'خطا في كلمة المرور';
    if (values.newPassword.length < 8)
      errors.newPassword = 'كلمة المرور لا تقل عن 8 احرف';
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: ''
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });
  return (
    <Accordion allowToggle>
      <AccordionItem>
        <AccordionButton
          justifyContent='space-between'
          fontSize='larger'
          fontWeight='bold'
        >
          تغير كلمة السر
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <form onSubmit={formik.handleSubmit}>
            <Flex flexDirection={{ base: 'column', md: 'row' }} gridGap='2'>
              {Object.keys(formik.values).map((input, i) => (
                <FormControl
                  key={i}
                  isInvalid={formik.errors[input] && formik.touched[input]}
                >
                  <InputGroup key={input} size='md'>
                    <InputLeftAddon
                      fontSize={{ base: '10px', md: '15px' }}
                      children={
                        i === 0 ? 'كلمة السر القديمة' : 'كلمة السر الجديدة'
                      }
                    />
                    <Input
                      pr='4.5rem'
                      name={input}
                      value={formik.values[input]}
                      onChange={formik.handleChange}
                      type={show[i] ? 'text' : 'password'}
                    />
                    <InputLeftElement width='4.5rem'>
                      <IconButton
                        colorScheme={show[i] ? 'red' : 'green'}
                        aria-label={show[i] ? 'اخفاء' : 'اظهار'}
                        icon={show[i] ? <BiHide /> : <BiShow />}
                        h='1.75rem'
                        size='sm'
                        onClick={() =>
                          setShow((old) => ({
                            ...old,
                            [i]: !old[i]
                          }))
                        }
                      ></IconButton>
                    </InputLeftElement>
                  </InputGroup>
                  <FormErrorMessage>{formik.errors[input]}</FormErrorMessage>
                </FormControl>
              ))}
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
                تغير كلمة السر
              </Button>
              {formik.values !== formik.initialValues && (
                <Button
                  w='300px'
                  fontSize='15px'
                  colorScheme='gray'
                  onClick={(e) => {
                    formik.handleReset(e);
                  }}
                >
                  الغاء التعديل
                </Button>
              )}
            </Flex>
          </form>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default ChangePassword;
