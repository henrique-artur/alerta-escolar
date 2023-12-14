import Cop from "@models/Cop";
import Pagination from "@models/pagination";
import { createContext } from "use-context-selector";

interface Props {
	fetch(queryParams?: Record<string, unknown>): Promise<void>;
	cops?: Pagination<Cop>;
	findByID(copID: string): Promise<Cop | undefined>;
	create(cop: Cop): Promise<boolean>;
	delete(copID: string): Promise<boolean>;
	update(cop: Cop): Promise<boolean>;
}

export const CopCTX = createContext({} as Props);
