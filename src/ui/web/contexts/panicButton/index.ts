import Alert from "@models/Alert";
import { createContext } from "use-context-selector";

interface Props {
	press(): Promise<Alert | void>;
	getByID(id: string): Promise<Alert | void>;
	update(dto: Alert): Promise<Alert | void>;
}

export const PanicButtonCTX = createContext({} as Props);
