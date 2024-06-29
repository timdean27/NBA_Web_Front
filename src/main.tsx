// main.tsx

import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

// Define global styles and color mode settings
const styles = {
  global: (props: any) => ({
    body: {
      bg: props.colorMode === 'light' ? '#f3f3f3' : 'gray.800', // Background color
      color: props.colorMode === 'light' ? 'darkgreen' : 'whiteAlpha.900', // Text color
    },
  }),
};

// Initial color mode configuration
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

// Extend the theme with the custom configurations
const theme = extendTheme({ config, styles });

// Create the root for React 18 rendering
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Router>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </Router>
    </ChakraProvider>
  </React.StrictMode>,
);
