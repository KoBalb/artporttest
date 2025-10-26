import axios from "axios";

const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;


export async function getVagons(): Promise<IVagon[]> {
  const res = await axios.get(apiUrl);
  return res.data.Vagons;
}