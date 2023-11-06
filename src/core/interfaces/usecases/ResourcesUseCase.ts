import { AccountRole } from "@models/auth";
import Pagination from "@models/pagination";

abstract class ResourcesUseCase {
	abstract fetchRoles(): Promise<Pagination<AccountRole>>;
}

export default ResourcesUseCase;
