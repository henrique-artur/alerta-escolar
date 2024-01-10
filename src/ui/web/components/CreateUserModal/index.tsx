import { Account } from "@models/auth";
import { Model } from "@models/model";
import { useCops, useFetchCops } from "@web/contexts/cop/hooks";
import { useFetchRoles, useRoles } from "@web/contexts/resources/hooks";
import { useFetchSchools, useSchools } from "@web/contexts/school/hooks";
import { Col, Form, Input, Modal, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import {
	ForwardedRef,
	KeyboardEvent,
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useState,
} from "react";

type callbackFn<T extends Model> = (data: T) => Promise<boolean>;

export interface CreateUsersModalHandlers {
	open: (data?: Account) => void;
}

interface Props {
	handleCreate: callbackFn<Account>;
	handleEdit: callbackFn<Account>;
}

const FIELD_PATHS = [
	"full_name",
	"email",
	"roles",
	"password",
	"schools",
	"cops",
	"phone",
	"whatsapp",
];

function CreateUsersModal(
	{ handleCreate, handleEdit }: Props,
	ref: ForwardedRef<CreateUsersModalHandlers>
) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [ID, setID] = useState<string>();
	const [roleSelected, setRoleSelected] = useState<string>();
	const [schoolSelected, setSchoolSelected] = useState<string>();
	const [copsSelected, setCopsSelected] = useState<string>();
	const [formRef] = useForm();
	const fetchRoles = useFetchRoles();
	const roles = useRoles();
	const scholls = useSchools();
	const fetchSchools = useFetchSchools();
	const fetchCops = useFetchCops();
	const cops = useCops();

	useEffect(() => {
		if (!roles && !!fetchRoles) {
			fetchRoles();
		}

		if (!scholls && !!fetchSchools) {
			fetchSchools();
		}

		if (!cops && !!fetchCops) {
			fetchCops();
		}
	}, []);

	useImperativeHandle(ref, () => ({
		open,
	}));

	const open = useCallback((data?: Account) => {
		if (data) {
			formRef.setFieldValue("full_name", data.name);
			formRef.setFieldValue("email", data.email);
			formRef.setFieldValue("roles", data.role[0].id);
			setRoleSelected(data.role[0].id);
			if (data.role[0].code === "TEACHER")
				formRef.setFieldValue("schools", data?.school[0]?.id);
			if (data.role[0].code === "AGENT")
				formRef.setFieldValue("cops", data?.cops[0].id);
			formRef.setFieldValue("phone", data.phone);
			formRef.setFieldValue("whatsapp", data.whatsapp);
			setID(data.id);
		}
		setIsModalOpen(true);
	}, []);

	const handleOk = useMemo(() => {
		if (ID) return handleEdit;
		else return handleCreate;
	}, [ID]);

	const onClose = useCallback(() => {
		setRoleSelected(undefined);
		formRef.resetFields();
		setID(undefined);
		setSchoolSelected(undefined);
		setCopsSelected(undefined);
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
			const isOK = await handleOk(
				Account.fromForm({ ...validate, id: ID })
			);
			if (isOK) return onClose();
		}
	}, [ID]);

	const handleRoleSelect = useCallback((value: string) => {
		setRoleSelected(value);
	}, []);

	const handleSchoolSelect = useCallback((value: string) => {
		setSchoolSelected(value);
	}, []);

	const handleCopsSelect = useCallback((value: string) => {
		setCopsSelected(value);
	}, []);

	const handlePhone = useCallback(
		(event: KeyboardEvent<HTMLInputElement>) => {
			let input = event.currentTarget;
			input.value = phoneMask(input.value);
		},
		[]
	);

	const phoneMask = useCallback((value: string) => {
		return (
			value
				?.replace(/\D/g, "")
				.replace(/(\d{2})(\d)/, "($1) $2")
				.replace(/(\d{5})(\d)/, "$1-$2")
				.replace(/(-\d{4})\d+?$/, "$1") ?? ""
		);
	}, []);

	const showSelectByRoleSelected = useMemo(() => {
		const roleCodeSelected = roles?.results
			.find((item) => item.id === roleSelected)
			?.code.toUpperCase();
		switch (roleCodeSelected) {
			case "TEACHER":
				return (
					<Col span={24}>
						<Form.Item
							label="Escola"
							name="schools"
							required
							rules={[
								{
									required: true,
									message: "Atribua uma escola ao usuário",
								},
							]}
						>
							<Select
								onSelect={handleSchoolSelect}
								defaultActiveFirstOption={false}
								value={schoolSelected}
								options={scholls?.results.map((item) => ({
									label: item.name,
									value: item.id,
								}))}
							/>
						</Form.Item>
					</Col>
				);
			case "AGENT":
				return (
					<Col span={24}>
						<Form.Item
							label="Delegacia"
							name="cops"
							required
							rules={[
								{
									required: true,
									message: "Atribua uma delegacia ao usuário",
								},
							]}
						>
							<Select
								onSelect={handleCopsSelect}
								defaultActiveFirstOption={false}
								value={copsSelected}
								options={cops?.results.map((item) => ({
									label: item.name,
									value: item.id,
								}))}
							/>
						</Form.Item>
					</Col>
				);
			default:
				return undefined;
		}
	}, [roleSelected, roles, scholls, cops]);

	return (
		<Modal
			width={700}
			title={ID ? "Editar Usuário" : "Criar Usuário"}
			open={isModalOpen}
			onOk={onOk}
			onCancel={onClose}
			cancelText={"Cancelar"}
			okText={ID ? "Editar" : "Criar"}
		>
			<Form form={formRef} layout="vertical" autoComplete="off">
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item
							label="Nome"
							name="full_name"
							required
							rules={[
								{
									required: true,
									message: "Digite um nome válido",
								},
							]}
						>
							<Input type="text" name="user_full_name" />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item
							label="E-mail"
							name="email"
							required
							rules={[
								{
									required: true,
									message: "Digite um e-mail válido",
								},
								{
									type: "email",
									message: "Digite um e-mail válido",
								},
							]}
						>
							<Input type="email" name="user_email" />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							label="Função"
							name="roles"
							required
							rules={[
								{
									required: true,
									message: "Atribua uma função ao usuário",
								},
							]}
						>
							<Select
								onSelect={handleRoleSelect}
								defaultActiveFirstOption={false}
								value={roleSelected}
								options={roles?.results.map((item) => ({
									label: item.name,
									value: item.id,
								}))}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item
							required
							rules={[
								{
									required: true,
									message:
										"Digite um número de telefone válido",
								},
							]}
							name="phone"
							label="Telefone"
						>
							<Input
								type="phone"
								onKeyUp={handlePhone}
								name="user_phone"
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							required
							rules={[
								{
									required: true,
									message:
										"Digite um número de whatsapp válido",
								},
							]}
							name="whatsapp"
							label="Whatsapp"
						>
							<Input
								type="phone"
								onKeyUp={handlePhone}
								name="user_whatsapp"
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>{showSelectByRoleSelected}</Row>
				{!ID && (
					<Form.Item
						label="Senha"
						name="password"
						required
						rules={[
							{
								required: true,
								message: "Digite uma senha válida",
							},
							{
								min: 8,
								message: "Digite ao menos 8 caracteres",
							},
						]}
					>
						<Input.Password name="user_password" />
					</Form.Item>
				)}
			</Form>
		</Modal>
	);
}

export default forwardRef(CreateUsersModal);
