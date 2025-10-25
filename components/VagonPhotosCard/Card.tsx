import { Badge, Box, Button, Input, Stack, Text } from "@chakra-ui/react";

export default function PhotoCard({
  VagonNumber,
  fileUrl,
  onDelete
}: WagonPhoto & { onDelete: (vagonNumber: number) => void }) {
 
  const handleDelete = () => {
    onDelete(VagonNumber);
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      padding="4"
      boxShadow="md"
      bg="gray.50"
      maxW="300px"
    >
      <Stack spacing="2">
        <img src={fileUrl} alt={`Фото вагона ${VagonNumber}`} style={{ width: "100%" }} />
        <Text fontSize="xl" fontWeight="bold">
            Вагон №{VagonNumber}
        </Text>
        <Button colorScheme="red" size="sm" onClick={handleDelete}>
          Удалить
        </Button>
      </Stack>
    </Box>
  );
}