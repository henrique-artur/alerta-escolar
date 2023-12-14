import Cop from "@models/Cop";
import Pagination from "@models/pagination";

abstract class CopUseCase {
	abstract fetch(
		queryParams?: Record<string, unknown>
	): Promise<Pagination<Cop>>;
	abstract findByID(copID: string): Promise<Cop>;
	abstract create(cop: Cop): Promise<boolean>;
	abstract delete(copID: string): Promise<boolean>;
	abstract update(cop: Cop): Promise<boolean>;
}

export default CopUseCase;
