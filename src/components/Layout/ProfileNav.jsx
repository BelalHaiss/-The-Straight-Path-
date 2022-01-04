import {
  Flex,
  Icon,
  Text,
  Avatar,
  PopoverBody,
  Button,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Popover
} from '@chakra-ui/react';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { GiThreeFriends } from 'react-icons/gi';
import { IoPersonAddSharp } from 'react-icons/io5';
import { BiLogOut } from 'react-icons/bi';

import { IoIosArrowDown, IoMdNotifications, IoMdText } from 'react-icons/io';
import { useStore } from '../../zustand/store';

export default function ProfileNav() {
  const user = useStore((state) => state.user);
  const theLogout = useStore((state) => state.theLogout);
  return (
    <Flex alignItems={'center'} gridGap={'1'} flex='1' ml='2'>
      <Flex alignItems={'center'}>
        <Icon as={IoIosArrowDown} color={'gray.900'} w='6' h='6' />
      </Flex>
      <Popover trigger='hover'>
        <PopoverTrigger>
          <Avatar
            name={user.name}
            src={
              user.gender &&
              ((user.gender === 'female' && '/girl.png') ||
                (user.gender === 'male' && '/boy.png'))
            }
            size='sm'
          />
        </PopoverTrigger>
        <PopoverContent maxW='500px' alignItems='center'>
          <PopoverArrow />
          <PopoverBody>
            <Flex gridGap={2} flexDirection={'column'}>
              <Flex gridGap={1} alignItems={'center'}>
                <Avatar size='lg' name={user?.name} />
                <Flex flexDirection={'column'}>
                  <Text fontSize='xl'> {user.name}</Text>
                  {user.email && <Text fontSize='sm'> {user.email}</Text>}
                </Flex>
              </Flex>
              <hr />
              <Flex gridGap={1} alignItems={'center'}>
                <Icon color='gray.900' as={MdOutlineManageAccounts} />
                <Text>حسابي</Text>
              </Flex>
              <Flex gridGap={1} alignItems={'center'}>
                <Icon color='gray.900' as={GiThreeFriends} />
                <Text>الاصدقاء</Text>
              </Flex>

              <hr />
              <Flex
                onClick={theLogout}
                cursor={'pointer'}
                alignItems={'center'}
                gridGap='1'
                role={'group'}
                _groupHover={{ color: 'white' }}
                _hover={{ bg: 'red.500', rounded: 'md', p: '1' }}
                w='max-content'
              >
                <Icon as={BiLogOut} color='gray.900' />
                <Text
                  _groupHover={{ color: 'white' }}
                  color='red.500'
                  fontSize='lg'
                >
                  Logout
                </Text>
              </Flex>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Flex gridGap={1}>
        <Icon color={'gray.900'} as={IoMdNotifications} w='6' h='6' />
        <Icon as={IoMdText} w='6' color={'gray.900'} h='6' />
      </Flex>
    </Flex>
  );
}
