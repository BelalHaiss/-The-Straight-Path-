import { useEffect, Fragment, useState } from 'react';
import Login from '../Auth/Login';
import Nav from './Nav';
import Loader from './Loader';
import { useRouter } from 'next/router';
import useSWR, { SWRConfig } from 'swr';
import Toast from '../UTS/Toast';
import { useStore } from '../../zustand/store';
import { fetcher } from '../UTS/fetcher';
import Meta from '../Meta'
import Footer from './Footer';
const Layout = ({ children }) => {
  const { data, error } = useSWR('/users', fetcher, {
    onSuccess: (data) => {
      if (!user) {
        theSetUser(data);
        let welcomeMsg = 'السلام عليكم  ';
        Toast(welcomeMsg, data.name, 'success');
        router.replace('/users/' + data.username);
      }
    }
  });
  const router = useRouter();
  const theSetUser = useStore((state) => state.theSetUser);
  const user = useStore((state) => state.user);
  
  if (!data && !error) {
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
