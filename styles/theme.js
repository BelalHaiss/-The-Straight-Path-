import { extendTheme } from '@chakra-ui/react';
const theme = extendTheme({
  fonts: {
    heading: 'Tajawal , sans-serif',
    body: 'Tajawal'
  },
  styles: {
    global: {
      // styles for the `body`
      body: {
        bgGradient: 'linear(to-r, #c0fdff,#cad2c5, #caffbf)',
        zIndex: '-20'
      },
      main: {
        p: '2',
        bg: 'gray.50',
        position: 'fixed',

        top: '10%',
        right: { base: '1%', sm: '26%', md: '22%', lg: '18%' },
        left: '1%',
        zIndex: '-1',
        borderRadius: 'xl',
        mr: { base: '0', sm: '2' },
        boxShadow: 'xl',
        bottom: '20%'
      }
    }
  }
});
export default theme;
