import ResourcesAdapter from "@interfaces/adapters/ResourcesAdapter";
import BaseAPI from "..";
import { AccountRole } from "@models/auth";
import Pagination from "@models/pagination";
import { DTO } from "@typing/http";

class ResourcesAPI extends BaseAPI implements ResourcesAdapter {
	async fetchRoles(): Promise<Pagination<AccountRole>> {
		const response = await this.client.get<DTO>("/role/get/list/all");
		return Pagination.fromJSON<AccountRole>(
			response.data,
			AccountRole.fromJSON
		);
	}
}

export default ResourcesAPI;
