import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const response = await axios.get("https://rwl.artport.pro/commercialAgent/hs/CarrWorkApp/VagonInfo"); 
      res.status(200).json(response.data);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: "Не удалось получить данные" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Метод ${req.method} не разрешён`);
  }
}