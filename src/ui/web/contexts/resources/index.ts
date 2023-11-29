import Address from "@models/Address";
import Countie from "@models/Countie";
import { AccountRole } from "@models/auth";
import Pagination from "@models/pagination";
import { createContext } from "use-context-selector";

interface Props {
	fetch(): Promise<void>;
	roles?: Pagination<AccountRole>;
	getAddressByZipCode(zipCode: string): Promise<Address | undefined>;
	fetchCounties(queryParams?: Record<string, unknown>): Promise<void>;
	counties?: Pagination<Countie>;
}

export const ResourcesCTX = createContext({} as Props);
