import { Button, Typography } from "antd";
import imgLogo from "assets/images/alerta-escolar-logo.svg";
import radsLogo from "assets/images/rads-logo.svg";
import mataGrandeLogo from "assets/images/mata-grande-logo.png";
import styles from "./styles.module.scss";
import { AiFillAlert } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import CardInfo from "@web/components/CardInfo";
import View from "@web/components/base/View";
import { useAccount } from "@web/contexts/auth/hooks";
import { useCallback } from "react";
import { useCreateRoom, usePressPanicButton } from "@web/contexts/panicButton/hooks";
import { Select } from "antd";
import { useState } from "react";

function PanicButtonPage() {
	const { Text, Title } = Typography;
	const navigate = useNavigate();
	const account = useAccount();
	const press = usePressPanicButton();
	const createRoom = useCreateRoom()
	const [schoolSelected, setSchoolSelected] = useState<string | undefined>(account?.school[0].id);

	const pressPanicButton = useCallback(async () => {
		const result = await press(schoolSelected!);
		if (result) {
			createRoom(result.id)
			navigate(`/professor/complemento-alerta/${result.id}`);
		}
	}, [schoolSelected]);

	const handleSchoolSelect = useCallback((value: string)=>{
		setSchoolSelected(value);
	},[]);

	return (
		<View hiddenPageTitle className={styles.container}>
			<img className={styles.appLogo} src={imgLogo} alt="Logo do app" />
			<Select
				style={{ width: "18rem", margin:"1rem" }}
				onSelect={handleSchoolSelect}
				defaultActiveFirstOption={false}
				value={schoolSelected}
				options={account?.school.map((item) => ({
					label: item.name,
					value: item.id,
				}))}
			/>
			{schoolSelected &&(
				<>
					<CardInfo
						title={"Informações da Escola"}
						className={styles.cardContainer}
					>
						<div className={styles.infoBox}>
							<Text>Escola</Text>
							<Text strong>{account?.school.find(school => school.id === schoolSelected)!.name}</Text>
						</div>
						<div className={styles.infoBox}>
							<Text>Endereço</Text>
							<Text strong>
								{account?.school.find(school => school.id === schoolSelected)!.address?.completeAddres()}
							</Text>
						</div>
					</CardInfo>
					<div className={styles.panicArea}>
							<Title level={4}>Em caso de emergência aperte o botão</Title>
							<Button
								onClick={pressPanicButton}
								className={styles.panicButton}
								size="large"
							>
								<AiFillAlert style={{ color: "#fff" }} size={75} />
							</Button>
						</div>
					<footer>
							<img
								style={{ width: 55 }}
								src={radsLogo}
								alt="imagem da logo da rads" />
							<img
								style={{ width: 130 }}
								src={mataGrandeLogo}
								alt="imagem da logo da prefeitura de Delmiro Gouveia" />
					</footer>
				</>
			)}
		</View>
	);
}

export default PanicButtonPage;
