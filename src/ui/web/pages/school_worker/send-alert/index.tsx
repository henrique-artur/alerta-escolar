import { Button, Form, Input, Select, Typography } from "antd";
import imgLogo from "assets/images/alerta-escolar-logo.svg";
import radsLogo from "assets/images/rads-logo.svg";
import delmiroGouveiaLogo from "assets/images/delmiro-gouveia-logo.svg";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import CardInfo from "@web/components/CardInfo";
import { useCallback } from "react";

function SendAlertPage() {
	const { Text } = Typography;
	const navigate = useNavigate();

	const onFinish = useCallback(() => {
		navigate("/professor/occurrence-resume");
	}, []);

	return (
		<div className={styles.container}>
			<img className={styles.appLogo} src={imgLogo} alt="Logo do app" />
			<CardInfo title={"Informações da Escola"}>
				<div className={styles.infoBox}>
					<Text>Escola</Text>
					<Text strong>CEI ADÉLIA RUSSI SILVA</Text>
				</div>
			</CardInfo>

			<Form
				layout="vertical"
				size="large"
				className={styles.occurrenceForm}
				onFinish={onFinish}
			>
				<Form.Item
					className={styles.formItem}
					label={"Qual o Motivo da Ocorrência?"}
				>
					<Select
						className={styles.inputBorderColor}
						size="large"
						defaultValue={"OCCORRENCI_01"}
						options={[
							{
								label: "Invasão",
								value: "OCCORRENCI_01",
							},
							{
								label: "Incêndio",
								value: "OCCORRENCI_02",
							},
							{
								label: "Briga",
								value: "OCCORRENCI_03",
							},
						]}
					/>
				</Form.Item>
				<Form.Item
					className={styles.formItem}
					colon
					label="Descreva o Ocorrido"
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
		</div>
	);
}

export default SendAlertPage;
