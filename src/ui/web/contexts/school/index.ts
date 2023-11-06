import School from "@models/School";
import Pagination from "@models/pagination";
import { createContext } from "use-context-selector";

interface Props {
	fetch(): Promise<void>;
	schools?: Pagination<School>;
	create(school: School): Promise<boolean>;
	erase(schoolID: string): Promise<boolean>;
	update(school: School): Promise<boolean>;
}

export const SchoolCTX = createContext({} as Props);
