import PanicButtonAdapter from "@interfaces/adapters/PanicButtonAdapter";
import BaseAPI from "..";
import Alert from "@models/Alert";
import { DTO } from "@typing/http";
import Pagination from "@models/pagination";

class PanicButtonAPI extends BaseAPI implements PanicButtonAdapter {
	async press(): Promise<Alert> {
		const response = await this.client.post("/button/create/");
		return Alert.fromJSON(response.data);
	}

	async getByID(id: string): Promise<Alert> {
		const response = await this.client.get(`/button/get/${id}`);
		return Alert.fromJSON(response.data);
	}

	async update(dto: Alert): Promise<Alert> {
		const response = await this.client.patch<DTO>(
			`/button/update/${dto.id}`,
			dto.toJSON()
		);
		return Alert.fromJSON(response.data);
	}

	async fetch(
		queryParams?: Record<string, unknown>
	): Promise<Pagination<Alert>> {
		const response = await this.client.get("/button/get/list/all", {
			params: { ...queryParams },
		});
		return Pagination.fromJSON(response.data, Alert.fromJSON);
	}
}

export default PanicButtonAPI;
