import {
  Button,
  Flex,
  Avatar,
  PopoverBody,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Text,
  Popover
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useStore } from '../../zustand/store';
const firstName = (name) => {
  const i = name.indexOf(' ');
  const fName = name.slice(0, i);
  return fName;
};
const NavButtons = () => {
  const user = useStore((state) => state.user);
  const theLogout = useStore((state) => state.theLogout);
  const theLoginBtn = useStore((state) => state.theLoginBtn);

  return (
    <>
      {!user ? (
        <Flex
          ml={{ base: '0', sm: '3' }}
          p='2'
          w='100%'
          justifyContent='flex-end'
          alignItems='center'
          gridGap={1}
        >
          <Button
            onClick={() => theLoginBtn('signin')}
            size='sm'
            colorScheme='gray'
            variant='outline'
          >
            دخول
          </Button>
          <Button
            onClick={() => theLoginBtn('signup')}
            size='sm'
            mr={{ sm: 2 }}
            colorScheme='green'
            variant='solid'
            whiteSpace='normal'
          >
            سجل مجانا
          </Button>
        </Flex>
      ) : (
        <Flex
          mt='1'
          ml='2'
          alignItems='center'
          w='100%'
          gridGap='2'
          justifyContent='flex-end'
        >
          <Popover trigger='hover'>
            <PopoverTrigger>
              <Avatar
                colorScheme={'whiteAlpha'}
                name={user.name}
                src={
                  user.gender &&
                  ((user.gender === 'female' && '/girl.png') ||
                    (user.gender === 'male' && '/boy.png'))
                }
                size='sm'
              />
            </PopoverTrigger>
            <PopoverContent
              maxW='200px'
              background='gray.200'
              alignItems='center'
            >
              <PopoverArrow />
              <PopoverBody>
                <Button
                  onClick={theLogout}
                  size='sm'
                  fontSize={{ base: '10px', sm: 'md' }}
                  mr={{ sm: 2 }}
                  colorScheme='red'
                  variant='solid'
                >
                  Logout
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <Text> {user ? firstName(user.name) : 'مرحبا'}</Text>
        </Flex>
      )}
    </>
  );
};

export default NavButtons;
