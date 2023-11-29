import SchoolAdapter from "@interfaces/adapters/SchoolAdapter";
import Pagination from "@models/pagination";
import School from "@models/School";
import BaseAPI from "..";

class SchoolAPI extends BaseAPI implements SchoolAdapter {
	async fetch(): Promise<Pagination<School>> {
		const response = await this.client.get("/school/get/list/all");
		return Pagination.fromJSON<School>(response.data, School.fromJSON);
	}

	async create(school: School): Promise<boolean> {
		await this.client.post("/school/create/", school.toJSON());
		return true;
	}

	async erase(schoolID: string): Promise<boolean> {
		await this.client.delete(`/school/delete/${schoolID}`);
		return true;
	}

	async update(school: School): Promise<boolean> {
		await this.client.patch(`/school/update/${school.id}`, school.toJSON());
		return true;
	}

	async findByID(schoolID: string): Promise<School> {
		const response = await this.client.get(`/school/get/${schoolID}`);
		return School.fromJSON(response.data);
	}
}

export default SchoolAPI;
