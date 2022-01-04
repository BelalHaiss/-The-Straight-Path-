import { extendTheme } from '@chakra-ui/react';
const theme = extendTheme({
  colors: {
    brand: {
      icons: '#118ab2',
      // ...
      textPrimary: '#4a5570',
      textSecondary: '#7B8793',
      green: '#06d6a0'
    }
  },
  textStyles: {
    body: {
      fontFamily: 'Tajawal , sans-serif',
      display: 'flex'
    }
  },
  styles: {
    global: {
      // styles for the `body`
      body: {
        bgGradient: 'linear(to-r, #c0fdff 0%,#cad2c5, #caffbf)',
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
        overflow: 'auto',
        boxShadow: 'xl',
        bottom: '20%'
      },
      footer: {
        p: '2',
        position: 'fixed',
        bottom: '2%',
        bg: 'gray.50',
        borderRadius: 'xl',
        zIndex: '-1',

        mt: '1',
        boxShadow: 'xl',
        left: '5%',
        right: { base: '5%', sm: '29%', md: '25%' }
      }
    }
  }
});
export default theme;
