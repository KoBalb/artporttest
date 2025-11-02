import { Badge, Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function PhotoCard({
  VagonNumber,
  fileUrl,
  onDelete
}: IVagonPhoto & { onDelete: (vagonNumber: number) => void }) {
 
  const handleDelete = () => {
    onDelete(VagonNumber);
  };

  const router = useRouter();
  
  const toVagonLink = () => {
    router.push(`/v/${VagonNumber}`);
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
        <Image src={fileUrl} 
        alt={`Фото вагона ${VagonNumber}`}
        width={300}   
        height={200} />
        <Text fontSize="xl" fontWeight="bold" onClick={toVagonLink} cursor="pointer" >
            Вагон №{VagonNumber}
        </Text>
        <Button colorScheme="red" size="sm" onClick={handleDelete}>
          Удалить
        </Button>
      </Stack>
    </Box>
  );
}