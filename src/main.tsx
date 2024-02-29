// index.tsx

import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';



const styles = {
  global: (props: any) => ({
    body: {
      bg: props.colorMode === 'light' ? '#f3f3f3' : 'gray.800', // Very dark cream color for light mode
      color: props.colorMode === 'light' ? 'darkgreen' : 'whiteAlpha.900', // Dark green text color
    },
  }),
};

  
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({ config, styles });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Router>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </Router>
    </ChakraProvider>
  </React.StrictMode>,
);
