import { DTO } from "@typing/http";
import Responsible from "./Responsible";
import { Model } from "./model";
import Address from "./Address";
import Countie from "./Countie";

class Cop extends Model {
	private _id: string;
	private _name: string;
	private _geolocation: string;
	private _address: Address;
	private _countie: Countie;
	private _responsible: Responsible;

	constructor() {
		super();
		this._id = "";
		this._name = "";
		this._geolocation = "";
		this._address = new Address();
		this._countie = new Countie();
		this._responsible = new Responsible();
	}

	static fromJSON(json: DTO): Cop {
		const obj = new Cop();
		obj._id = String(json["id"]);
		obj._name = String(json["name"]);
		obj._geolocation = String(json["geolocation"]);
		obj._address = Address.fromJSON(json["address"] as DTO);
		obj._countie = Countie.fromJSON(json["countie"] as DTO);
		obj._responsible = Responsible.fromJSON(json["responsible"] as DTO);
		return obj;
	}

	static fromForm(dto: DTO): Cop {
		const obj = new Cop();
		obj._id = String(dto["id"]);
		obj._name = String(dto["name"]);
		obj._geolocation = String(dto["geolocation"]);
		obj._address = Address.fromJSON(dto["address"] as DTO);
		obj._countie.id = String(dto["countie"]);
		obj._responsible.id = String(dto["responsible"]);
		return obj;
	}

	toJSON(): DTO {
		const json = {} as DTO;
		if (this.id) json["id"] = this._id;
		json["name"] = this.name;
		json["geolocation"] = this.geolocation;
		json["address"] = this.address;
		json["countie"] = this._countie.id;
		json["responsible"] = this.responsible.id;
		return json;
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

export default Cop;
