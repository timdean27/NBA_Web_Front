// PageLayout.tsx

import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();

  return (
    <Flex>
      {/* Sidebar on the left */}
      {pathname !== '/auth' && (
        <Box w={{ base: '70px', md: '240px' }} borderRight="1px solid black" boxShadow="2xl">
          <Sidebar />
        </Box>
      )}

      {/* The page content on the right */}
      <Box flex={1} w={{ base: 'calc(100% - 70px)', md: 'calc(100% - 240px)' }} boxShadow="2xl">
        {children}
      </Box>
    </Flex>
  );
};

export default PageLayout;
