import React, { useEffect } from 'react';
import {
  useDisclosure,
  Image,
  DrawerFooter,
  Drawer,
  DrawerOverlay,
  DrawerBody,
  IconButton,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  Wrap
} from '@chakra-ui/react';
import { CgMenu } from 'react-icons/cg';

import UiLinkItem from './UiLink';
import NavButtons from './NavButtons';

const NavItems = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Image src='/brand1.png' alt='Brand' width={'150px'} />
      <Wrap display={{ base: 'none', md: 'flex' }}>
        <UiLinkItem />
      </Wrap>
      <Wrap display={{ base: 'none', md: 'flex' }}>
        <NavButtons />
      </Wrap>
      <Wrap display={{ base: 'flex', md: 'none' }}>
        <IconButton
          variant='outline'
          colorScheme='green'
          aria-label='Toggole Menu'
          icon={<CgMenu />}
          onClick={onOpen}
        />
        <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <Image mx='auto' src='/brand1.png' alt='Brand' width={'150px'} />
            </DrawerHeader>

            <DrawerBody>
              <UiLinkItem vertical={true} />
            </DrawerBody>

            <DrawerFooter>
              <NavButtons vertical={true} />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Wrap>
    </>
  );
};

export default NavItems;
