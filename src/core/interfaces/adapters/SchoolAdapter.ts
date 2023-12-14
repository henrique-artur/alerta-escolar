import School from "@models/School";
import Pagination from "@models/pagination";

abstract class SchoolAdapter {
	abstract fetch(): Promise<Pagination<School>>;
	abstract create(school: School): Promise<boolean>;
	abstract erase(schoolID: string): Promise<boolean>;
	abstract update(school: School): Promise<boolean>;
	abstract findByID(schoolID: string): Promise<School>;
}

export default SchoolAdapter;
