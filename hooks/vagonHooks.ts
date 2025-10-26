'use client'
import {useQuery } from "@tanstack/react-query";
import { getServerSideProps } from "../api/vagonApi";


export const useVagons = () =>
  useQuery<IVagon[], Error>({
      queryKey: ["vagons"],
      queryFn: () => getServerSideProps(),
  });
