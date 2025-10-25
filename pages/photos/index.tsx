'use client'

import PhotoCard from "@/components/VagonPhotosCard/Card";
import { Box, Button, Link, Select, SimpleGrid, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";


export default function Photos() {
    const [wagons, setWagons] = useState<WagonPhoto[]>([]);
    const [sortBy, setSortBy] = useState<"number" | "date">("date");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    useEffect(() => {
        const stored: WagonPhoto[] = JSON.parse(localStorage.getItem("wagons") || "[]");
        setWagons(stored);
    }, []);

    const handleDelete = (vagonNumber: number) => {
    const newWagons = wagons.filter(w => w.VagonNumber !== vagonNumber);
    setWagons(newWagons);
    localStorage.setItem("wagons", JSON.stringify(newWagons));
    };

    const sortedPhotos = [...wagons].sort((a, b) => {
        if (sortBy === "date") {
        return sortOrder === "desc"
            ? (b.addedAt || 0) - (a.addedAt || 0)
            : (a.addedAt || 0) - (b.addedAt || 0);
        } else {
        return sortOrder === "desc"
            ? b.VagonNumber - a.VagonNumber
            : a.VagonNumber - b.VagonNumber;
        }
    });


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
            <option value="desc">По убыванию</option>
            <option value="asc">По возрастанию</option>
            </Select>
        </Stack>
    
      <SimpleGrid columns={5} spacing="4">
        {sortedPhotos.map((wagon) => (
            <PhotoCard key={wagon.VagonNumber} {...wagon} onDelete={handleDelete}  />
        ))}
      </SimpleGrid>
    </Box>
  );
}
