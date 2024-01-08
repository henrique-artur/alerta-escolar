import PanicButtonUseCase from "@interfaces/usecases/PanicButtonUseCase";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { PanicButtonCTX } from ".";
import { usePanic } from "../auth/hooks";
import Alert from "@models/Alert";
import Pagination from "@models/pagination";
import { io } from "socket.io-client";
import { DTO } from "@typing/http";
import { useNotification } from "../common/notification/hooks";

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
	const notification = useNotification();
	const [alerts, setAlerts] = useState<Pagination<Alert>>();
	const [lastAlert, setLastAlert] = useState<Alert>();
	const [newStatusAlert, setNewStatusAlert] = useState<string>();
	const [schoolSelected, setSchoolSelected] = useState<string>();

	useEffect(() => {
		socket.emit("join_room");
		socket.on("new_alert", (alert: DTO) => {
			socket.emit("join_room_alert", alert.id);
			setLastAlert(Alert.fromJSON(alert));
		});
		socket.on("connect", () => console.log("Connect"));
		socket.on("disconnect", () => console.log("Disconnect"));

		socket.on("new_status", (message) => {
			setNewStatusAlert(message);
		});

		socket.on("update_list_alert", () => fetch());
	}, [socket]);

	const press = useCallback(async () => {
		return await usecase
			.press()
			.then((response) => {
				notification.success({
					message: "Seu alerta foi enviado com sucesso!",
				});
				return response;
			})
			.catch((err) => {
				panic(err);
			});
	}, []);

	const createRoom = useCallback((id: string) => {
		socket.emit("create_room", id);
	}, []);

	const joinRoomAlert = useCallback((id: string) => {
		socket.emit("join_room_alert", id);
	}, []);

	const updateStatusAlert = useCallback(
		async (value: Alert, status: string) => {
			const data = {
				room: value.id,
				status: status,
			};

			try {
				await update(
					Alert.fromForm({
						id: value.id,
						status,
					})
				);
				socket.emit("status_update", data);
			} catch (err) {
				panic(err);
			}
		},
		[]
	);

	const concludedAlert = useCallback(async (dto: Alert) => {
		return await update(dto, () =>
			socket.emit("update_item_in_list_alert")
		);
	}, []);

	const updateResponsibleAlert = useCallback(async (dto: Alert) => {
		return await update(dto, () =>
			socket.emit("update_item_in_list_alert")
		);
	}, []);

	const getByID = useCallback(async (id: string) => {
		return await usecase
			.getByID(id)
			.then((response) => response)
			.catch((err) => {
				panic(err);
			});
	}, []);

	const update = useCallback(async (dto: Alert, onSuccess?: () => void) => {
		return await usecase
			.update(dto)
			.then((response) => {
				if (onSuccess) onSuccess();
				return response;
			})
			.catch((err) => {
				panic(err);
			});
	}, []);

	const fetch = useCallback(
		async (queryParams?: Record<string, unknown>) => {
			setAlerts(undefined);
			if (schoolSelected) {
				queryParams = {
					...queryParams,
					school: schoolSelected,
				};
			}
			return await usecase
				.fetch({ ...queryParams })
				.then(setAlerts)
				.catch((err) => {
					panic(err);
				});
		},
		[schoolSelected]
	);

	const chooseSchool = useCallback((selectedSchool: string) => {
		setSchoolSelected(selectedSchool);
	}, []);

	return (
		<PanicButtonCTX.Provider
			value={{
				press,
				createRoom,
				getByID,
				update,
				fetch,
				alerts,
				lastAlert,
				joinRoomAlert,
				updateStatusAlert,
				newStatusAlert,
				updateResponsibleAlert,
				concludedAlert,
				chooseSchool,
			}}
		>
			{children}
		</PanicButtonCTX.Provider>
	);
}
