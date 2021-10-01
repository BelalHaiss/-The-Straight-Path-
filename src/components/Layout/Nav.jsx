import {
  Flex,
  Text,
  Image,
  useDisclosure,
  Wrap,
  IconButton,
  BreadcrumbLink,
  BreadcrumbItem,
  Breadcrumb,
  Slide
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { HiMenuAlt1, HiOutlineX, HiChevronLeft } from 'react-icons/hi';
import { useEffect } from 'react';
import UiLinkItem from './UiLink';
import { useSettingsStore } from '../../zustand/store';
import NavButtons from './NavButtons';
const Nav = () => {
  const router = useRouter();

  const paths = router.pathname.split('/');

  const activePage = useSettingsStore((state) => state.activePage);

  const theActivePage = useSettingsStore((state) => state.theActivePage);

  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (paths.length === 2 && paths[1].length === 0) {
      return theActivePage({ text: 'الصفحة الرئيسية', href: '/' });
    } else {
      const pathName = (path) => {
        switch (path) {
          case 'teachers':
            return 'المعلمين';
          case 'memorizing':
            return 'حفظ القرآن';
          case 'tilawa':
            return 'تعلم التلاوة';
          case 'contact':
            return 'تواصل معنا';

          default:
            return 'الصفحة الرئيسية ';
        }
      };
      return theActivePage({ href: paths[1], text: pathName(paths[1]) });
    }
  }, []);
  return (
    <nav>
      <Flex
        p='2'
        bg='gray.50'
        position='fixed'
        maxW={isOpen ? 'auto' : '25%'}
        h={{ base: `${isOpen ? 'auto' : '0'}`, sm: 'auto' }}
        top='6%'
        right={'1%'}
        borderRadius='xl'
        alignItems='center'
        flexDirection='column'
        bottom='5%'
        boxShadow='xl'
        display={{ base: 'none', sm: `${isOpen ? 'none' : 'block'}` }}
      >
        <Image src='/brand1.png' alt='logo' w='150px' />
        <UiLinkItem />
      </Flex>
      <Wrap display={isOpen ? 'block' : 'none'}>
        <Slide direction='right' mr='auto' in={isOpen}>
          <Flex
            p='2'
            bg={{ base: `${isOpen ? 'gray.50' : 'none'}`, sm: 'gray.50' }}
            position='fixed'
            maxW={isOpen ? 'auto' : '25%'}
            h={{ base: `${isOpen ? 'auto' : '0'}`, sm: 'auto' }}
            top='6%'
            right={'1%'}
            left={isOpen && '2%'}
            borderRadius='xl'
            alignItems='center'
            flexDirection='column'
            bottom='5%'
            boxShadow='xl'
          >
            <Image
              display={!isOpen && 'none'}
              src='/brand1.png'
              alt='logo'
              w='150px'
            />
            <UiLinkItem isOpen={isOpen} />
          </Flex>
        </Slide>
      </Wrap>
      <IconButton
        color={isOpen ? 'black' : 'green.400'}
        position='fixed'
        top='3%'
        variant='solid'
        colorScheme={isOpen ? 'whiteAlpha' : 'blackAlpha'}
        right={isOpen ? '2%' : '0'}
        onClick={isOpen ? onClose : onOpen}
        aria-label={isOpen ? 'اغلاق القائمة' : 'القائمة الرئيسية'}
        className='svg-100'
        icon={isOpen ? <HiOutlineX /> : <HiMenuAlt1 />}
        display={{ base: 'block', sm: `${isOpen ? 'block' : 'none'}` }}
      ></IconButton>
      <Flex justifyContent='space-between'>
        <Breadcrumb
          w='100%'
          p='2'
          separator={<HiChevronLeft color='green.200' />}
          fontWeight='bold'
          fontSize={{ base: '10px', md: 'md' }}
          mr='15%'
          className='nav-Breadcrumb'
        >
          <BreadcrumbItem>
            <Link href={activePage.href} replace>
              {activePage.text}
            </Link>
          </BreadcrumbItem>
          {paths.length === 3 && (
            <BreadcrumbItem color='black'>
              <Link href={paths[2]}>
                {paths[2] === 'group' ? 'مجموعة ' : 'مجموعة خاصة'}
              </Link>
            </BreadcrumbItem>
          )}
        </Breadcrumb>
        <NavButtons />
      </Flex>
    </nav>
  );
};

export default Nav;