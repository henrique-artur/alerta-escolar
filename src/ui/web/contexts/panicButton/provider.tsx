import PanicButtonUseCase from "@interfaces/usecases/PanicButtonUseCase";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { PanicButtonCTX } from ".";
import { usePanic } from "../auth/hooks";
import Alert from "@models/Alert";
import Pagination from "@models/pagination";
import { io } from "socket.io-client";
import { DTO } from "@typing/http";

const socket = io(process.env.VITE_WEBSOCKET_URL ?? "", {
	transports: ["websocket"],
});

interface Props {
	usecase: PanicButtonUseCase;
}

export default function PanicButtonProvider({
	usecase,
	children,
}: PropsWithChildren<Props>) {
	const panic = usePanic();
	const [alerts, setAlerts] = useState<Pagination<Alert>>();
	const [lastAlert, setLastAlert] = useState<Alert>();

	useEffect(() => {
		socket.emit("join_room");
		socket.on("new_alert", (alert: DTO) =>
			setLastAlert(Alert.fromJSON(alert))
		);
		socket.on("connect", () => console.log("Connect"));
		socket.on("disconnect", () => console.log("Disconnect"));
	}, [socket]);

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

	const fetch = useCallback(async (queryParams?: Record<string, unknown>) => {
		setAlerts(undefined);
		return await usecase
			.fetch(queryParams)
			.then(setAlerts)
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
				fetch,
				alerts,
				lastAlert,
			}}
		>
			{children}
		</PanicButtonCTX.Provider>
	);
}
