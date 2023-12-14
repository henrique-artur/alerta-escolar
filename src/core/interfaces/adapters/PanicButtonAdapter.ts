import Alert from "@models/Alert";

export default abstract class PanicButtonAdapter {
	abstract press(): Promise<Alert>;
	abstract getByID(id: string): Promise<Alert>;
	abstract update(dto: Alert): Promise<Alert>;
}
