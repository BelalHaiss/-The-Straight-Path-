import {
  Flex,
  Text,
  Image,
  useDisclosure,
  Button,
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
import { useStore } from '../../zustand/store';
import NavButtons from './NavButtons';
import ProfileNav from './ProfileNav';
import SearchNav from './SearchNav';
import UiLink from './UiLink';

const Nav = () => {
  const router = useRouter();
  const paths = router.pathname.split('/');
  const activePage = useStore((state) => state.activePage);
  const lang = useStore((state) => state.lang);
  const user = useStore((state) => state.user);
  const setLang = useStore((state) => state.setLang);

  const theActivePage = useStore((state) => state.theActivePage);

  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {}, []);
  return (
    <>
      <nav>
        {/* main nav */}
        <Flex
          p='1'
          dir='ltr'
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          {user && (
            <>
              <ProfileNav />
              <SearchNav />
            </>
          )}
          {!user && <NavButtons />}

          <UiLink />
        </Flex>
        {/* sidenav */}
      </nav>
    </>
  );
};

export default Nav;
