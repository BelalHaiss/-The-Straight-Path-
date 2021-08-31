import { Fragment } from 'react';
import Login from './Auth/Login';
import Nav from './Nav';

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Nav />
      <Login />
      {children}
    </Fragment>
  );
};

export default Layout;
