import { Model } from "../model";
import { DTO } from "@typing/http";
import { AccountRole } from "./AccountRole";
import School from "@models/School";
import Cop from "@models/Cop";

class Account extends Model {
	private _id: string;
	private _name: string;
	private _email: string;
	private _phone: string;
	private _whatsapp: string;
	private _cops: Cop[];
	private _school: School[];
	private _role: AccountRole[];
	private _password: string;

	constructor() {
		super();
		this._id = "";
		this._name = "";
		this._email = "";
		this._phone = "";
		this._whatsapp = "";
		this._cops = [];
		this._school = [];
		this._role = [];
		this._password = "";
	}

	static fromJSON(json: Record<string, unknown>): Account {
		const obj = new Account();

		obj._id = String(json["id"]);
		obj._name = String(json["full_name"]);
		obj._email = String(json["email"]);
		obj._phone = String(json["phone"]);
		obj._whatsapp = String(json["whatsapp"]);
		obj._school = !!json["schools"]
			? (json["schools"] as DTO[]).map(School.fromJSON)
			: [];
		obj._cops = !!json["cops"]
			? (json["cops"] as DTO[]).map(Cop.fromJSON)
			: [];
		obj._role = (json["roles"] as Record<string, unknown>[])?.map(
			AccountRole.fromJSON
		);

		return obj;
	}

	static fromForm(data: DTO): Account {
		const obj = new Account();

		obj._id = String(data["id"]);
		obj._name = String(data["full_name"]);
		obj._email = String(data["email"]);
		obj._phone = String(data["phone"]);
		obj._whatsapp = String(data["whatsapp"]);
		obj._cops = !!data["cops"] ? ([data["cops"]] as Cop[]) : [];
		obj._school = !!data["schools"]
			? ([data["schools"]] as School[])
			: ([] as School[]);
		obj._role = !!data["roles"]
			? ([data["roles"]] as AccountRole[])
			: ([] as AccountRole[]);
		if (data["password"]) obj._password = String(data["password"]);

		return obj;
	}

	toJSON(): DTO<unknown> {
		const json = {} as DTO;

		json["full_name"] = this._name;
		json["email"] = this._email;
		json["phone"] = this._phone;
		json["whatsapp"] = this._whatsapp;
		json["cops"] = this._cops;
		json["schools"] = this._school;
		json["roles"] = this.role;
		if (this._password) json["password"] = this._password;

		return json;
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

	get cops() {
		return this._cops;
	}

	get whatsapp() {
		return this._whatsapp;
	}

	get school() {
		return this._school;
	}

	get role() {
		return this._role;
	}
}

export { Account };
