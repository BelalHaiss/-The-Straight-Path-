import {
  Box,
  SkeletonCircle,
  SkeletonText,
  Flex,
  CircularProgress
} from '@chakra-ui/react';

const Loader = ({ circle }) => {
  if (circle)
    return (
      <Flex alignItems='center' justifyContent='center' mt='40vh'>
        <CircularProgress size='120px' isIndeterminate color='green.300' />
      </Flex>
    );
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
