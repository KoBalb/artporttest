'use client'
import { Box, Slide, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface ErrorBlockProps {
  error: string;
  onClose?: () => void;
}

export default function ErrorBlock({ error, onClose }: ErrorBlockProps) {
  const [showError, setShowError] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowError(false);
      onClose?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
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
  );
}