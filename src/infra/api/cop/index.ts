import CopAdapter from "@interfaces/adapters/CopAdapter";
import BaseAPI from "..";
import Cop from "@models/Cop";
import Pagination from "@models/pagination";

class CopAPI extends BaseAPI implements CopAdapter {
	async fetch(
		queryParams?: Record<string, unknown>
	): Promise<Pagination<Cop>> {
		const response = await this.client.get("cop/get/list/all", {
			params: {
				is_deleted: false,
				...queryParams,
			},
		});
		return Pagination.fromJSON<Cop>(response.data, Cop.fromJSON);
	}

	async findByID(copID: string): Promise<Cop> {
		const result = await this.client.get(`/cop/get/${copID}`);
		return Cop.fromJSON(result.data);
	}

	async create(cop: Cop): Promise<boolean> {
		await this.client.post("/cop/create/", cop.toJSON());
		return true;
	}

	async delete(copID: string): Promise<boolean> {
		await this.client.delete(`/cop/delete/${copID}`);
		return true;
	}

	async update(cop: Cop): Promise<boolean> {
		await this.client.patch(`/cop/update/${cop.id}`, cop.toJSON());
		return true;
	}
}

export default CopAPI;
