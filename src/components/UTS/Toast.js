import { createStandaloneToast } from '@chakra-ui/react';
const toast = createStandaloneToast();

export default function Toast(text, description, type = 'error') {
  return toast({
    title: text,
    description: description && description,
    status: `${type}`,
    duration: 2000
  });
}
