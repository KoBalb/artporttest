'use client'

import PhotoCard from "@/components/VagonPhotosCard/Card";
import { Box, Button, Link, Select, SimpleGrid, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";


export default function Photos() {
    const [vagons, setWagons] = useState<IVagonPhoto[]>([]);
    const [sortBy, setSortBy] = useState<"number" | "date">("date");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    useEffect(() => {
      const allVagonPhoto: IVagonPhoto[] = JSON.parse(localStorage.getItem("wagons") || "[]");
      setWagons(allVagonPhoto);
    }, []);

    const handleDelete = (vagonNumber: number) => {
      const newVagons = vagons.filter(w => w.VagonNumber !== vagonNumber); // удаление происходит именно так что бы массив vagons не мутировал
      setWagons(newVagons);
      localStorage.setItem("wagons", JSON.stringify(newVagons));
    };

    const sortedPhotos = [...vagons].sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "desc"
            ? b.addedAt - a.addedAt
            : a.addedAt - b.addedAt;
      } else {
        return sortOrder === "desc"
            ? b.VagonNumber - a.VagonNumber
            : a.VagonNumber - b.VagonNumber;
      }
    }
  );

  return (
  <Box p={4}>
    <Stack direction="row" spacing={4} mb={4} align="center">
      <Link href="/" >
        <Button colorScheme="gray">
        Вернуться на главную
        </Button>
      </Link>
      <Select
        w="200px"
        value={sortBy}
        onChange={e => setSortBy(e.target.value as "number" | "date")}
        >
        <option value="date">Сортировка по дате добавления</option>
        <option value="number">Сортировка по номеру вагона</option>
      </Select>

      <Select
        w="150px"
        value={sortOrder}
        onChange={e => setSortOrder(e.target.value as "asc" | "desc")}
        >
        {sortBy === "date" ? (
          <>
            <option value="desc">Сначала новые</option>
            <option value="asc">Сначала старые</option>
          </>
        ) : (
          <>
            <option value="desc">По убыванию</option>
            <option value="asc">По возрастанию</option>
          </>
        )}
      </Select>
    </Stack>

    <SimpleGrid columns={5} spacing="4">
      {sortedPhotos.map((vagon) => (
        <PhotoCard key={vagon.VagonNumber} {...vagon} onDelete={handleDelete}/>))}
    </SimpleGrid>
  </Box>
  );
}
