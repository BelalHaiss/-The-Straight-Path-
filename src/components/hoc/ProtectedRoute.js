import { useRouter } from 'next/router';
const protectedRoute = (ProtectedComponent) => {
  // eslint-disable-next-line
  return (props) => {
    const { user } = props;
    const Router = useRouter();
    if (typeof window !== 'undefined') {
      if (user === null) {
        Router.replace('/');
        return null;
      } else {
        return <ProtectedComponent {...props} />;
      }
    }

    return null;
  };
};

export default protectedRoute;
