import { AccountRole } from "@models/auth";
import Pagination from "@models/pagination";

abstract class ResourcesAdapter {
	abstract fetchRoles(): Promise<Pagination<AccountRole>>;
}

export default ResourcesAdapter;
