'use client'
import { Query, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getServerSideProps } from "../api/vagonApi";


export const useVagons = () =>
  useQuery<Vagon[], Error>({
      queryKey: ["vagons"],
      queryFn: () => getServerSideProps(),
  });
