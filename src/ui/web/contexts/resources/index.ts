import { AccountRole } from "@models/auth";
import Pagination from "@models/pagination";
import { createContext } from "use-context-selector";

interface Props {
	fetch(): Promise<void>;
	roles?: Pagination<AccountRole>;
}

export const ResourcesCTX = createContext({} as Props);
