import { Badge, Box, Button, Divider, Stack, Text, Image} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getVagons } from '../../../api/vagonApi';


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { VagonNumber } = context.params!;
  const vagons = await getVagons() 
  const vagon = vagons.find(vagon => String(vagon.VagonNumber) === VagonNumber) || null;
  return { props: { vagon } };
};

export default function VagonPage({ vagon }: IVagonPageProps) {
  const router = useRouter();
  const [localImage, setLocalImage] = useState<string | null>(null);

  useEffect(() => {
    if (!vagon) return;
    const allVagonPhoto: IVagonPhoto[] = JSON.parse(localStorage.getItem('wagons') || '[]');
    const VagonPhoto = allVagonPhoto.find(w => w.VagonNumber === vagon.VagonNumber);
    if (VagonPhoto) setLocalImage(VagonPhoto.fileUrl);
  }, [vagon]);

  if (!vagon) return <Text p={8}>Вагон не найден</Text>;

  return (
    <Box p={8} maxW="800px" mx="auto" bg="gray.50" borderRadius="xl" boxShadow="md">
      <Stack spacing={4}>
        <Stack direction="row" justify="space-between" align="center">
          <Text fontSize="3xl" fontWeight="bold">Вагон №{vagon.VagonNumber}</Text>
          <Badge colorScheme={vagon.IsPrivate ? 'teal' : 'gray'}>{vagon.VagonType}</Badge>
        </Stack>

        {localImage ? (
          <Image src={localImage} alt={`Фото вагона ${vagon.VagonNumber}`} borderRadius="lg" />
        ) : (
          <Box bg="gray.100" borderRadius="lg" height="250px" display="flex" alignItems="center" justifyContent="center">
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
