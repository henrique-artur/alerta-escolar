import ResourcesUseCase from "@interfaces/usecases/ResourcesUseCase";
import { PropsWithChildren, useCallback, useState } from "react";
import { ResourcesCTX } from ".";
import Pagination from "@models/pagination";
import { AccountRole } from "@models/auth";
import { usePanic } from "../auth/hooks";
import Countie from "@models/Countie";

interface Props {
	usecase: ResourcesUseCase;
}

function ResourcesProvider({ usecase, children }: PropsWithChildren<Props>) {
	const panic = usePanic();
	const [roles, setRoles] = useState<Pagination<AccountRole>>();
	const [counties, setCounties] = useState<Pagination<Countie>>();

	const fetch = useCallback(async () => {
		setRoles(undefined);
		return usecase
			.fetchRoles()
			.then(setRoles)
			.catch((err) => {
				panic(err);
			});
	}, []);

	const getAddressByZipCode = useCallback(async (zipCode: string) => {
		return usecase
			.getAddressByZipCode(zipCode)
			.then((response) => response)
			.catch((err) => {
				panic(err);
				return undefined;
			});
	}, []);

	const fetchCounties = useCallback(
		async (queryParams?: Record<string, unknown>) => {
			setCounties(undefined);
			return usecase
				.fetchCounties(queryParams)
				.then(setCounties)
				.catch((err) => {
					panic(err);
				});
		},
		[]
	);

	return (
		<ResourcesCTX.Provider
			value={{
				fetch,
				roles,
				getAddressByZipCode,
				fetchCounties,
				counties,
			}}
		>
			{children}
		</ResourcesCTX.Provider>
	);
}

export default ResourcesProvider;
