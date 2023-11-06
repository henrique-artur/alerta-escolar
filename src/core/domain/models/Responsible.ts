import { DTO } from "@typing/http";
import { Model } from "./model";

class Responsible extends Model {
	private _id: string;
	private _name: string;
	private _email: string;
	private _phone: string;
	private _isActive: boolean;

	constructor() {
		super();
		this._id = "";
		this._name = "";
		this._email = "";
		this._phone = "";
		this._isActive = true;
	}

	static fromJSON(json: DTO): Responsible {
		const obj = new Responsible();
		obj._id = String(json["id"]);
		obj._name = String(json["full_name"]);
		obj._email = String(json["email"]);
		obj._phone = String(json["phone"]);
		obj._isActive = Boolean(json["is_active"]);
		return obj;
	}

	get id() {
		return this._id;
	}
	get name() {
		return this._name;
	}
	get email() {
		return this._email;
	}
	get phone() {
		return this._phone;
	}
	get isActive() {
		return this._isActive;
	}

	set id(id: string) {
		this._id = id;
	}
}

export default Responsible;
