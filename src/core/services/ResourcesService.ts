import ResourcesAdapter from "@interfaces/adapters/ResourcesAdapter";
import ResourcesUseCase from "@interfaces/usecases/ResourcesUseCase";
import Address from "@models/Address";
import Countie from "@models/Countie";
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
	): Promise<Pagination<Countie>> {
		return this.adapter.fetchCounties(queryParams);
	}
}

export default ResourcesService;
