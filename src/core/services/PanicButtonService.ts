import PanicButtonAdapter from "@interfaces/adapters/PanicButtonAdapter";
import PanicButtonUseCase from "@interfaces/usecases/PanicButtonUseCase";
import Alert from "@models/Alert";

class PanicButtonService implements PanicButtonUseCase {
	constructor(protected readonly adapter: PanicButtonAdapter) {}

	async press(): Promise<Alert> {
		return await this.adapter.press();
	}

	async getByID(id: string): Promise<Alert> {
		return await this.adapter.getByID(id);
	}

	async update(dto: Alert): Promise<Alert> {
		return await this.adapter.update(dto);
	}
}

export default PanicButtonService;
