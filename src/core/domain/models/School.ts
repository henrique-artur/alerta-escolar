import { DTO } from "@typing/http";
import Responsible from "./Responsible";
import { Model } from "./model";

class School extends Model {
	private _id: string;
	private _name: string;
	private _address: string;
	private _geolocation: string;
	private _responsible: Responsible;

	constructor() {
		super();
		this._id = "";
		this._name = "";
		this._address = "";
		this._geolocation = "";
		this._responsible = new Responsible();
	}

	static fromJSON(json: DTO): School {
		const obj = new School();
		obj._id = String(json["id"]);
		obj._name = String(json["name"]);
		obj._address = String(json["address"]);
		obj._geolocation = String(json["geolocation"]);
		obj._responsible = Responsible.fromJSON(json["responsible"] as DTO);
		return obj;
	}

	toJSON(): DTO {
		const json = {} as DTO;
		json["name"] = this._name;
		json["address"] = this._address;
		json["geolocation"] = this._geolocation;
		json["responsible"] = this._responsible.id;
		return json;
	}

	static fromForm(dto: DTO): School {
		const obj = new School();
		obj._name = String(dto["name"]);
		obj._address = String(dto["address"]);
		obj._responsible.id = String(dto["responsible"]);
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
}

export default School;
