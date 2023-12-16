import Alert from "@models/Alert";
import Pagination from "@models/pagination";

export default abstract class PanicButtonAdapter {
	abstract press(): Promise<Alert>;
	abstract getByID(id: string): Promise<Alert>;
	abstract update(dto: Alert): Promise<Alert>;
	abstract fetch(
		queryParams?: Record<string, unknown>
	): Promise<Pagination<Alert>>;
}
