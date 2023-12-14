import Alert from "@models/Alert";

abstract class PanicButtonUseCase {
	abstract press(): Promise<Alert>;
	abstract getByID(id: string): Promise<Alert>;
	abstract update(dto: Alert): Promise<Alert>;
}

export default PanicButtonUseCase;
