/* eslint-disable react/no-children-prop */
import React, { useState } from 'react';
import {  Button,InputGroup, Input, Flex,FormControl, FormErrorMessage,InputLeftAddon,InputLeftElement} from '@chakra-ui/react';
import { useStore } from '../../zustand/store';
import ProtectedRoute from '../hoc/ProtectedRoute';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import { useFormik } from 'formik';

const EditProfile = () => { 
  const user = useStore((state) => state.user);
  
  const textInputs = [
    { children: 'الايميل ', name:'email', type:'text' },
    { children: 'الاسم بالكامل',name:'name', type:'text' },
   
  ];

  const numInputs = [
    { children: 'العمر', name:'age'  ,type:'number'},
    { children: 'رقم الواتساب', name:'whatsapp' ,type:'number' }
  ]
  const validate =(values)=>{
    let errors = {}
    if( values.name.length < 8 )  errors.name = "برجاء ادخال الاسم بالكامل" ;
    const re = /^([a-zA-Z0-9_\-?\.?]+){3,}@([a-zA-Z]){2,}\.([a-zA-Z]){2,5}$/;
    if(!re.test(values.email)) errors.email = 'برجاء التاكد من عنوان البريد الالكتروني'  ;
    if(values.age < 5 || values.age > 100) errors.age = 'لايمكن ان يقل العمر عن 5 سنوات ';
    if(values.whatsapp.length < 6) errors.whatsapp = 'برجاء ادخال رقم صحيح' ;
    return errors   
    }
  
  const formik = useFormik({
    initialValues: {
      name: user.name,
      email:user.email ,
      age: user.age?? '',
      whatsapp: user.whatsapp?? ''
    },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Flex  p='6' flexDirection='column'>
      <form onSubmit={formik.handleSubmit} > 

      <Flex flexDirection={{ base: 'column', md: 'row' }} gridGap='3'>
        {textInputs.map((input) => (
       <FormControl isInvalid={formik.errors[input.name] && formik.touched[input.name]} key={input.name}  >
       <InputGroup     size='sm' >
       <InputLeftAddon children={input.children} />
          
           <Input type={input.type} maxLength={input.name === 'age' ? 2 : 20} onChange={formik.handleChange}
           name={input.name}
         onBlur={formik.handleBlur}
         value={formik.values[input.name]}  />
       </InputGroup>
       <FormErrorMessage mr='2'> { formik.errors[input.name]} </FormErrorMessage>
   
       </FormControl> 
        ))}
      </Flex>
      <Flex my='2' flexDirection={{ base: 'column', md: 'row' }} gridGap='3'>
      {numInputs.map((input)=>(
         <FormControl 
          flex={input.name === 'age' ? '1' : '2'} isInvalid={formik.errors[input.name] && formik.touched[input.name]} key={input.name}  >
         <InputGroup     size='sm' >
         <InputLeftAddon children={input.children} />
         {input.name === 'whatsapp' && <InputLeftElement 
          pointerEvents="none"

          children={<AiOutlineWhatsApp fontSize='2rem' color="green" /> } />}
  
             <Input type={input.type}  onChange={formik.handleChange}
             name={input.name}
           onBlur={formik.handleBlur}
           value={formik.values[input.name]}  />
         </InputGroup>
         <FormErrorMessage mr='2'> { formik.errors[input.name]} </FormErrorMessage>
     
         </FormControl> 
      ))}

      </Flex>
      <Button
                  
                  bg={'green.400'}
                  color={'white'}
                  type='submit'
                  _hover={{
                    bg: 'green.500'
                  }}
                >
                  Submit
                </Button>      </form>
    </Flex>
  );
};

export default ProtectedRoute(EditProfile);
