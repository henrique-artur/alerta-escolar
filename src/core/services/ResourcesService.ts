import ResourcesAdapter from "@interfaces/adapters/ResourcesAdapter";
import ResourcesUseCase from "@interfaces/usecases/ResourcesUseCase";
import { AccountRole } from "@models/auth";
import Pagination from "@models/pagination";

class ResourcesService implements ResourcesUseCase {
	constructor(protected readonly adapter: ResourcesAdapter) {}
	async fetchRoles(): Promise<Pagination<AccountRole>> {
		return await this.adapter.fetchRoles();
	}
}

export default ResourcesService;
