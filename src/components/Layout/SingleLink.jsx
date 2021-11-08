import React from 'react';

import Link from 'next/link';
import { Link as UiLink } from '@chakra-ui/react';
const SingleLink = ({
  navItem,
  theActivePage,
  onClose,
  activePage,
  isOpen
}) => {
  return (
    <Link passHref href={navItem.href ? navItem.href : '#'}>
      <UiLink
        onClick={() => {
          isOpen && onClose();
          theActivePage({ text: navItem.text, href: navItem.href });
        }}
        color={activePage.text === navItem.text ? 'green.400' : 'gray.600'}
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
};

export default React.memo(SingleLink);
