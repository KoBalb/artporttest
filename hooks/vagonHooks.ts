'use client'
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getServerSideProps } from "../api/vagonApi";


  export const useVagons = () =>
    useQuery<Vagon[], Error>({
        queryKey: ["vagons"],
        queryFn: () => getServerSideProps(),
    });


    export const UseVagonsQuerry = () => 
      useInfiniteQuery({
        queryKey: ['vagons'],
        queryFn: getServerSideProps(),
        getNextPageParam: (lastPage, pages) => lastPage.nextCursor})


