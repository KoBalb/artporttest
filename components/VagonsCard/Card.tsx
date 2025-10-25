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
}: Vagon) {

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [localImage, setLocalImage] = useState<string | null>(() => {
    try {
      const stored: WagonPhoto[] = JSON.parse(localStorage.getItem("wagons") || "[]");
      const found = stored.find(w => w.VagonNumber === VagonNumber);
      return found?.fileUrl || null;
    } catch (e: any) {
      setError("Ошибка чтения localStorage");
      return null;
    }
  });

  const handleClick = () => {
    router.push(`/v/${VagonNumber}`);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const fileUrl = reader.result as string;
      setLocalImage(fileUrl);

      try {
        const stored: WagonPhoto[] = JSON.parse(localStorage.getItem("wagons") || "[]");
        const index = stored.findIndex(w => w.VagonNumber === VagonNumber);

        if (index >= 0) {
          stored[index].fileUrl = fileUrl;
          stored[index].addedAt = Date.now();
        } else {
          stored.push({ VagonNumber, fileUrl, addedAt: Date.now() });
        }

        localStorage.setItem("wagons", JSON.stringify(stored));
      } catch (e: any) {
        setError("Общий вес загруженных файлов превышает 10 мб, очистите фотографии");
      }
    reader.readAsDataURL(file);
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
          <Text fontSize="xl" fontWeight="bold" onClick={handleClick} cursor={"pointer"}>
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