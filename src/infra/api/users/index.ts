import UsersAdapter from "@interfaces/adapters/UsersAdapter";
import BaseAPI from "..";
import { Account } from "@models/auth";
import Pagination from "@models/pagination";
import { DTO } from "@typing/http";

class UsersAPI extends BaseAPI implements UsersAdapter {
	async fetch(
		queryParams?: Record<string, unknown>
	): Promise<Pagination<Account>> {
		const response = await this.client.get<DTO>("/users/get/list/all", {
			params: {
				is_deleted: false,
				...queryParams,
			},
		});
		return Pagination.fromJSON<Account>(response.data, Account.fromJSON);
	}

	async create(user: DTO): Promise<boolean> {
		await this.client.post("/users/create/", user);
		return true;
	}

	async erase(userID: string): Promise<boolean> {
		await this.client.delete(`/users/delete/${userID}`);
		return true;
	}
}

export default UsersAPI;
