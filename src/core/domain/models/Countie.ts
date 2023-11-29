import { DTO } from "@typing/http";
import { Model } from "./model";

class Countie extends Model {
	private _id: string;
	private _name: string;
	private _code: string;

	constructor() {
		super();
		this._id = this._name = this._code = "";
	}

	static fromJSON(json: DTO): Countie {
		const obj = new Countie();
		obj._id = String(json["id"]);
		obj._name = String(json["name"]);
		obj._code = String(json["code"]);
		return obj;
	}

	static fromForm(dto: DTO): Countie {
		const obj = new Countie();
		obj._id = String(dto["id"]);
		obj._code = String(dto["code"]);
		obj._name = String(dto["name"]);
		return obj;
	}

	get id() {
		return this._id;
	}

	get name() {
		return this._name;
	}

	get code() {
		return this._code;
	}

	set id(id: string) {
		this._id = id;
	}
}

export default Countie;
