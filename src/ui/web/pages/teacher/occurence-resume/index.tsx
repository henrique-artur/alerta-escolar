import { Button, Typography } from "antd";
import imgLogo from "assets/images/alerta-escolar-logo.svg";
import radsLogo from "assets/images/rads-logo.svg";
import delmiroGouveiaLogo from "assets/images/delmiro-gouveia-logo.svg";
import styles from "./styles.module.scss";
import CardInfo from "@web/components/CardInfo";
import View from "@web/components/base/View";
import Alert from "@models/Alert";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	useGetAlertByID,
	useJoinRoomAlert,
	useNewStatusAlert,
} from "@web/contexts/panicButton/hooks";
import { ALERT_STATUS } from "@utils/alertStatus";

function OccurrenceResumePage() {
	const { Text } = Typography;
	const { id } = useParams();
	const navigate = useNavigate();
	const [alert, setAlert] = useState<Alert>();
	const getAlertByID = useGetAlertByID();
	const newStatusAlert = useNewStatusAlert();
	const joinRoomAlert = useJoinRoomAlert();

	const returnToPanicButton = useCallback(() => {
		navigate("/professor/botao-de-panico");
	}, []);

	const lastAlertStatus = useMemo(() => {
		let statusValue = alert?.status;

		if (newStatusAlert !== undefined) {
			statusValue = newStatusAlert;
		}

		return (
			ALERT_STATUS.find((item) => item.value === statusValue)?.label ??
			"Status Desconhecido"
		);
	}, [alert, newStatusAlert]);

	useEffect(() => {
		if (!alert && id && !!getAlertByID) {
			getAlertByID(id).then((response) => response && setAlert(response));
		}

		if (id) {
			joinRoomAlert(id);
		}
	}, []);

	return (
		<View hiddenPageTitle className={styles.container}>
			<img className={styles.appLogo} src={imgLogo} alt="Logo do app" />
			<CardInfo title={"Informações da Ocorrência"}>
				<div className={styles.infoBox}>
					<Text strong>Escola</Text>
					<Text>{alert?.school.name}</Text>
				</div>
				<div className={styles.infoBox}>
					<Text strong>Endereço</Text>
					<Text>{alert?.school.address.completeAddres()}</Text>
				</div>
				<div className={styles.infoBox}>
					<Text strong>Status</Text>
					<Text>{lastAlertStatus}</Text>
				</div>
				<div className={styles.infoBox}>
					<Text strong>Tipo de Incidente</Text>
					<Text>{alert?.typeIncident?.code}</Text>
				</div>
				<div className={styles.infoBox}>
					<Text strong>Descreva o Ocorrido</Text>
					<Text>{alert?.description}</Text>
				</div>
			</CardInfo>

			<Button
				type="primary"
				block
				size="large"
				onClick={returnToPanicButton}
			>
				Voltar ao Botão de Alerta
			</Button>

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

export default OccurrenceResumePage;
