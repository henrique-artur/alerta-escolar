import { DTO } from "@typing/http";
import Cop from "./Cop";
import Responsible from "./Responsible";
import School from "./School";
import { Model } from "./model";
import TypeIncident from "./TypeIncident";
import { formatDateWithTimeToView } from "@utils/date";

class Alert extends Model {
	private _id: string;
	private _teacher: Responsible;
	private _school: School;
	private _cop: Cop;
	private _status: string;
	private _typeIncident?: TypeIncident;
	private _description?: string;
	private _problemSolving?: string;
	private _responsible?: Responsible;
	private _createdAt: string;

	constructor() {
		super();
		this._id =
			this._description =
			this._status =
			this._problemSolving =
			this._createdAt =
				"";
		this._teacher = this._responsible = new Responsible();
		this._typeIncident = new TypeIncident();
		this._cop = new Cop();
		this._school = new School();
	}

	static fromJSON(json: DTO): Alert {
		const obj = new Alert();
		obj._id = String(json["id"]);
		obj._teacher = Responsible.fromJSON(json["teacher"] as DTO);
		obj._school = School.fromJSON(json["school"] as DTO);
		obj._cop = Cop.fromJSON(json["cop"] as DTO);
		obj._status = String(json["status"]);
		obj._typeIncident = json["type_incident"]
			? TypeIncident.fromJSON(json["type_incident"] as DTO)
			: undefined;
		obj._description = String(json["description"]);
		obj._problemSolving = String(json["problem_solving"]);
		obj._responsible = json["responsible"]
			? Responsible.fromJSON(json["responsible"] as DTO)
			: undefined;
		obj._createdAt = formatDateWithTimeToView(String(json["created_at"]))!;

		return obj;
	}

	toJSON(): DTO {
		const json = {} as DTO;

		this._typeIncident?.id
			? (json["type_incident"] = this._typeIncident?.id)
			: undefined;
		this.responsible?.id
			? (json["concluded_by"] = this.responsible?.id)
			: undefined;
		this._status ? (json["status"] = this._status) : undefined;
		this._description
			? (json["description"] = this._description)
			: undefined;
		this._problemSolving
			? (json["problem_solving"] = this._problemSolving)
			: undefined;
		this._responsible?.id
			? (json["responsible"] = this._responsible?.id)
			: undefined;

		return json;
	}

	static fromForm(values: DTO): Alert {
		const obj = new Alert();
		values["id"] ? (obj._id = String(values["id"])) : undefined;
		values["type_incident"]
			? (obj._typeIncident!.id = String(values["type_incident"]))
			: undefined;
		values["description"]
			? (obj._description = String(values["description"]))
			: undefined;
		values["status"] ? (obj._status = String(values["status"])) : undefined;

		return obj;
	}

	get id() {
		return this._id;
	}

	get teacher() {
		return this._teacher;
	}

	get school() {
		return this._school;
	}

	get cop() {
		return this._cop;
	}

	get status() {
		return this._status;
	}

	get typeIncident() {
		return this._typeIncident;
	}

	get description() {
		return this._description;
	}

	get problemSolving() {
		return this._problemSolving;
	}

	get responsible() {
		return this._responsible;
	}

	get createdAt() {
		return this._createdAt;
	}
}

export default Alert;
