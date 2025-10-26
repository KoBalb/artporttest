import { GetServerSideProps } from "next";
import { useState } from "react";
import Card from "@/components/VagonsCard/Card";
import { Input, Button, VStack, HStack, SimpleGrid, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useDebounce } from "@/hooks/useDebounceHook";
import { getVagons } from "@/api/vagonApi";

export const getServerSideProps: GetServerSideProps = async () => {
  try {
  const vagons = await getVagons() 
    return { props: { vagons } };
  } catch{
    return { props: { vagons: [] } };
  }
};

export default function Home({ vagons }: HomePageProps) {
  const [sortType, setSortType] = useState<'number' | 'station'>('number');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm);
  const [visibleCount, setVisibleCount] = useState(1);

  const sortedVagons = [...vagons].sort((a, b) => {
    if (sortType === 'number') return a.VagonNumber - b.VagonNumber;
    return a.DepartureStationName.localeCompare(b.DepartureStationName);
  });

  const filteredVagons = sortedVagons.filter(wagon =>
    wagon.VagonNumber.toString().includes(debouncedSearch)
  );

  const visibleVagons = filteredVagons.slice(0, visibleCount * 5);

  if (!vagons.length) return <Text p={8}>Вагоны не найдены</Text>;

  return (
    <VStack spacing="4" align="stretch" p="4" w="100%">
      <HStack spacing="4" w="100%">
        <Link href="/photos">
          <Button colorScheme="teal" mr={2}>Перейти в галерею</Button>
        </Link>

        <Button onClick={() => setSortType('number')} colorScheme="blue" flex="1">Сортировать по номеру</Button>
        <Button onClick={() => setSortType('station')} colorScheme="green" flex="1">Сортировать по станции</Button>

        <Input
          type="search"
          placeholder="Поиск"
          onChange={e => setSearchTerm(e.target.value)}
          flex="2"
        />
      </HStack>

      <SimpleGrid columns={5} spacing="4">
        {visibleVagons.map(vagon => (
          <Card key={vagon.VagonNumber} {...vagon} />
        ))}
      </SimpleGrid>

      <HStack>
        <Flex w="100%" justify="center">
          {visibleVagons.length < filteredVagons.length && (
            <Button onClick={() => setVisibleCount(c => c + 1)}>Показать ещё</Button>
          )}
        </Flex>
      </HStack>
    </VStack>
  );
}
