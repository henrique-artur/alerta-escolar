import ResourcesAdapter from "@interfaces/adapters/ResourcesAdapter";
import ResourcesUseCase from "@interfaces/usecases/ResourcesUseCase";
import Address from "@models/Address";
import Countie from "@models/Countie";
import TypeIncident from "@models/TypeIncident";
import { AccountRole } from "@models/auth";
import Pagination from "@models/pagination";

class ResourcesService implements ResourcesUseCase {
	constructor(protected readonly adapter: ResourcesAdapter) {}
	async fetchRoles(): Promise<Pagination<AccountRole>> {
		return await this.adapter.fetchRoles();
	}

	async getAddressByZipCode(zipCode: string): Promise<Address> {
		return this.adapter.getAddressByZipCode(zipCode);
	}

	async fetchCounties(
		queryParams?: Record<string, unknown>
	): Promise<Countie[]> {
		return this.adapter.fetchCounties(queryParams);
	}

	async fetchTypeIncident(
		queryParams?: Record<string, unknown>
	): Promise<TypeIncident[]> {
		return this.adapter.fetchTypeIncident(queryParams);
	}
}

export default ResourcesService;
