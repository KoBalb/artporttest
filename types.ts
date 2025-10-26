interface IVagon {
  Date: string; 
  VagonNumber: number;
  VagonType: string;
  VagonIsCovered: boolean;
  WeightBrutto: number;
  WeightNet: number;
  WeghtTare: number;
  ProcessingKind: string;
  OperationKind: string;
  CargoName: string;
  ClientName: string;
  OwnerName: string;
  IsPrivate: boolean;
  ShipperName: string;
  ReceiverName: string;
  RailwayOwn: string;
  NumberOfPlaces: number;
  ShipperOrder: string;
  RailbillNumber: string;
  Capacity: number;
  DepartureStationName: string;
  CargoStamps: string;
  Characteristic: string;
  DestinationCountryName: string;
  OperatorName: string;
  Status: number;
  RecordNumber: number;
}


type SortType = 'number' | 'station';

interface IVagonPhoto {
  VagonNumber: number;
  fileUrl: string;
  addedAt: number;
}

interface IErrorBlockProps {
  error: string;
  onClose?: () => void;
}


interface IVagonPageProps {
  vagon: IVagon | null;
}
