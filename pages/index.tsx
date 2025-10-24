'use client'
import Card from "@/components/VagonsCard/Card";
import { useDebounce } from "@/hooks/useDebounceHook";
import { useVagons } from "@/hooks/vagonHooks";
import { Button, Flex, HStack, Input, SimpleGrid, VStack } from "@chakra-ui/react";
import { useState } from "react";

export default function Home() {
  const { data: wagons, isLoading } = useVagons();


  const [sortType, setSortType] = useState<SortType>('number');
  const [seacrhTerm, setSeacrhTerm] = useState('')
  const debouncedSearch = useDebounce(seacrhTerm)


  const [visibleCount, setVisibleCount] = useState(1);

  


  if (isLoading) return <h1>Loading...</h1>;
  if (!wagons) return <h1>No data</h1>;
  

  const sortedWagons = [...wagons].sort((a, b) => {
    if (sortType === 'number') {
      return a.VagonNumber - b.VagonNumber;
    } else {
      return a.DepartureStationName.localeCompare(b.DepartureStationName);
    }
  });

  const filteredWagons = sortedWagons.filter(wagon =>
  wagon.VagonNumber.toString().includes(debouncedSearch)
  );

  const visibleWagons = filteredWagons.slice(0, visibleCount * 5);

  return (<>
    <VStack spacing="4" align="stretch" padding="4" w="100%">
      <HStack spacing="4" w="100%">
        <Button onClick={() => setSortType('number')} colorScheme="blue" flex="1">
          Сортировать по номеру
        </Button>
        <Button onClick={() => setSortType('station')} colorScheme="green" flex="1">
          Сортировать по станции
        </Button>
        <Input
          type="search"
          placeholder="Поиск"
          onChange={e => setSeacrhTerm(e.target.value)}
          flex="2"
        />
        
      </HStack>

      <SimpleGrid columns={5} spacing="4">
          {visibleWagons.map(vagon => (
            <Card key={vagon.VagonNumber} {...vagon} />
          ))}
      </SimpleGrid>


<HStack>
  <Flex w="100%" justify="center">
    <Button onClick={() => setVisibleCount(c => c + 1)}>
      Показать ещё
    </Button>
  </Flex>

  </HStack>
    </VStack>


    
  </>);
}