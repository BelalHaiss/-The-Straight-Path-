import React from 'react';
import {
  Link as UiLink,
  Stack,
  PopoverContent,
  PopoverTrigger,
  useColorModeValue,
  Popover,
  Flex
} from '@chakra-ui/react';
const UiLinkItem = ({ vertical }) => {
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  const navLinks = [
    { text: 'home', href: 'home' },
    {
      text: 'memorizing',
      href: 'memorizing',
      children: [
        { text: 'group', href: 'group' },
        { text: 'one to one', href: 'one-to-one' }
      ]
    },
    { text: '7al2et telawwa', href: '7al2a' },
    { text: 'donate', href: 'donate' },
    { text: 'contact us', href: 'contact' }
  ];
  const childLinkColor = useColorModeValue('black', 'white');
  const LinkColor = useColorModeValue('black', 'gray.200');
  return (
    <Flex
      alignItems='center'
      gridGap={vertical && '2'}
      flexDirection={vertical ? 'column' : 'row'}
    >
      {navLinks.map((navItem) => (
        <Popover
          id={navItem.text}
          trigger={'hover'}
          key={navItem.text}
          placement={'bottom-start'}
        >
          <PopoverTrigger>
            <UiLink
              fontSize={vertical ? 'xl' : 'lg'}
              textTransform='capitalize'
              color={LinkColor}
              href={navItem.href ? navItem.href : '#'}
              _hover={{
                textDecoration: 'none',
                color: 'green.300',
                fontWeight: 'bold'
              }}
              mr={{ sm: 2 }}
            >
              {navItem.text}
            </UiLink>
          </PopoverTrigger>

          {navItem.children && (
            <PopoverContent
              border={0}
              boxShadow={'xl'}
              bg={popoverContentBgColor}
              p={4}
              rounded={'xl'}
              minW={'sm'}
            >
              <Stack>
                {navItem.children.map((child) => (
                  <UiLink
                    key={child.text}
                    fontSize='lg'
                    color={childLinkColor}
                    href={navItem.href ? navItem.href : '#'}
                    _hover={{
                      textDecoration: 'none',
                      color: 'green.300',
                      fontWeight: 'bold'
                    }}
                    mr={{ sm: 2 }}
                  >
                    {navItem.text}
                  </UiLink>
                ))}
              </Stack>
            </PopoverContent>
          )}
        </Popover>
      ))}
    </Flex>
  );
};

export default UiLinkItem;
