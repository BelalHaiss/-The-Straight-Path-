import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

const Loader = () => {
  return (
    <Box dir='ltr'>
      <Box
        padding='6'
        maxW='90%'
        mx='auto'
        mt='4 '
        rounded='xl'
        boxShadow='lg'
        bg='white'
      >
        <SkeletonCircle size='10' />
      </Box>
      <Box
        padding='10%'
        maxW='90%'
        mx='auto'
        rounded='xl'
        mt='5%'
        boxShadow='lg'
        bg='white'
      >
        <SkeletonText mt='4' noOfLines={4} spacing='4' />
      </Box>
    </Box>
  );
};

export default Loader;
