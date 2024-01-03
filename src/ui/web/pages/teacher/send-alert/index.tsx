import { Button, Form, Input, Select, Skeleton, Typography } from "antd";
import imgLogo from "assets/images/alerta-escolar-logo.svg";
import radsLogo from "assets/images/rads-logo.svg";
import delmiroGouveiaLogo from "assets/images/delmiro-gouveia-logo.svg";
import styles from "./styles.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import CardInfo from "@web/components/CardInfo";
import { useCallback, useEffect, useState } from "react";
import View from "@web/components/base/View";
import { useAccount } from "@web/contexts/auth/hooks";
import {
	useGetAlertByID,
	useJoinRoomAlert,
	useNewStatusAlert,
	useUpdateAlert,
} from "@web/contexts/panicButton/hooks";
import Alert from "@models/Alert";
import { ALERT_STATUS } from "@utils/alertStatus";
import {
	useFetchIncidentType,
	useIncidentTypes,
} from "@web/contexts/resources/hooks";
import { DTO } from "@typing/http";

function SendAlertPage() {
	const { Text } = Typography;
	const navigate = useNavigate();
	const account = useAccount();
	const getAlertByID = useGetAlertByID();
	const fetchIncidentType = useFetchIncidentType();
	const incidentTypes = useIncidentTypes();
	const newStatusAlert = useNewStatusAlert();
	const updateAlert = useUpdateAlert();
	const { id } = useParams();
	const [alert, setAlert] = useState<Alert>();
	const [selectedTypeIncident, setSelectedTypeIncident] = useState<string>();
	const joinRoomAlert = useJoinRoomAlert();
	
	useEffect(() => {
		if (!!getAlertByID && id) {
			getAlertByID(id).then((response) => {
				if (response) setAlert(response);
			});
		}

		if (!incidentTypes && !!fetchIncidentType) {
			fetchIncidentType();
		}

		if (id){
			joinRoomAlert(id)
		}

	}, []);

	const onFinish = useCallback(
		async (values: DTO) => {
			const isUpdated = await updateAlert(
				Alert.fromForm({
					...values,
					id,
				})
			);
			if (isUpdated)
				navigate(`/professor/resumo-ocorrencia/${isUpdated.id}`);
		},
		[id]
	);

	const incidentTypeSelected = useCallback((value: string) => {
		setSelectedTypeIncident(value);
	}, []);
	
	let correspondingLabel: string = '';

	const statusFromAlertStatus = ALERT_STATUS.find(status => status.value === newStatusAlert);
	const alertStatus = alert?.status;
	
	if (statusFromAlertStatus) {
	  correspondingLabel = statusFromAlertStatus.label;
	} else {
	  correspondingLabel = ALERT_STATUS.find(status => status.value === alertStatus)?.label || 'Status Desconhecido';
	}

	return (
		<View hiddenPageTitle className={styles.container}>
			<img className={styles.appLogo} src={imgLogo} alt="Logo do app" />
			{alert ? (
				<CardInfo title={"Informações da Escola"}>
					<div className={styles.infoBox}>
						<Text>Escola</Text>
						<Text strong>{account?.school[0].name}</Text>
					</div>
					<div className={styles.infoBox}>
						<Text>Status do Alerta</Text>
						<Text strong>
							{
								correspondingLabel
							}
						</Text>
					</div>
				</CardInfo>
			) : (
				<Skeleton active />
			)}

			<Form
				layout="vertical"
				size="large"
				className={styles.occurrenceForm}
				onFinish={onFinish}
			>
				<Form.Item
					className={styles.formItem}
					label={"Qual o Motivo da Ocorrência?"}
					name={"type_incident"}
				>
					<Select
						className={styles.inputBorderColor}
						size="large"
						onChange={incidentTypeSelected}
						options={incidentTypes?.map((item) => ({
							label: item.code,
							value: item.id,
						}))}
					/>
				</Form.Item>
				<Form.Item
					className={styles.formItem}
					colon
					label="Descreva o Ocorrido"
					name={"description"}
				>
					<Input.TextArea
						className={styles.inputBorderColor}
						autoSize={{ minRows: 4, maxRows: 6 }}
					/>
				</Form.Item>
				<Form.Item>
					<Button
						className={styles.sendButton}
						block
						htmlType="submit"
						size="large"
						disabled={alert === undefined}
					>
						Enviar
					</Button>
				</Form.Item>
			</Form>

			<footer>
				<img
					style={{ width: 75 }}
					src={radsLogo}
					alt="imagem da logo da rads"
				/>
				<img
					style={{ width: 150 }}
					src={delmiroGouveiaLogo}
					alt="imagem da logo da prefeitura de Delmiro Gouveia"
				/>
			</footer>
		</View>
	);
}

export default SendAlertPage;
