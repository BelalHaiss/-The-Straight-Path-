import { Icon, Flex, Input } from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';

export default function SearchNav() {
  return (
    <Flex
      flex='1'
      position={'relative'}
      h={'max-content'}
      borderBottom={'1px'}
      borderColor={'brand.icons'}
    >
      <Input
        dir='rtl'
        placeholder='بحث'
        pr='10'
        pb='1'
        _focus={{
          background: 'white',
          color: 'green.500'
        }}
        border='0'
      />
      <Icon
        as={BsSearch}
        top='30%'
        right='3%'
        position={'absolute'}
        color={'brand.icons'}
      />
    </Flex>
  );
}
