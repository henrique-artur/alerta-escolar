import { PropsWithChildren, useCallback, useState } from "react";
import { CopCTX } from ".";
import CopUseCase from "@interfaces/usecases/CopUseCase";
import Pagination from "@models/pagination";
import Cop from "@models/Cop";
import { usePanic } from "../auth/hooks";

interface Props {
	usecase: CopUseCase;
}

function CopProvider({ usecase, children }: PropsWithChildren<Props>) {
	const [cops, setCops] = useState<Pagination<Cop>>();
	const panic = usePanic();

	const fetch = useCallback(async (queryParams?: Record<string, unknown>) => {
		setCops(undefined);
		return usecase
			.fetch(queryParams)
			.then(setCops)
			.catch((err) => {
				panic(err);
			});
	}, []);

	const findByID = useCallback((copID: string) => {
		return usecase
			.findByID(copID)
			.then((response) => response)
			.catch((err) => {
				panic(err);
				return undefined;
			});
	}, []);

	const create = useCallback(async (cop: Cop) => {
		let isCreated = false;
		try {
			isCreated = await usecase.create(cop);
			await fetch();
		} catch (err) {
			panic(err);
		}
		return isCreated;
	}, []);

	const erase = useCallback(async (copID: string) => {
		let isDeleted = false;
		try {
			isDeleted = await usecase.delete(copID);
			await fetch();
		} catch (err) {
			panic(err);
		}
		return isDeleted;
	}, []);

	const update = useCallback(async (cop: Cop) => {
		let isUpdated = false;
		try {
			isUpdated = await usecase.update(cop);
			await fetch();
		} catch (err) {
			panic(err);
		}
		return isUpdated;
	}, []);

	return (
		<CopCTX.Provider
			value={{
				fetch,
				cops,
				findByID,
				create,
				delete: erase,
				update,
			}}
		>
			{children}
		</CopCTX.Provider>
	);
}

export default CopProvider;
