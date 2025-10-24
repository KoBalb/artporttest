import { useVagons } from "@/hooks/vagonHooks";
import { Badge, Box, Stack, Text } from "@chakra-ui/react";

export default function Card({
    VagonNumber,
    VagonType,
    CargoName,
    OwnerName,
    DepartureStationName} : Vagon) {




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
            <Text fontSize="xl" fontWeight="bold">
            Вагон №{VagonNumber}
            </Text>
            <Badge colorScheme="teal">{VagonType}</Badge>
            <Text>Груз: {CargoName}</Text>
            <Text>Владелец: {OwnerName}</Text>
            <Text>Станция отправления: {DepartureStationName}</Text>
      </Stack>
    </Box>
  );
}