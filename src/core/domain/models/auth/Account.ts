import { Model } from "../model";
import { DTO } from "@typing/http";
import { AccountRole } from "./AccountRole";

class Account extends Model {
	constructor(
		private _id: string,
		private _name: string,
		private _email: string,
		private _phone: string,
		private _whatsapp: string,
		private _cops: [],
		private _school: [],
		private _role: AccountRole[]
	) {
		super();
	}

	static fromJSON(json: Record<string, unknown>): Account {
		const id = String(json["id"]);
		const name = String(json["full_name"]);
		const email = String(json["email"]);
		const phone = String(json["phone"]);
		const whatsapp = String(json["whatsapp"]);
		const role = (json["role"] as Record<string, unknown>[])?.map(
			AccountRole.fromJSON
		);

		return new Account(id, name, email, phone, whatsapp, [], [], role);
	}

	static fromForm(data: DTO): DTO {
		const json = {} as DTO;
		json["first_name"] = String(data["name"]);
		json["last_name"] = String(data["last_name"]);
		json["email"] = String(data["email"]);
		json["phone"] = String(data["phone"]);
		json["whatsapp"] = String(data["whatsapp"]);
		if (data["cops"]) json["cops"] = [String(data["cops"])];
		if (data["schools"]) json["schools"] = [String(data["school"])];
		json["roles"] = [String(data["roles"])];
		json["password"] = String(data["password"]);
		return json;
	}

	toJSON(): DTO<unknown> {
		const json = {} as DTO;
		json["id"] = this._id;
		json["name"] = this._name;
		json["email"] = this._email;
		json["phone"] = this._phone;
		json["whatsapp"] = this._whatsapp;
		json["cops"] = this._cops;
		json["school"] = this._school;
		json["role"] = this._role;
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
