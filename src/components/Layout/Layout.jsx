import { useEffect, Fragment, useState } from 'react';
import Login from '../Auth/Login';
import Nav from './Nav';
import Loader from './Loader';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Toast from '../UTS/Toast';

import { useStore } from '../../zustand/store';
import { fetcher } from '../UTS/fetcher';
import Meta from '../Meta';
import Footer from './Footer';
const Layout = ({ children }) => {
  const router = useRouter();
  const locale = router.locale;
  const [loading, setLoading] = useState(true);
  const [isUser, setIsUser] = useState(false);
  const theSetUser = useStore((state) => state.theSetUser);
  const user = useStore((state) => state.user);
  const theActivePage = useStore((state) => state.theActivePage);
  const lang = useStore((state) => state.lang);
  const setLang = useStore((state) => state.setLang);

  const {} = useSWR(isUser ? '/users' : null, fetcher, {
    onSuccess: (data) => {
      theSetUser(data);
      setLoading(false);
      let welcomeMsg = 'السلام عليكم  ';
      Toast(welcomeMsg, data.name, 'success');
    },
    onError: () => {
      setLoading(false);
    }
  });
  useEffect(() => {
    if (!user) {
      const userSaved = document.cookie.includes('TSPUSER');
      setIsUser(userSaved);
      if (!userSaved) setLoading(false);
    }
  }, [user]);
  useEffect(() => {
    if (lang !== locale) {
      setLang(locale);
    }
    if (lang === 'ar') {
      document.body.style.direction = 'rtl';
    }
  }, [locale]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <Meta />
      <Nav user={user} />
      {!user && <Login />}
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
