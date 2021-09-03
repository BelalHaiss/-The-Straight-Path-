import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../component/Layout/Layout';
import { Provider } from 'react-redux';
import { useStore } from '../store';

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
