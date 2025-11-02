import { useQuery } from "@tanstack/react-query";
import axios from "axios";



export function useVagons() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["vagons"],
    queryFn: async () => await axios.get("http://localhost:3000/api/vagon"),
    select: response => response.data.Vagons, 
  });
  return { data, isLoading, error };
}