import {
  Link as UiLink,
  Menu,
  Button,
  MenuButton,
  MenuList,
  Badge,
  Icon,
  MenuItem,
  Flex
} from '@chakra-ui/react';
import Link from 'next/link';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { useCallback, memo } from 'react';
import { useStore } from '../../zustand/store';
import SingleLink from './SingleLink';
const UiLinkItem = ({ onClose, isOpen }) => {
  const user = useStore((state) => state.user);
  const theActivePage = useStore(
    useCallback((state) => state.theActivePage, [activePage])
  );
  const activePage = useStore(
    useCallback((state) => state.activePage, [activePage])
  );
  const commonLinks = {
    user: [
      { text: 'حسابي', href: '/users/' + user?.username },
      { text: 'مجموعتي', href: '/groups' },
      { text: 'المعاملات النقدية', href: '/transactions' },
      { text: 'ملاحظات هامة', href: '/notes' }
    ],
    admin: [
      { text: 'جميع الطلبات', href: '/requests' },
      { text: 'جميع المجاميع', href: '/groups' }
    ]
  };
  const usersLinks = {
    teacher: [...commonLinks.user],
    student: [...commonLinks.user],
    admin: [...commonLinks.admin],
    moderator: [...commonLinks.admin]
  };

  const generalLinks = [
    { text: 'الصفحة الرئيسية', href: '/' },
    {
      text: 'حفظ القرآن',
      href: '/memorizing',
      children: [
        { label: '5 افراد فقط', text: 'مجموعة ', href: '/memorizing/group' },
        {
          text: 'مجموعة خاصة',
          label: 'اختر بنفسك',
          href: '/memorizing/private'
        }
      ]
    },
    {
      text: 'تعلم التلاوة',
      href: '/tilawa',

      children: [
        { label: '5 افراد فقط', text: 'مجموعة ', href: '/tilawa/group' },
        {
          text: 'مجموعة خاصة',
          label: 'اختر بنفسك',
          href: '/tilawa/private'
        }
      ]
    },
    { text: 'المعلمين', href: '/teachers' },
    { text: 'تواصل معنا', href: '/contact' }
  ];
  return (
    <Flex
      alignItems='center'
      justifyContent='center'
      mt='6'
      display={{ base: `${isOpen ? 'flex' : 'none'}`, sm: 'flex' }}
      gridGap={'2'}
      w='100%'
      flexDirection={'column'}
      p='1'
    >
      {user &&
        usersLinks[user.accountType].map((navItem) => (
          <SingleLink
            key={navItem.text}
            navItem={navItem}
            theActivePage={theActivePage}
            activePage={activePage}
            isOpen={isOpen}
            onClose={onClose}
          />
        ))}
      {generalLinks.map((navItem) => {
        return navItem.children ? (
          <Menu key={navItem.text}>
            <MenuButton
              rightIcon={<Icon as={BsFillCaretDownFill} w={2} h={2} />}
              as={Button}
              fontSize={{ sm: '15px', lg: 'lg' }}
              color={activePage.text === navItem.text ? 'gray.200' : 'gray.600'}
              transition='all 0.2s'
              backgroundColor={activePage.text === navItem.text && 'green.400'}
              textAlign='center'
              borderRadius='md'
              // whiteSpace={isOpen ? 'nowrap' : 'normal'}
              w={{ base: `${isOpen ? 'auto' : '100px'}`, sm: 'auto' }}
              borderWidth='1px'
              _hover={{ bg: 'green.400', color: 'gray.200' }}
              _expanded={{ bg: 'green.400', color: 'gray.200' }}
              _focus={{ boxShadow: 'outline' }}
            >
              <Link passHref href={navItem.href ? navItem.href : '#'}>
                {navItem.text}
              </Link>
            </MenuButton>
            <MenuList backgroundColor='gray.200' minW='250px' zIndex='5000'>
              {navItem.children.map((child) => (
                <Link passHref key={child.text} href={child.href}>
                  <MenuItem
                    onClick={() => {
                      isOpen && onClose();
                      theActivePage({
                        text: navItem.text,
                        href: navItem.href
                      });
                    }}
                    fontSize={{ sm: 'md', lg: 'lg' }}
                    _hover={{ bg: 'green.400' }}
                    display='flex'
                    justifyContent='space-between'
                  >
                    {child.text}
                    {child.label && (
                      <Badge
                        variant='solid'
                        fontSize='md'
                        rounded='md'
                        colorScheme={
                          child.label === 'اختر بنفسك' ? 'red' : 'green'
                        }
                      >
                        {child.label}
                      </Badge>
                    )}
                  </MenuItem>
                </Link>
              ))}
            </MenuList>
          </Menu>
        ) : (
          <SingleLink
            key={navItem.text}
            navItem={navItem}
            theActivePage={theActivePage}
            activePage={activePage}
            onClose={onClose}
            isOpen={isOpen}
          />
        );
      })}
    </Flex>
  );
};

export default memo(UiLinkItem);
