import { Badge, Box, Input, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import ErrorBlock from "../ui/ErrorBlock";

export default function Card({
VagonNumber,
VagonType,
CargoName,
OwnerName,
DepartureStationName,
}: IVagon) {
  const router = useRouter();

  const toVagonLink = () => {
    router.push(`/v/${VagonNumber}`);
  };

  
  const [error, setError] = useState<string | null>(null);
  const [localImage, setLocalImage] = useState<string | null>(() => {
    try {
      const allVagonPhoto: IVagonPhoto[] = JSON.parse(localStorage.getItem("wagons") || "[]");
      const VagonPhoto = allVagonPhoto.find(w => w.VagonNumber === VagonNumber);
      return VagonPhoto?.fileUrl || null;
    } catch (e) {
      setError("Ошибка чтения localStorage");
      return null;
    }
  });
  

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      const fileUrl = reader.result as string;
      setLocalImage(fileUrl);

      try {
        const allVagonPhoto: IVagonPhoto[] = JSON.parse(localStorage.getItem("wagons") || "[]");
        const index = allVagonPhoto.findIndex(w => w.VagonNumber === VagonNumber);

        if (index >= 0) {
          allVagonPhoto[index].fileUrl = fileUrl;
          allVagonPhoto[index].addedAt = Date.now();
        } else {
          allVagonPhoto.push({ VagonNumber, fileUrl, addedAt: Date.now() });
        }
        localStorage.setItem("wagons", JSON.stringify(allVagonPhoto));
    } catch (e) {
        setError("Общий вес загруженных файлов превышает 10 МБ, очистите фотографии");
      }
    };
  };

  return (
    <>
    {error && <ErrorBlock error={error} />}
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
            <img src={localImage} alt={`Фото вагона ${VagonNumber}`} style={{ width: "100%" }} />
          ) : (
            <Text fontSize="sm" color="gray.400">Нет изображения</Text>
          )}
          <Input type="file" accept="image/*" onChange={handleImageUpload} size="sm" />
          <Text fontSize="xl" fontWeight="bold" onClick={toVagonLink} cursor="pointer">
            Вагон №{VagonNumber}
          </Text>
          <Badge colorScheme="teal">{VagonType}</Badge>
          <Text>Груз: {CargoName}</Text>
          <Text>Владелец: {OwnerName}</Text>
          <Text>Станция отправления: {DepartureStationName}</Text>
        </Stack>
      </Box>
    </>
  );
  }