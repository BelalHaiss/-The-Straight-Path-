import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useStore } from '../../zustand/store';
import Loader from '../Layout/Loader';
const ProtectedRoute = (WrappedComponent) => {
  // eslint-disable-next-line
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line
      const Router = useRouter();
      // eslint-disable-next-line
      const [loading, setLoading] = useState(true);
      // eslint-disable-next-line
      const user = useStore((state) => state.user);
      // eslint-disable-next-line
      useEffect(() => {
        const userSaved = document.cookie.includes('TSPUSER');
        if (!user && !userSaved) setLoading(false);
        if (user) setLoading(false);
        if (!user && userSaved) setLoading(false);
      }, [user, loading]);
      if (loading) {
        return <Loader circle={true} />;
      }
      // If there is no access token we redirect to "/" page.
      if (!user && !loading) {
        Router.replace('/');
        return null;
      }
      return <WrappedComponent {...props} />;
    }
    // If we are on server, return null
    return null;
  };
};

export default ProtectedRoute;
