import { DTO } from "@typing/index";
import { AccountProfile } from "./AccountProfile";
import { AccountRole } from "./AccountRole";
import { Model } from "../model";

class Account extends Model {
	constructor(
		private _id: string,
		private _profile: AccountProfile,
		private _role: AccountRole
	) {
		super();
	}

	static fromJSON(json: Record<string, unknown>): Account {
		const id = String(json["id"]);
		const profile = AccountProfile.fromJSON(json["profile"] as DTO);
		const role = AccountRole.fromJSON(json["role"] as DTO);
		return new Account(id, profile, role);
	}

	toJSON(): DTO {
		let dto = {} as DTO;
		dto["id"] = this.id;
		dto["profile"] = this.profile.toJSON();
		dto["role"] = this.role.toJSON();
		return dto;
	}

	get id() {
		return this._id;
	}

	get profile() {
		return this._profile;
	}

	get role() {
		return this._role;
	}

	get formattedName() {
		const splittedName = this.profile.name.split(" ");
		if (splittedName.length === 1) {
			return splittedName[0];
		}
		return `${splittedName[0]} ${splittedName[1]}`;
	}

	get firstName() {
		return this.profile.name.split(" ")[0];
	}
}

export { Account };
