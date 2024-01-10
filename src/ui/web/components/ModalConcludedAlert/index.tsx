import Alert from "@models/Alert";
import { useAccount } from "@web/contexts/auth/hooks";
import { useConcludedAlert } from "@web/contexts/panicButton/hooks";
import { Input, Modal, Typography } from "antd";
import {
	ForwardedRef,
	forwardRef,
	useCallback,
	useImperativeHandle,
	useState,
} from "react";

export interface ModalConcludedAlertHandlers {
	open(id: string): void;
}

function ModalConcludedAlert(
	{},
	ref: ForwardedRef<ModalConcludedAlertHandlers>
) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [id, setID] = useState<string>();
	const [problemSolving, setProblemSolving] = useState<string>();
	const concluded = useConcludedAlert();
	const account = useAccount();

	const open = useCallback((id: string) => {
		setID(id);
		setIsModalOpen(true);
	}, []);

	useImperativeHandle(ref, () => ({ open }));

	const onClose = useCallback(() => {
		setIsModalOpen(false);
	}, []);

	const onOk = useCallback(() => {
		concluded(
			Alert.fromForm({
				id,
				concluded_by: account?.id,
				problem_solving: problemSolving,
				status: "ocorrencia_resolvida",
			})
		);
		setIsModalOpen(false);
	}, [problemSolving, id, account]);

	const { Text } = Typography;
	const { TextArea } = Input;

	return (
		<Modal
			width={700}
			title={"Concluir Alerta"}
			open={isModalOpen}
			onOk={onOk}
			onCancel={onClose}
			cancelText="Cancelar"
			okText="Concluir"
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Text>Resumo da Ocorrência</Text>
				<TextArea
					autoSize={{
						minRows: 3,
						maxRows: 8,
					}}
					onChange={(e) => setProblemSolving(e.target.value)}
				/>
			</div>
		</Modal>
	);
}

export default forwardRef(ModalConcludedAlert);
