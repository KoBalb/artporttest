'use client'
import Card from "@/components/VagonsCard/Card";
import { useVagons } from "@/hooks/vagonHooks";
import { Button, HStack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [wagons, setWagons] = useState<Vagon[]>([]);

  const {data, isLoading} = useVagons();
  
  useEffect(() => {
  if (!isLoading) {
    setWagons(data);
  }
  }, [data]);

  const sortByNumber = () => {
    const sorted = [...wagons].sort((a, b) => a.VagonNumber - b.VagonNumber);
    setWagons(sorted);
  };

  const sortByStation = () => {
    const sorted = [...wagons].sort((a, b) => a.DepartureStationName.localeCompare(b.DepartureStationName)
  )
    setWagons(sorted);
  };


  
  return (
    <>
    <VStack spacing="4" align="start" padding="4">
      <HStack spacing="4">
        <Button onClick={sortByNumber} colorScheme="blue">Сортировать по номеру</Button>
        <Button onClick={sortByStation} colorScheme="green">Сортировать по станции</Button>
      </HStack>
      {
        wagons.map(vagon => <Card
        key={vagon.VagonNumber}
        {...vagon}
        />)
      }
    </VStack>
    </>
  );
}
