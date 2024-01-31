import {
	useLastAlert,
	useUpdateResponsibleAlert,
} from "@web/contexts/panicButton/hooks";
import { Col, Modal, Row, Typography, Button } from "antd";
import {
	ForwardedRef,
	forwardRef,
	useCallback,
	useImperativeHandle,
	useState,
} from "react";
import styles from "./styles.module.scss";
import Alert from "@models/Alert";
import { useAccount } from "@web/contexts/auth/hooks";
import { useToggleAudio } from "@web/contexts/audio/hooks";

export interface AlertModalHandlers {
	open(): void;
}

interface Props {
	detailsOnClick(id: string): void;
}

function AlertModal(
	{ detailsOnClick }: Props,
	ref: ForwardedRef<AlertModalHandlers>
) {
	const [isOpen, setIsOpen] = useState<boolean>();
	const alert = useLastAlert();
	const getAlert = useUpdateResponsibleAlert();
	const account = useAccount();
	const toggle = useToggleAudio();
	const open = useCallback(() => {
		setIsOpen(true);
	}, []);

	useImperativeHandle(ref, () => ({ open }));

	const close = useCallback(() => {
		setIsOpen(false);
	}, []);

	const onOk = useCallback(async () => {
		toggle(false);
		await getAlert(
			Alert.fromForm({
				id: alert?.id,
				responsible: account?.id,
				status: "ajuda_caminho",
			})
		);
		detailsOnClick(alert?.id!);
	}, [alert]);

	const { Title, Paragraph } = Typography;

	return (
		<Modal
			width={700}
			title="Alerta Emitido"
			closable={false}
			open={isOpen}
			footer={[
				<Button key="submit" type="primary" onClick={onOk}>
					Pegar Alerta
				</Button>
			  ]}
		>
			<Row gutter={16}>
				<Col span={6}>
					<Title className={styles.title} level={4}>
						Escola
					</Title>
					<Paragraph>{alert?.school.name}</Paragraph>
				</Col>
				<Col span={16}>
					<Title className={styles.title} level={4}>
						Endereço
					</Title>
					<Paragraph>
						{alert?.school.address.completeAddres()}
					</Paragraph>
				</Col>
			</Row>
			<Row>
				<Col span={6}>
					<Title className={styles.title} level={4}>
						Solicitante
					</Title>
					<Paragraph>{alert?.teacher.name}</Paragraph>
				</Col>
				<Col span={12}>
					<Title className={styles.title} level={4}>
						Telefone do Solicitante
					</Title>
					<Paragraph>{alert?.teacher.phone}</Paragraph>
				</Col>
			</Row>
		</Modal>
	);
}

export default forwardRef(AlertModal);
