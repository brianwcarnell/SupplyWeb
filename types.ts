
export type AppPage = 'COP' | 'Fleet' | 'Personnel' | 'Intel' | 'Health' | 'SupplyRisk' | 'Transactions' | 'MissionPlanning' | 'Messaging';

export interface LogisticsStatus {
  id: string;
  label: string;
  value: number;
  trend: number[];
  color: string;
}

export interface MapNode {
  id: string;
  name: string;
  grid: string;
  sector: number;
  status: 'active' | 'warning' | 'critical';
  inbound: string;
  sortieRate: string;
  type: string;
  coords: { x: string; y: string };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Asset {
  id: string;
  name: string;
  type: 'Carrier' | 'Destroyer' | 'Submarine' | 'Squadron';
  status: 'Operational' | 'Refit' | 'Deployed';
  location: string;
}

export interface SupplyRoute {
  id: string;
  origin: string;
  destination: string;
  integrity: number;
  status: 'Clear' | 'Choke Point' | 'Contested';
  cargo: string;
}

export interface LogisticsTransaction {
  id: string;
  timestamp: string;
  item: string;
  quantity: string;
  origin: string;
  destination: string;
  status: 'Pending' | 'In-Transit' | 'Delivered' | 'Delayed';
  mode: 'Air' | 'Sea' | 'Land';
}

export interface MissionPhase {
  id: string;
  label: string;
  duration: string;
  status: 'Complete' | 'Active' | 'Planned';
}

export interface SecureMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  classification: 'TOP SECRET' | 'SECRET' | 'UNCLASSIFIED';
  isMe: boolean;
}

export interface Contact {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'offline' | 'busy';
  lastSeen: string;
}
