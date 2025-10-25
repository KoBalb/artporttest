interface Vagon {
    VagonNumber : number
    VagonType : string
    CargoName : string
    OwnerName : string
    DepartureStationName : string
    ImageUrl?: string;
}

type SortType = 'number' | 'station';
