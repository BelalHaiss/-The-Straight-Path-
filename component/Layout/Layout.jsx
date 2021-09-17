import { useRouter } from 'next/dist/client/router';
import { Fragment, useEffect, useState } from 'react';
import Login from '../Auth/Login';
import Nav from './Nav';
import { connect } from 'react-redux';
import { theChangeLang } from '../../Actions/mainAction';
const Layout = ({ children, theChangeLang, lang }) => {
  const Router = useRouter();
  const { locale } = Router;

  useEffect(() => {
    const body = document.querySelector('body');
    if (locale === 'ar') {
      body.classList.add('rtl');
    } else {
      body.classList.remove('rtl');
    }
    if (locale !== lang) {
      return theChangeLang();
    }
  }, [locale]);
  return (
    <Fragment>
      <Nav />
      <Login />
      {children}
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  lang: state.main.lang
});
export default connect(mapStateToProps, { theChangeLang })(Layout);
