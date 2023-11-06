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
		return await this.create(school);
	}

	async erase(schoolID: string): Promise<boolean> {
		return await this.erase(schoolID);
	}

	async update(school: School): Promise<boolean> {
		return await this.update(school);
	}
}

export default SchoolService;
