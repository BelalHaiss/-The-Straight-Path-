import { useRouter } from 'next/router';
import { Flex, Button, Text } from '@chakra-ui/react';
import navlinksAR from '../../languages/ar/navlinksAR';
import navlinksEN from '../../languages/en/navlinksEN';
import { useStore } from '../../zustand/store';
import Link from 'next/link';

export default function UiLink() {
  const lang = useStore((state) => state.lang);
  const user = useStore((state) => state.user);
  const setLang = useStore((state) => state.setLang);

  const router = useRouter();
  const i = router.pathname.lastIndexOf('/');
  const path = router.pathname.slice(1, i === 0 ? router.pathname.length : i);
  const locale = router.locale;
  console.log(lang);
  console.log(locale);
  const pathName = () => {
    if (locale === 'ar') return navlinksAR[path];
    if (locale === 'en') return navlinksEN[path];
  };
  return (
    <Flex flex={'1'} justifyContent={'space-around'}>
      <Link href={`/${path}`} locale={lang === 'en' ? 'ar' : 'en'}>
        <Button size='sm' colorScheme={'red'}>
          {lang === 'ar' ? 'EN' : 'عربي'}
        </Button>
      </Link>
      <Text fontWeight={'bold'} textTransform={'capitalize'} fontSize={'lg'}>
        {pathName()}
      </Text>
    </Flex>
  );
}
