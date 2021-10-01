import { useEffect, Fragment } from 'react';
import Login from '../Auth/Login';
import Nav from './Nav';
import { Wrap } from '@chakra-ui/react';
import { useSettingsStore } from '../../zustand/store';

const Layout = ({ children }) => {
  // const activePage = useSettingsStore((state) => state.activePage);

  // useEffect(() => {}, [activePage]);
  return (
    <Fragment>
      <Nav />
      <Login />
      <main>{children}</main>
    </Fragment>
  );
};

export default Layout;
