import { Flex, Text, Image } from '@chakra-ui/react';
const Footer = () => {
  return (
    <footer dir='ltr'>
      <Flex alignItems='center' wrap='wrap' justifyContent='center' gridGap='1'>
        <Text fontWeight='bold'> THE STRAIGH PATH 2021 &copy;</Text>
        <Image src='/brand1.png' alt='logo' w='100px' />
      </Flex>
    </footer>
  );
};
export default Footer;
