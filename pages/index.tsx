'use client'
import Card from "@/components/VagonsCard/Card";
import { useDebounce } from "@/hooks/useDebounceHook";
import { useVagons } from "@/hooks/vagonHooks";
import { Button, HStack, Input, VStack } from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {
  const { data: wagons, isLoading } = useVagons();

  const [sortType, setSortType] = useState<SortType>('number');
  const [seacrhTerm, setSeacrhTerm] = useState('')
  const debouncedSearch = useDebounce(seacrhTerm)

  if (isLoading) return <h1>Loading...</h1>;
  if (!wagons) return <h1>No data</h1>;


  const sortedWagons = [...wagons].sort((a, b) => {
    if (sortType === 'number') {
      return a.VagonNumber - b.VagonNumber;
    } else {
      return a.DepartureStationName.localeCompare(b.DepartureStationName);
    }
  });


  return (
    <VStack spacing="4" align="start" padding="4">
      <HStack spacing="4">
        <Button onClick={() => setSortType('number')} colorScheme="blue">
          Сортировать по номеру
        </Button>
        <Button onClick={() => setSortType('station')} colorScheme="green">
          Сортировать по станции
        </Button>
        <Input type="search"
        placeholder="Поиск"
        onChange={e => {setSeacrhTerm(e.target.value)}}
        ></Input>
      </HStack>

      {sortedWagons.filter(wagon => wagon.VagonNumber.toString().includes(debouncedSearch)).map(vagon => (
        <Card key={vagon.VagonNumber} {...vagon} />
      ))}
    </VStack>
  );
}