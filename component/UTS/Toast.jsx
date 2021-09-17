import { createStandaloneToast } from '@chakra-ui/react';
const toast = createStandaloneToast();

export default function Toast(text, description, type = 'error') {
  console.log(text, description, type);
  return toast({
    title: `${text}`,
    description: `${description}`,
    status: `${type}`,
    duration: 2000
  });
}
