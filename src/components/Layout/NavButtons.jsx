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
import { useUserStore, useSettingsStore } from '../../zustand/store';

const NavButtons = () => {
  const user = useUserStore((state) => state.user);
  const theLogout = useUserStore((state) => state.theLogout);

  const theLoginBtn = useSettingsStore((state) => state.theLoginBtn);
  return (
    <>
      {user === null ? (
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
              <Avatar size='sm' />
            </PopoverTrigger>
            <PopoverContent>
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
          <Text> بلال</Text>
        </Flex>
      )}
    </>
  );
};

export default NavButtons;
