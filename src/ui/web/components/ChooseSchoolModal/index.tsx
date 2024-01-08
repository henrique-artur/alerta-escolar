import { usePanic } from "@web/contexts/auth/hooks";
import { useChooseSchool } from "@web/contexts/panicButton/hooks";
import { useFetchSchools, useSchools } from "@web/contexts/school/hooks";
import { Modal, Select, Typography } from "antd";
import {
	ForwardedRef,
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useState,
} from "react";

export interface ChooseSchoolModalHandlers {
	open(): void;
}

function ModalFilter({}, ref: ForwardedRef<ChooseSchoolModalHandlers>) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [schoolSelected, setSchoolSelected] = useState<string>();
	const fetchSchools = useFetchSchools();
	const schools = useSchools();
	const chooseSchool = useChooseSchool();
	const panic = usePanic();

	const open = useCallback(() => {
		setIsModalOpen(true);
	}, []);

	useImperativeHandle(ref, () => ({ open }));

	useEffect(() => {
		if (!schools && !!fetchSchools) {
			fetchSchools();
		}
	}, [schools]);

	const onClose = useCallback(() => {
		setIsModalOpen(false);
		setSchoolSelected(undefined);
	}, []);

	const onOk = useCallback(() => {
		if (schoolSelected) {
			chooseSchool(schoolSelected);
			setIsModalOpen(false);
		} else {
			panic("Escolha uma escola para monitorar.");
		}
	}, [schoolSelected]);

	const handleSelectedSchool = useCallback(
		(value: string) => setSchoolSelected(value),
		[]
	);

	const { Text } = Typography;

	return (
		<Modal
			width={500}
			title={"Escolher Escola"}
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
				<Text>Selecione uma Escola</Text>
				<Select
					onSelect={handleSelectedSchool}
					defaultValue={schoolSelected}
					options={schools?.results.map((item) => ({
						label: item.name,
						value: item.id,
					}))}
				/>
			</div>
		</Modal>
	);
}

export default forwardRef(ModalFilter);
