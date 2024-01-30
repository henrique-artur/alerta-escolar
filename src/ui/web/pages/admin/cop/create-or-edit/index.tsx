import Address from "@models/Address";
import Cop from "@models/Cop";
import Map from "@web/components/Map";
import { markerIcon } from "@web/components/MarkerIcon";
import View from "@web/components/base/View";
import {
	useCreateCop,
	useFindCopByID,
	useUpdateCop,
} from "@web/contexts/cop/hooks";
import {
	useCounties,
	useFetchCounties,
	useGetAddressByZipCode,
} from "@web/contexts/resources/hooks";
import { useFetchUsers, useUsers } from "@web/contexts/users/hooks";
import { Button, Col, Form, Input, Row, Select, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import {
	ChangeEvent,
	KeyboardEvent,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { Marker, useMapEvents } from "react-leaflet";
import { useNavigate, useParams } from "react-router-dom";

function CreateOrEditCopPage() {
	const responsibles = useUsers();
	const fetchResponsibles = useFetchUsers();
	const updateSchool = useUpdateCop();
	const createSchool = useCreateCop();
	const findCopByID = useFindCopByID();
	const getAddressByZipCode = useGetAddressByZipCode();
	const fetchCounties = useFetchCounties();
	const counties = useCounties();
	const navigate = useNavigate();
	const [formRef] = useForm();
	const { copID } = useParams();

	const [responsibleSelected, setResponsibleSelected] = useState<string>();
	const [countieSelected, setCountieSelected] = useState<string>();
	const [position, setPosition] = useState<any>();
	const [address, setAddress] = useState<Address>();

	const { Text } = Typography;

	useEffect(() => {
		if (!responsibles && !!fetchResponsibles) {
			fetchResponsibles();
		}

		if (!counties && !!fetchCounties) {
			fetchCounties();
		}
	}, []);

	useEffect(() => {
		if (copID && !!findCopByID) {
			findCopByID(copID).then((result) => {
				formRef.setFieldValue("name", result?.name);
				formRef.setFieldValue("responsible", result?.responsible.id);
				formRef.setFieldValue("zipCode", result?.address.zipCode);
				formRef.setFieldValue(
					"publicArea",
					result?.address?.publicArea
				);
				formRef.setFieldValue("district", result?.address?.district);
				formRef.setFieldValue("countie", result?.countie?.id);
				const position = result?.geolocation.split(", ");
				setAddress(result?.address);
				setPosition({ lat: position![0], lng: position![1] });
			});
		}
	}, [copID]);

	const handleOk = useMemo(() => {
		if (copID) return updateSchool;
		return createSchool;
	}, [copID]);

	const handleConfirm = useCallback(
		async (values: Record<string, unknown>) => {
			const isOk = await handleOk(
				Cop.fromForm({
					...values,
					address: {
						...address?.toJSON(),
						publicArea: values["publicArea"],
					},
					geolocation: Object.values(position)
						.map((value) => value)
						.join(", "),
					id: copID,
				})
			);
			if (isOk) navigate("/admin/listar-centrais");
		},
		[copID, address, position]
	);

	const LocationMarker = useCallback(() => {
		const map = useMapEvents({
			click(e) {
				setPosition(e.latlng);
				map.flyTo(e.latlng, 15);
			},
		});

		return position === undefined ? undefined : (
			<Marker icon={markerIcon} position={position}></Marker>
		);
	}, [position]);

	const putZipCodeMaks = useCallback(
		(event: KeyboardEvent<HTMLInputElement>) => {
			let value = event.currentTarget.value;
			if (!value) return;
			event.currentTarget.value = value.replace(/\D/g, "");
			event.currentTarget.value = value.replace(/(\d{5})(\d)/, "$1-$2");
		},
		[]
	);

	const handleSearchCEP = useCallback(
		async (event: ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;

			if (value?.length === 9) {
				const address = await getAddressByZipCode(value);
				formRef.setFieldValue("publicArea", address?.publicArea);
				formRef.setFieldValue("district", address?.district);
				const countieID = counties?.find(
					(item) => item.name === address?.location
				)?.id;
				formRef.setFieldValue("countie", countieID);
				setAddress(address);
			}
		},
		[counties]
	);

	const handleResponsibleSelect = useCallback((value: string) => {
		setResponsibleSelected(value);
	}, []);

	const handleCountieSelect = useCallback((value: string) => {
		setCountieSelected(value);
	}, []);

	return (
		<View showBackButton>
			<Form
				form={formRef}
				onFinish={handleConfirm}
				layout="vertical"
				autoComplete="off"
			>
				<Row gutter={16}>
					<Col span={16}>
						<Form.Item
							label="Nome da central"
							name="name"
							required
							rules={[
								{
									required: true,
									message: "Digite um nome válido",
								},
							]}
						>
							<Input type="text" name="cop_name" />
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							label="Responsável"
							name="responsible"
							required
							rules={[
								{
									required: true,
									message:
										"Atribua um responsável à central",
								},
							]}
						>
							<Select
								onSelect={handleResponsibleSelect}
								defaultActiveFirstOption={false}
								value={responsibleSelected}
								options={responsibles?.results.map((item) => ({
									label: item.name,
									value: item.id,
								}))}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={8}>
						<Form.Item
							label="CEP"
							name="zipCode"
							required
							rules={[
								{
									required: true,
									message: "Digite um CEP válido",
								},
								{
									len: 9,
									message:
										"Digite o código no formato: xxxxx-xxx",
								},
							]}
						>
							<Input
								type="text"
								name="zipcode"
								placeholder="10000-000"
								maxLength={9}
								onKeyUp={putZipCodeMaks}
								onChange={handleSearchCEP}
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							label="Logradouro"
							name="publicArea"
							required
							rules={[
								{
									required: true,
									message: "Digite um Logradouro válido",
								},
							]}
						>
							<Input
								type="text"
								name="public_area"
								placeholder="Rua São João, 230"
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							label="Bairro"
							name="district"
							required
							rules={[
								{
									required: true,
									message: "Digite um Bairro válido",
								},
							]}
						>
							<Input
								type="text"
								name="district"
								placeholder="Bom Jardim"
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							label="Cidade"
							name="countie"
							required
							rules={[
								{
									required: true,
									message: "Selecione uma cidade válida",
								},
							]}
						>
							<Select
								defaultActiveFirstOption={false}
								onSelect={handleCountieSelect}
								value={countieSelected}
								options={counties?.map((item) => ({
									label: item.name,
									value: item.id,
								}))}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={24}>
						<Text style={{ color: "red" }}>*</Text>{" "}
						<Text>Selecione a localização no mapa</Text>
						<Map>
							<LocationMarker />
						</Map>
					</Col>
				</Row>
				<Row gutter={16} align={"bottom"} justify={"end"}>
					<Form.Item>
						<Button
							style={{
								marginTop: "1rem",
							}}
							type="primary"
							htmlType="submit"
							size="large"
						>
							{copID ? "Editar" : "Criar"}
						</Button>
					</Form.Item>
				</Row>
			</Form>
		</View>
	);
}

export default CreateOrEditCopPage;
