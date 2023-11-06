import { Account } from "@models/auth";
import Pagination from "@models/pagination";
import { DTO } from "@typing/http";

export default abstract class UsersAdapter {
	abstract fetch(
		queryParams?: Record<string, unknown>
	): Promise<Pagination<Account>>;
	abstract create(user: DTO): Promise<boolean>;
	abstract erase(userID: string): Promise<boolean>;
}
