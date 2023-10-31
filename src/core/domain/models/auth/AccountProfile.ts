import { formatDate } from "@utils/date";
import { Model } from "../model";
import { DTO } from "@typing/http";

class AccountProfile extends Model {
	constructor(
		private _id: string,
		private _name: string,
		private _birthDate: string,
		private _cpf: string,
		private _email: string,
		private _phone: string,
		private _createdAt: string,
		private _updatedAt: string
	) {
		super();
	}

	static fromJSON(json: Record<string, unknown>): AccountProfile {
		const id = String(json["id"]);
		const name = String(json["name"]);
		const birthDate = String(json["birth_date"]);
		const cpf = String(json["cpf"]);
		const email = String(json["email"]);
		const phone = String(json["phone"]);
		const createdAt = String(json["created_at"]);
		const updatedAt = String(json["updated_at"]);
		return new AccountProfile(
			id,
			name,
			birthDate,
			cpf,
			email,
			phone,
			createdAt,
			updatedAt
		);
	}

	toJSON(): DTO<unknown> {
		const json = {} as DTO;
		json["id"] = this._id;
		json["name"] = this._name;
		json["birth_date"] = this._birthDate;
		json["cpf"] = this._cpf;
		json["email"] = this._email;
		json["phone"] = this._phone;
		json["created_at"] = this._createdAt;
		json["updated_at"] = this._updatedAt;
		return json;
	}

	get id() {
		return this._id;
	}

	get name() {
		return this._name;
	}

	get birthDate() {
		return this._birthDate;
	}

	get formattedBirthDate() {
		return formatDate(this._birthDate);
	}

	get cpf() {
		return this._cpf;
	}

	get email() {
		return this._email;
	}

	get phone() {
		return this._phone;
	}

	get createdAt() {
		return this._createdAt;
	}

	get formattedCreatedAt() {
		return formatDate(this._createdAt);
	}

	get updatedAt() {
		return this._updatedAt;
	}

	get formattedUpdatedAt() {
		return formatDate(this._updatedAt);
	}
}

export { AccountProfile };
