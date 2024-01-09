import { usePanic } from "@web/contexts/auth/hooks";
import { useChooseCountie } from "@web/contexts/panicButton/hooks";
import { useCounties, useFetchCounties } from "@web/contexts/resources/hooks";
import { Modal, Select, Typography } from "antd";
import {
	ForwardedRef,
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useState,
} from "react";

export interface ChooseCityModalHandlers {
	open(): void;
}

function ChooseCityModal({}, ref: ForwardedRef<ChooseCityModalHandlers>) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [citySelected, setCitySelected] = useState<string>();
	const fetchCities = useFetchCounties();
	const cities = useCounties();
	const chooseCountie = useChooseCountie();
	const panic = usePanic();

	const open = useCallback(() => {
		setIsModalOpen(true);
	}, []);

	useImperativeHandle(ref, () => ({ open }));

	useEffect(() => {
		if (!cities && !!fetchCities) {
			fetchCities();
		}
	}, [cities]);

	const onClose = useCallback(() => {
		setIsModalOpen(false);
		setCitySelected(undefined);
	}, []);

	const onOk = useCallback(() => {
		if (citySelected) {
			chooseCountie(citySelected);
			setIsModalOpen(false);
		} else {
			panic("Escolha uma área de cobertura para monitorar.");
		}
	}, [citySelected]);

	const handleSelectedCity = useCallback(
		(value: string) => setCitySelected(value),
		[]
	);

	const { Text } = Typography;

	return (
		<Modal
			width={500}
			title={"Escolher Área de Cobertura"}
			open={isModalOpen}
			onOk={onOk}
			onCancel={onClose}
			cancelText="Cancelar"
			okText="Escolher"
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Text>Selecione um Município</Text>
				<Select
					onSelect={handleSelectedCity}
					defaultValue={citySelected}
					options={cities?.map((item) => ({
						label: item.name,
						value: item.id,
					}))}
				/>
			</div>
		</Modal>
	);
}

export default forwardRef(ChooseCityModal);
