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
import { useEffect, useState } from 'react';
import { useSettingsStore } from '../../zustand/store';
const UiLinkItem = ({ isOpen }) => {
  const activePage = useSettingsStore((state) => state.activePage);
  const [active, setActive] = useState('');
  useEffect(() => {
    setActive(activePage);
  }, [activePage]);
  const theActivePage = useSettingsStore((state) => state.theActivePage);
  const navLinks = [
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
      {navLinks.map((navItem) => {
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
              whiteSpace={isOpen ? 'nowrap' : 'normal'}
              w={{ base: '100px', sm: 'auto' }}
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
                    onClick={() =>
                      theActivePage({
                        text: navItem.text,
                        href: navItem.href
                      })
                    }
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
          <Link
            key={navItem.text}
            passHref
            href={navItem.href ? navItem.href : '#'}
          >
            <UiLink
              onClick={() =>
                theActivePage({ text: navItem.text, href: navItem.href })
              }
              color={active.text === navItem.text ? 'green.400' : 'gray.600'}
              fontSize={{ sm: 'md', lg: 'lg' }}
              textTransform='capitalize'
              fontWeight='bold'
              textAlign='center'
              _hover={{
                textDecoration: 'none',
                color: 'green.400'
              }}
              mr={{ sm: 2 }}
            >
              {navItem.text}
            </UiLink>
          </Link>
        );
      })}
    </Flex>
  );
};

export default UiLinkItem;
