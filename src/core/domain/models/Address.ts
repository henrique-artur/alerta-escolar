import { DTO } from "@typing/http";
import { Model } from "./model";

class Address extends Model {
	private _zipCode: string;
	private _district: string;
	private _uf: string;
	private _location: string;
	private _publicArea: string;

	constructor() {
		super();
		this._zipCode = "";
		this._district = "";
		this._uf = "";
		this._location = "";
		this._publicArea = "";
	}

	static fromJSON(json: DTO): Address {
		const obj = new Address();
		obj._zipCode = String(json["zipCode"]);
		obj._district = String(json["district"]);
		obj._uf = String(json["uf"]);
		obj._location = String(json["location"]);
		obj._publicArea = String(json["publicArea"]);
		return obj;
	}

	toJSON(): DTO {
		const json = {} as DTO;
		json["zipCode"] = this.zipCode;
		json["district"] = this.district;
		json["uf"] = this.uf;
		json["location"] = this.location;
		json["publicArea"] = this.publicArea;
		return json;
	}

	get zipCode() {
		return this._zipCode;
	}

	get district() {
		return this._district;
	}

	get uf() {
		return this._uf;
	}

	get location() {
		return this._location;
	}

	get publicArea() {
		return this._publicArea;
	}
}

export default Address;
