import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../src/components/Layout/Layout';
import '../styles/main.scss';
import theme from '../styles/theme';
import { SWRConfig } from 'swr';
import { fetcher } from '../src/components/UTS/fetcher';
import { useCreateStore, Provider } from '../src/zustand/store';
function MyApp({ Component, pageProps }) {
  const createStore = useCreateStore(pageProps.initialZustandState);

  return (
    <Provider createStore={createStore}>
      <SWRConfig
        value={{
          fetcher,
          dedupingInterval: 13600000,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
          shouldRetryOnError: false
        }}
      >
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </SWRConfig>
    </Provider>
  );
}

export default MyApp;
