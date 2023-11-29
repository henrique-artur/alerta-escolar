import { DTO } from "@typing/http";
import Responsible from "./Responsible";
import { Model } from "./model";
import Address from "./Address";
import Countie from "./Countie";

class School extends Model {
	private _id: string;
	private _name: string;
	private _geolocation: string;
	private _responsible: Responsible;
	private _address: Address;
	private _countie: Countie;

	constructor() {
		super();
		this._id = "";
		this._name = "";
		this._geolocation = "";
		this._countie = new Countie();
		this._responsible = new Responsible();
		this._address = new Address();
	}

	static fromJSON(json: DTO): School {
		const obj = new School();
		obj._id = String(json["id"]);
		obj._name = String(json["name"]);
		obj._geolocation = String(json["geolocation"]);
		obj._address = Address.fromJSON(json["address"] as DTO);
		obj._countie = Countie.fromJSON(json["countie"] as DTO);
		obj._responsible = Responsible.fromJSON(json["responsible"] as DTO);
		return obj;
	}

	toJSON(): DTO {
		const json = {} as DTO;
		json["name"] = this._name;
		json["address"] = this._address.toJSON();
		json["geolocation"] = this._geolocation;
		json["responsible"] = this._responsible.id;
		json["countie"] = this._countie.id;
		return json;
	}

	static fromForm(dto: DTO): School {
		const obj = new School();
		if (dto["id"]) obj._id = String(dto["id"]);
		obj._name = String(dto["name"]);
		obj._address = Address.fromJSON(dto["address"] as DTO);
		obj._responsible.id = String(dto["responsible"]);
		obj._countie.id = String(dto["countie"]);
		obj._geolocation = String(dto["geolocation"]);
		return obj;
	}

	get id() {
		return this._id;
	}

	get name() {
		return this._name;
	}

	get address() {
		return this._address;
	}

	get geolocation() {
		return this._geolocation;
	}

	get responsible() {
		return this._responsible;
	}

	get countie() {
		return this._countie;
	}
}

export default School;
