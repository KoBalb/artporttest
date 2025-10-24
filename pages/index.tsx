'use client'
import Card from "@/components/VagonsCard/Card";
import { useVagons } from "@/hooks/vagonHooks";
import { h1 } from "framer-motion/client";

export default function Home() {
  const {data, isLoading} = useVagons();
  if  (isLoading){
    return <h1>Loading</h1>
  }
  return (
    <>
      {
        data.map(vagon => <Card
        key={vagon.VagonNumber}
        {...vagon}
        />)
      }
    </>
  );
}
