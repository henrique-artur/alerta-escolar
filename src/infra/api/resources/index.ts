import ResourcesAdapter from "@interfaces/adapters/ResourcesAdapter";
import BaseAPI from "..";
import { AccountRole } from "@models/auth";
import Pagination from "@models/pagination";
import { DTO } from "@typing/http";
import Address from "@models/Address";
import Countie from "@models/Countie";
import TypeIncident from "@models/TypeIncident";

class ResourcesAPI extends BaseAPI implements ResourcesAdapter {
	async fetchRoles(): Promise<Pagination<AccountRole>> {
		const response = await this.client.get<DTO>("/role/get/list/all");
		return Pagination.fromJSON<AccountRole>(
			response.data,
			AccountRole.fromJSON
		);
	}

	async getAddressByZipCode(zipCode: string): Promise<Address> {
		const response = await this.client.get<DTO>(`/address/get/${zipCode}`);
		return Address.fromJSON(response.data);
	}

	async fetchCounties(
		queryParams: Record<string, unknown>
	): Promise<Countie[]> {
		const response = await this.client.get<DTO[]>("counties/get/list/all", {
			params: {
				all: true,
				...queryParams,
			},
		});
		return response.data.map(Countie.fromJSON);
		//return Pagination.fromJSON(response.data, Countie.fromJSON);
	}

	async fetchTypeIncident(
		queryParams?: Record<string, unknown>
	): Promise<TypeIncident[]> {
		const response = await this.client.get<DTO[]>(
			"type_incident/get/list/all",
			{ params: { all: true, ...queryParams } }
		);
		return response.data.map(TypeIncident.fromJSON);
	}
}

export default ResourcesAPI;
