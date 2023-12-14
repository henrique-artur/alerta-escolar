import CopAdapter from "@interfaces/adapters/CopAdapter";
import CopUseCase from "@interfaces/usecases/CopUseCase";
import Cop from "@models/Cop";
import Pagination from "@models/pagination";

class CopService implements CopUseCase {
	constructor(protected readonly adapter: CopAdapter) {}

	async fetch(): Promise<Pagination<Cop>> {
		return this.adapter.fetch();
	}

	async findByID(copID: string): Promise<Cop> {
		return await this.adapter.findByID(copID);
	}

	async create(cop: Cop): Promise<boolean> {
		return await this.adapter.create(cop);
	}

	async delete(copID: string): Promise<boolean> {
		return await this.adapter.delete(copID);
	}

	async update(cop: Cop): Promise<boolean> {
		return await this.adapter.update(cop);
	}
}

export default CopService;
