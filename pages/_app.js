import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../src/components/Layout/Layout';
import '../styles/main.scss';
import theme from '../styles/theme';
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
