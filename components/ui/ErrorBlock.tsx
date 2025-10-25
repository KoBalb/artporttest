'use client'
import { Box, Button, Slide, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function ErrorBlock({ error }: { error: string }) {
  const [showError, setShowError] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowError(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Slide direction="top" in={showError} style={{ zIndex: 1000 }}>
        <Box
          p={4}
          m={4}
          bg="red.500"
          color="white"
          borderRadius="md"
          boxShadow="lg"
        >
          <Text>{error}</Text>
        </Box>
      </Slide>
    </>
  );
}
