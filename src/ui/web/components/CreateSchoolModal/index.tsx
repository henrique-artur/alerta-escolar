import School from "@models/School";
import { Model } from "@models/model";
import { useFetchUsers, useUsers } from "@web/contexts/users/hooks";
import { Col, Form, Input, Modal, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import {
	ForwardedRef,
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useState,
} from "react";

type callbackFn<T extends Model> = (data: T) => Promise<boolean>;
export interface CreateSchoolModalHandlers {
	open: (callbackFn: callbackFn<School>, data?: School) => void;
}

const FIELD_PATHS = ["name", "address", "responsible"];

function CreateSchoolModal({}, ref: ForwardedRef<CreateSchoolModalHandlers>) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [responsibleSelected, setResponsibleSelected] = useState<string>();
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [handleOk, setHandleOk] = useState<callbackFn<School>>();
	const [formRef] = useForm();
	const fetchResponsible = useFetchUsers();
	const responsibles = useUsers();

	useEffect(() => {
		if (!responsibles && !!fetchResponsible) {
			fetchResponsible();
		}
	}, []);

	useImperativeHandle(ref, () => ({
		open,
	}));

	const open = useCallback(
		(callbackFn: callbackFn<School>, data?: School) => {
			if (data) {
				formRef.setFieldValue("name", data.name);
				formRef.setFieldValue("address", data.address);
				formRef.setFieldValue("responsible", data?.responsible?.id);
				setIsEdit(true);
			}
			setHandleOk(callbackFn);
			setIsModalOpen(true);
		},
		[]
	);

	const onClose = useCallback(() => {
		formRef.resetFields();
		setResponsibleSelected(undefined);
		setIsEdit(false);
		setIsModalOpen(false);
	}, []);

	const validateFields = useCallback(async () => {
		return formRef
			.validateFields(FIELD_PATHS)
			.then((response) => {
				return response as Record<string, unknown>;
			})
			.catch((_) => undefined);
	}, []);

	const onOk = useCallback(async () => {
		const validate = await validateFields();
		if (validate !== undefined) {
			const isOK = await handleOk!(School.fromForm(validate));
			if (isOK) return onClose();
		}
	}, []);

	const handleSelect = useCallback((value: string) => {
		setResponsibleSelected(value);
	}, []);

	return (
		<Modal
			width={700}
			title={isEdit ? "Editar Escola" : "Criar Escola"}
			open={isModalOpen}
			onOk={onOk}
			onCancel={onClose}
			cancelText="Cancelar"
			okText={isEdit ? "Editar" : "Criar"}
		>
			<Form form={formRef} autoComplete="off" layout="vertical">
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item
							label="Nome da Escola"
							name="name"
							required
							rules={[
								{
									required: true,
									message: "Digite um nome válido",
								},
							]}
						>
							<Input type="text" name="school_name" />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							label="Endereço"
							name="address"
							required
							rules={[
								{
									required: true,
									message: "Digite um endereço válido",
								},
							]}
						>
							<Input type="text" name="school_address" />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item
							label="Responsável"
							name="responsible"
							required
							rules={[
								{
									required: true,
									message: "Atribua um responsável à escola",
								},
							]}
						>
							<Select
								onSelect={handleSelect}
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
			</Form>
		</Modal>
	);
}

export default forwardRef(CreateSchoolModal);
