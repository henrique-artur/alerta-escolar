import { Button, Typography } from "antd";
import imgLogo from "assets/images/alerta-escolar-logo.svg";
import radsLogo from "assets/images/rads-logo.svg";
import delmiroGouveiaLogo from "assets/images/delmiro-gouveia-logo.svg";
import styles from "./styles.module.scss";
import { AiFillAlert } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import CardInfo from "@web/components/CardInfo";

function PanicButtonPage() {
	const { Text, Title } = Typography;
	const navigate = useNavigate();

	return (
		<div className={styles.container}>
			<img className={styles.appLogo} src={imgLogo} alt="Logo do app" />
			<CardInfo title={"Informações da Escola"}>
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
			</CardInfo>

			<div className={styles.panicArea}>
				<Title level={4}>Em caso de emergência aperte o botão</Title>
				<Button
					onClick={() => navigate("/professor/enviar-alerta")}
					className={styles.panicButton}
					size="large"
				>
					<AiFillAlert style={{ color: "#fff" }} size={75} />
				</Button>
			</div>

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

export default PanicButtonPage;
