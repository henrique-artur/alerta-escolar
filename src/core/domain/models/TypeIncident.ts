import { DTO } from "@typing/http";
import { Model } from "./model";

class TypeIncident extends Model {
	private _id: string;
	private _name: string;
	private _code: string;

	constructor() {
		super();
		this._id = "";
		this._name = "";
		this._code = "";
	}

	static fromJSON(json: DTO): TypeIncident {
		const obj = new TypeIncident();
		obj._id = String(json["id"]);
		obj._name = String(json["name"]);
		obj._code = String(json["code"]);

		return obj;
	}

	get id() {
		return this._id;
	}

	set id(id: string) {
		this._id = id;
	}

	get name() {
		return this._name;
	}

	get code() {
		return this._code;
	}
}

export default TypeIncident;
