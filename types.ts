interface Vagon {
    VagonNumber : number
    VagonType : string
    CargoName : string
    OwnerName : string
    DepartureStationName : string
}

type SortType = 'number' | 'station';

interface WagonPhoto {
  VagonNumber: number;
  fileUrl: string;
}
