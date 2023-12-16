import Alert from "@models/Alert";
import Pagination from "@models/pagination";

abstract class PanicButtonUseCase {
	abstract press(): Promise<Alert>;
	abstract getByID(id: string): Promise<Alert>;
	abstract update(dto: Alert): Promise<Alert>;
	abstract fetch(
		queryParams?: Record<string, unknown>
	): Promise<Pagination<Alert>>;
}

export default PanicButtonUseCase;
