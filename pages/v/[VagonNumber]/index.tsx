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

  const allWagons: IVagon[] | undefined = useQueryClient().getQueryData(['vagons']);
  const wagon = allWagons?.find((w) => Number(w.VagonNumber) === VagonNumberId);

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

  if (!wagon) return <Text p={8}>Вагон не найден</Text>;

  return (
    <Box p={8} maxW="800px" mx="auto" bg="gray.50" borderRadius="xl" boxShadow="md">
      <Stack spacing={4}>
        <Stack direction="row" justify="space-between" align="center">
          <Text fontSize="3xl" fontWeight="bold">
            Вагон №{wagon.VagonNumber}
          </Text>
          <Badge colorScheme={wagon.IsPrivate ? 'teal' : 'gray'}>
            {wagon.VagonType}
          </Badge>
        </Stack>

        {localImage ? (
          <Image src={localImage} alt={`Фото вагона ${wagon.VagonNumber}`} borderRadius="lg" />
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

        <Text><strong>Тип:</strong> {wagon.VagonType}</Text>
        <Text><strong>Операция:</strong> {wagon.OperationKind}</Text>
        <Text><strong>Груз:</strong> {wagon.CargoName}</Text>
        <Text><strong>Владелец:</strong> {wagon.OwnerName}</Text>
        <Text><strong>Отправитель:</strong> {wagon.ShipperName}</Text>
        <Text><strong>Получатель:</strong> {wagon.ReceiverName}</Text>
        <Text><strong>Станция отправления:</strong> {wagon.DepartureStationName}</Text>
        <Text><strong>Страна назначения:</strong> {wagon.DestinationCountryName}</Text>

        <Divider />

        <Text><strong>Вес брутто:</strong> {wagon.WeightBrutto} кг</Text>
        <Text><strong>Вес нетто:</strong> {wagon.WeightNet} кг</Text>
        <Text><strong>Тара:</strong> {wagon.WeghtTare} кг</Text>
        <Text><strong>Грузовые пломбы:</strong> {wagon.CargoStamps}</Text>

        <Divider />

        <Text><strong>ЖД собственность:</strong> {wagon.RailwayOwn}</Text>
        <Text><strong>ЖД накладная:</strong> {wagon.RailbillNumber}</Text>
        <Text><strong>Вместимость:</strong> {wagon.Capacity} т</Text>

        <Divider />

        <Button mt={4} colorScheme="blue" onClick={() => router.push('/')} alignSelf="flex-start">
          ← Назад к списку
        </Button>
      </Stack>
    </Box>
  );
}