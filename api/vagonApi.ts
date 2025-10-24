import axios from "axios";

export async function getServerSideProps(): Promise<Vagon[]> {
  const res = await axios.get("https://rwl.artport.pro/commercialAgent/hs/CarrWorkApp/VagonInfo");
  return res.data;
}