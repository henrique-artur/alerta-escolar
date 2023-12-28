import View from "@web/components/base/View";
import { Col, Divider, Row, Skeleton, Typography } from "antd";
import styles from "./styles.module.scss";
import { Marker } from "react-leaflet";
import Map from "@web/components/Map";
import { useParams } from "react-router-dom";
import { useGetAlertByID, useLastAlert } from "@web/contexts/panicButton/hooks";
import { useEffect, useMemo, useState } from "react";
import Alert from "@models/Alert";
import { LatLngExpression } from "leaflet";

interface Props {
	isWebsocket?: boolean;
}

function AlertDetailsPage({ isWebsocket = false }: Props) {
	const { Title, Paragraph } = Typography;
	const getAlertByID = useGetAlertByID();
	const lastAlert = useLastAlert();
	const { id } = useParams();
	const [alert, setAlert] = useState<Alert>();

	useEffect(() => {
		if (!!getAlertByID && id) {
			getAlertByID(id).then((response) => response && setAlert(response));
		}

		if (isWebsocket && lastAlert) {
			setAlert(lastAlert);
		}
	}, [id, lastAlert]);

	const geolocation = useMemo(() => {
		return alert?.school.geolocation
			.split(",")
			.map(Number) as LatLngExpression;
	}, [alert]);

	return (
		<View showBackButton>
			{alert ? (
				<>
					<Divider orientation="left" orientationMargin={"3rem"}>
						<Title className={styles.subtopic} level={4}>
							Informações Gerais do Alerta
						</Title>
					</Divider>
					<Row style={{ paddingLeft: "3rem" }} gutter={16}>
						<Col span={6}>
							<Title className={styles.title} level={4}>
								Escola
							</Title>
							<Paragraph>{alert.school.name}</Paragraph>
						</Col>
						<Col span={12}>
							<Title className={styles.title} level={4}>
								Endereço
							</Title>
							<Paragraph>
								{alert.school.address.completeAddres()}
							</Paragraph>
						</Col>
						<Col span={6}>
							<Title className={styles.title} level={4}>
								Professor Solicitante
							</Title>
							<Paragraph>{alert.teacher.name}</Paragraph>
						</Col>
					</Row>

					<Row style={{ paddingLeft: "3rem" }} gutter={16}>
						<Col span={6}>
							<Title className={styles.title} level={4}>
								Telefone do Solicitante
							</Title>
							<Paragraph>{alert.teacher.phone}</Paragraph>
						</Col>
						<Col span={12}>
							<Title className={styles.title} level={4}>
								Tipo de Incidente
							</Title>
							<Paragraph>{alert.typeIncident?.code}</Paragraph>
						</Col>
					</Row>

					{alert.description?.length! > 1 && (
						<Row style={{ paddingLeft: "3rem" }} gutter={16}>
							<Col span={12}>
								<Title className={styles.title} level={4}>
									Descrição do Incidente
								</Title>
								<Paragraph>{alert.description}</Paragraph>
							</Col>
						</Row>
					)}

					<Divider orientation="left" orientationMargin={"3rem"}>
						<Title className={styles.subtopic} level={4}>
							Geolocalização da Escola
						</Title>
					</Divider>

					<Row
						gutter={16}
						style={{
							paddingLeft: "3rem",
							paddingTop: "1rem",
						}}
					>
						<Col span={24}>
							<Map center={geolocation} zoom={15}>
								<Marker position={geolocation} />
							</Map>
						</Col>
					</Row>
				</>
			) : (
				<Skeleton active />
			)}
		</View>
	);
}

export default AlertDetailsPage;