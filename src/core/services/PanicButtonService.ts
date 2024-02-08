import PanicButtonAdapter from "@interfaces/adapters/PanicButtonAdapter";
import PanicButtonUseCase from "@interfaces/usecases/PanicButtonUseCase";
import Alert from "@models/Alert";
import School from "@models/School";
import Pagination from "@models/pagination";

class PanicButtonService implements PanicButtonUseCase {
	constructor(protected readonly adapter: PanicButtonAdapter) {}

	async press(schoolID: string): Promise<Alert> {
		return await this.adapter.press(schoolID);
	}

	async getByID(id: string): Promise<Alert> {
		return await this.adapter.getByID(id);
	}

	async update(dto: Alert): Promise<Alert> {
		return await this.adapter.update(dto);
	}

	async fetch(
		queryParams?: Record<string, unknown>
	): Promise<Pagination<Alert>> {
		return await this.adapter.fetch(queryParams);
	}
}

export default PanicButtonService;
