import PanicButtonUseCase from "@interfaces/usecases/PanicButtonUseCase";
import { PropsWithChildren, useCallback } from "react";
import { PanicButtonCTX } from ".";
import { usePanic } from "../auth/hooks";
import Alert from "@models/Alert";

interface Props {
	usecase: PanicButtonUseCase;
}

export default function PanicButtonProvider({
	usecase,
	children,
}: PropsWithChildren<Props>) {
	const panic = usePanic();

	const press = useCallback(async () => {
		return await usecase
			.press()
			.then((response) => response)
			.catch((err) => {
				panic(err);
			});
	}, []);

	const getByID = useCallback(async (id: string) => {
		return await usecase
			.getByID(id)
			.then((response) => response)
			.catch((err) => {
				panic(err);
			});
	}, []);

	const update = useCallback(async (dto: Alert) => {
		return await usecase
			.update(dto)
			.then((response) => response)
			.catch((err) => {
				panic(err);
			});
	}, []);

	return (
		<PanicButtonCTX.Provider
			value={{
				press,
				getByID,
				update,
			}}
		>
			{children}
		</PanicButtonCTX.Provider>
	);
}
