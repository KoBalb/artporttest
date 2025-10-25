import { Badge, Box, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function Card({
    VagonNumber,
    VagonType,
    CargoName,
    OwnerName,
    DepartureStationName,
    ImageUrl } : Vagon) {

    const [localImage, setLocalImage] = useState<string | null>(ImageUrl || null);
    const [fileName, setFileName] = useState<string>("");

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const newFileName = `${VagonNumber}_${file.name.split('.').pop()}`; // например "123_jpg"
        setFileName(newFileName);

        const reader = new FileReader();
        reader.onloadend = () => {
          setLocalImage(reader.result as string);
          console.log(`📸 Фото сохранено: ${newFileName}`);
        };
        reader.readAsDataURL(file);
      }
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
        {localImage ? (
          <img  src={localImage} alt="Фото вагона"/>
        ) : (
          <Text fontSize="sm" color="gray.400">Нет изображения</Text>
        )}
        <Input type="file" accept="image/*" onChange={handleImageUpload} size="sm" />
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