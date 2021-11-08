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
  const [loading, setLoading] = useState(true);
  const [isUser, setIsUser] = useState(false);
  const router = useRouter();
  const theSetUser = useStore((state) => state.theSetUser);
  const user = useStore((state) => state.user);

  const { data, error } = useSWR(isUser ? '/users' : null, fetcher, {
    onSuccess: (data) => {
      theSetUser(data);
      let welcomeMsg = 'السلام عليكم  ';
      Toast(welcomeMsg, data.name, 'success');
      router.replace('/users/' + user.username);
      setLoading(false);
    },
    onError: () => setLoading(false)
  });
  useEffect(() => {
    if (!user) {
      const userSaved = document.cookie.includes('TSPUSER');
      setIsUser(userSaved);
      if (!userSaved) setLoading(false);
    }
  }, [user]);

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
