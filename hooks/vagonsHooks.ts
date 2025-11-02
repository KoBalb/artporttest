import { useQuery } from "@tanstack/react-query";
import axios from "axios";



export function useVagons() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["vagons"],
    queryFn: async () => {
       const res = await axios.get<{ Vagons: IVagon[] }>("http://localhost:3000/api/vagon"); 
        const data = res
        return data
    },
  });
  return { data, isLoading, error };
}