import ResourcesUseCase from "@interfaces/usecases/ResourcesUseCase";
import React, { PropsWithChildren, useCallback, useState } from "react";
import { ResourcesCTX } from ".";
import Pagination from "@models/pagination";
import { AccountRole } from "@models/auth";
import { usePanic } from "../auth/hooks";

interface Props {
	usecase: ResourcesUseCase;
}

function ResourcesProvider({ usecase, children }: PropsWithChildren<Props>) {
	const panic = usePanic();
	const [roles, setRoles] = useState<Pagination<AccountRole>>();

	const fetch = useCallback(async () => {
		setRoles(undefined);
		return usecase
			.fetchRoles()
			.then(setRoles)
			.catch((err) => {
				panic(err);
			});
	}, []);

	return (
		<ResourcesCTX.Provider
			value={{
				fetch,
				roles,
			}}
		>
			{children}
		</ResourcesCTX.Provider>
	);
}

export default ResourcesProvider;
