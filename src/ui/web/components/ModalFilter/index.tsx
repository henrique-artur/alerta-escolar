import { ALERT_STATUS } from "@utils/alertStatus";
import { useFetchAlert } from "@web/contexts/panicButton/hooks";
import { Modal, Select, Typography } from "antd";
import {
	ForwardedRef,
	forwardRef,
	useCallback,
	useImperativeHandle,
	useState,
} from "react";

export interface ModalFilterHandlers {
	open(): void;
}

function ModalFilter({}, ref: ForwardedRef<ModalFilterHandlers>) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [alertStatusSelected, setAlertStatusSelected] = useState<string>();
	const fetchAlert = useFetchAlert();

	const open = useCallback(() => {
		setIsModalOpen(true);
	}, []);

	useImperativeHandle(ref, () => ({ open }));

	const onClose = useCallback(() => {
		setIsModalOpen(false);
		setAlertStatusSelected(undefined);
	}, []);

	const onOk = useCallback(() => {
		fetchAlert({
			status: alertStatusSelected,
		});
		setIsModalOpen(false);
	}, [alertStatusSelected]);

	const handleAlertType = useCallback(
		(value: string) => setAlertStatusSelected(value),
		[]
	);

	const { Text } = Typography;

	return (
		<Modal
			width={500}
			title={"Filtrar Alertas Por"}
			open={isModalOpen}
			onOk={onOk}
			onCancel={onClose}
			cancelText="Cancelar"
			okText="Filtrar"
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Text>Tipo de Alerta</Text>
				<Select
					onSelect={handleAlertType}
					defaultValue={alertStatusSelected ?? ALERT_STATUS[0].value}
					options={ALERT_STATUS}
				/>
			</div>
		</Modal>
	);
}

export default forwardRef(ModalFilter);
