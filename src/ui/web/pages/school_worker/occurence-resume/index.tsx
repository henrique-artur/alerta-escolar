import { Alert, Typography } from "antd";
import imgLogo from "assets/images/alerta-escolar-logo.svg";
import radsLogo from "assets/images/rads-logo.svg";
import delmiroGouveiaLogo from "assets/images/delmiro-gouveia-logo.svg";
import styles from "./styles.module.scss";
import CardInfo from "@web/components/CardInfo";

function OccurrenceResumePage() {
	const { Text } = Typography;

	return (
		<div className={styles.container}>
			<img className={styles.appLogo} src={imgLogo} alt="Logo do app" />
			<CardInfo title={"Informações da Ocorrência"}>
				<div className={styles.infoBox}>
					<Text>Escola</Text>
					<Text strong>CEI ADÉLIA RUSSI SILVA</Text>
				</div>
				<div className={styles.infoBox}>
					<Text>Endereço</Text>
					<Text strong>
						Rua Santa Luiza, nº 150 - Dom Bosco 88303-573
					</Text>
				</div>
				<div className={styles.infoBox}>
					<Text>Motivo do Alerta</Text>
					<Text strong>Invasão</Text>
				</div>
				<div className={styles.infoBox}>
					<Text>Descreva o Ocorrido</Text>
					<Text strong>
						Um homem estranho entrou na escola armado
					</Text>
				</div>
			</CardInfo>

			<Alert
				style={{ width: 350 }}
				message={"Alerta Enviado!"}
				description={
					"Seu alerta foi enviado com sucesso, a ajuda já está a caminho"
				}
				type="success"
			/>

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
		</div>
	);
}

export default OccurrenceResumePage;
