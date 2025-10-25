'use client'

import PhotoCard from "@/components/VagonPhotosCard/Card";
import { SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";


export default function Photos() {
    const [wagons, setWagons] = useState<WagonPhoto[]>([]);
    const [sortType, setSortType] = useState<SortType>('number');



    useEffect(() => {
        const stored: WagonPhoto[] = JSON.parse(localStorage.getItem("wagons") || "[]");
        setWagons(stored);
    }, []);
    console.log(wagons)

    const handleDelete = (vagonNumber: number) => {
    const newWagons = wagons.filter(w => w.VagonNumber !== vagonNumber);
    setWagons(newWagons);
    localStorage.setItem("wagons", JSON.stringify(newWagons));
    };


  return (

    
      <SimpleGrid columns={5} spacing="4">
        {wagons.map((wagon) => (
            <PhotoCard key={wagon.VagonNumber} {...wagon} onDelete={handleDelete}  />
        ))}
      </SimpleGrid>

  );
}
