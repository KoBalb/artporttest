'use client';
import { Badge, Box, Button, Divider, Stack, Text, Image, Spinner, Flex } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function VagonPage() {
  const router = useRouter();
  const [localImage, setLocalImage] = useState<string | null>(null);

  const { VagonNumber } = router.query;
  const VagonNumberId = Number(VagonNumber);

  const allWagons = useQueryClient().getQueryData<VagonsResponse>(['vagons']);

  if (!allWagons) {
    return (
    <Flex
      w="100vw"
      h="100vh"
      justify="center"
      align="center"
      bg="gray.50"
      flexDirection="column"
      textAlign="center"
      p={4}
    >
      <Text fontSize="2xl" mb={4}>
        Вагон не найден
      </Text>
      <Button colorScheme="blue" onClick={() => router.push('/')}>
        Перейти на главную
      </Button>
    </Flex>
  );
  }

  const vagon = allWagons.data.Vagons?.find((w) => Number(w.VagonNumber) === VagonNumberId);

  useEffect(() => {
    const allVagonPhoto: IVagonPhoto[] = JSON.parse(localStorage.getItem('wagons') || '[]');
    const VagonPhoto = allVagonPhoto.find((w) => Number(w.VagonNumber) === VagonNumberId);
    if (VagonPhoto) setLocalImage(VagonPhoto.fileUrl);
  }, [VagonNumberId]);


  if (!router.isReady)
    return (
      <Flex
        w="100vw"       
        h="100vh"    
        justify="center" 
        align="center"   
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );

  if (!vagon) return <Text p={8}>Вагон не найден</Text>;

  return (
    <Box p={8} maxW="800px" mx="auto" bg="gray.50" borderRadius="xl" boxShadow="md">
      <Stack spacing={4}>
        <Stack direction="row" justify="space-between" align="center">
          <Text fontSize="3xl" fontWeight="bold">
            Вагон №{vagon.VagonNumber}
          </Text>
          <Badge colorScheme={vagon.IsPrivate ? 'teal' : 'gray'}>
            {vagon.VagonType}
          </Badge>
        </Stack>

        {localImage ? (
          <Image src={localImage} alt={`Фото вагона ${vagon.VagonNumber}`} borderRadius="lg" />
        ) : (
          <Box
            bg="gray.100"
            borderRadius="lg"
            height="250px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="gray.500">Нет фото</Text>
          </Box>
        )}

        <Divider />

        <Text><strong>Тип:</strong> {vagon.VagonType}</Text>
        <Text><strong>Операция:</strong> {vagon.OperationKind}</Text>
        <Text><strong>Груз:</strong> {vagon.CargoName}</Text>
        <Text><strong>Владелец:</strong> {vagon.OwnerName}</Text>
        <Text><strong>Отправитель:</strong> {vagon.ShipperName}</Text>
        <Text><strong>Получатель:</strong> {vagon.ReceiverName}</Text>
        <Text><strong>Станция отправления:</strong> {vagon.DepartureStationName}</Text>
        <Text><strong>Страна назначения:</strong> {vagon.DestinationCountryName}</Text>

        <Divider />

        <Text><strong>Вес брутто:</strong> {vagon.WeightBrutto} кг</Text>
        <Text><strong>Вес нетто:</strong> {vagon.WeightNet} кг</Text>
        <Text><strong>Тара:</strong> {vagon.WeghtTare} кг</Text>
        <Text><strong>Грузовые пломбы:</strong> {vagon.CargoStamps}</Text>

        <Divider />

        <Text><strong>ЖД собственность:</strong> {vagon.RailwayOwn}</Text>
        <Text><strong>ЖД накладная:</strong> {vagon.RailbillNumber}</Text>
        <Text><strong>Вместимость:</strong> {vagon.Capacity} т</Text>

        <Divider />

        <Button mt={4} colorScheme="blue" onClick={() => router.push('/')} alignSelf="flex-start">
          ← Назад к списку
        </Button>
      </Stack>
    </Box>
  );
}