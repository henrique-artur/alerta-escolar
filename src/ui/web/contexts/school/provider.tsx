import { PropsWithChildren, useCallback, useState } from "react";
import { SchoolCTX } from ".";
import SchoolUseCase from "@interfaces/usecases/SchoolUseCase";
import { usePanic } from "../auth/hooks";
import Pagination from "@models/pagination";
import School from "@models/School";

interface Props {
	usecase: SchoolUseCase;
}

function SchoolProvider({ usecase, children }: PropsWithChildren<Props>) {
	const panic = usePanic();
	const [schools, setSchools] = useState<Pagination<School>>();

	const fetch = useCallback(async () => {
		setSchools(undefined);
		return usecase
			.fetch()
			.then(setSchools)
			.catch((err) => {
				panic(err);
			});
	}, []);

	const create = useCallback(async (school: School) => {
		let isCreated = false;
		try {
			isCreated = await usecase.create(school);
			await fetch();
		} catch (err) {
			panic(err);
		}
		return isCreated;
	}, []);

	const erase = useCallback(async (schoolID: string) => {
		let isDeleted = false;
		try {
			isDeleted = await usecase.erase(schoolID);
			await fetch();
		} catch (err) {
			panic(err);
		}
		return isDeleted;
	}, []);

	const update = useCallback(async (school: School) => {
		let isUpdated = false;
		try {
			isUpdated = await usecase.update(school);
			await fetch();
		} catch (err) {
			panic(err);
		}
		return isUpdated;
	}, []);

	const findByID = useCallback(async (schoolID: string) => {
		return await usecase
			.findByID(schoolID)
			.then((response) => response)
			.catch((err) => {
				panic(err);
				return undefined;
			});
	}, []);

	return (
		<SchoolCTX.Provider
			value={{
				fetch,
				schools,
				create,
				erase,
				update,
				findByID,
			}}
		>
			{children}
		</SchoolCTX.Provider>
	);
}

export default SchoolProvider;
