import SchoolAdapter from "@interfaces/adapters/SchoolAdapter";
import SchoolUseCase from "@interfaces/usecases/SchoolUseCase";
import Pagination from "@models/pagination";
import School from "@models/School";

class SchoolService implements SchoolUseCase {
	constructor(protected readonly adapter: SchoolAdapter) {}

	async fetch(): Promise<Pagination<School>> {
		return this.adapter.fetch();
	}

	async create(school: School): Promise<boolean> {
		return await this.adapter.create(school);
	}

	async erase(schoolID: string): Promise<boolean> {
		return await this.adapter.erase(schoolID);
	}

	async update(school: School): Promise<boolean> {
		return await this.adapter.update(school);
	}

	async findByID(schoolID: string): Promise<School> {
		return await this.adapter.findByID(schoolID);
	}
}

export default SchoolService;
