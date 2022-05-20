interface Gateway {
  id?: string;
  name: string;
  ip: string;
  peripherals?: Peripheral[];
}

interface Peripheral {
  id?: string;
  uid: number;
  vendor: string;
  dateCreated: Date;
  status: "online" | "offline";
  gateway?: Gateway;
  gatewayId?: string;
}
