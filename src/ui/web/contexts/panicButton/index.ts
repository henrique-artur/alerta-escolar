import Alert from "@models/Alert";
import Pagination from "@models/pagination";
import { createContext } from "use-context-selector";

interface Props {
	press(): Promise<Alert | void>;
	createRoom(id: string): void;
	getByID(id: string): Promise<Alert | void>;
	update(dto: Alert): Promise<Alert | void>;
	fetch(queryParams?: Record<string, unknown>): Promise<void>;
	alerts?: Pagination<Alert>;
	lastAlert?: Alert;
	joinRoomAlert(id: string): void;
	updateStatusAlert(value: Alert, status: string): void;
	newStatusAlert?: string;
	updateResponsibleAlert(dto: Alert): Promise<Alert | void>;
	concludedAlert(dto: Alert): Promise<Alert | void>;
	chooseSchool(value: string): void;
}

export const PanicButtonCTX = createContext({} as Props);
