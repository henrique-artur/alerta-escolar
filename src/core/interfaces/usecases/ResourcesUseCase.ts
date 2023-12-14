import Address from "@models/Address";
import Countie from "@models/Countie";
import TypeIncident from "@models/TypeIncident";
import { AccountRole } from "@models/auth";
import Pagination from "@models/pagination";

abstract class ResourcesUseCase {
	abstract fetchRoles(): Promise<Pagination<AccountRole>>;
	abstract getAddressByZipCode(zipCode: string): Promise<Address>;
	abstract fetchCounties(
		queryParams?: Record<string, unknown>
	): Promise<Pagination<Countie>>;
	abstract fetchTypeIncident(
		queryParams?: Record<string, unknown>
	): Promise<TypeIncident[]>;
}

export default ResourcesUseCase;
