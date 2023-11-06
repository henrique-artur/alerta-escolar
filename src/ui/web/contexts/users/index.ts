import { Account } from "@models/auth";
import Pagination from "@models/pagination";
import { DTO } from "@typing/http";
import { createContext } from "use-context-selector";

interface Props {
	fetch(queryParams?: Record<string, unknown>): Promise<void>;
	users?: Pagination<Account>;
	create(user: DTO): Promise<boolean>;
	erase(userID: string): Promise<boolean>;
}

export const UsersCTX = createContext({} as Props);
