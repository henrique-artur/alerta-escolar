import { Account } from "@models/auth";
import { DTO } from "@typing/http";
import { Col, Form, Input, Modal, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import {
	ForwardedRef,
	forwardRef,
	useCallback,
	useImperativeHandle,
	useState,
} from "react";

interface Props {
	title: string;
	handleOk: (data: DTO) => Promise<boolean>;
}

export interface CreateUsersModalHandlers {
	open: () => void;
}

const FIELD_PATHS = [
	"name",
	"last_name",
	"email",
	"roles",
	"password",
	"schools",
	"cops",
	"phone",
	"whatsapp",
];

function CreateUsersModal(
	{ title, handleOk }: Props,
	ref: ForwardedRef<CreateUsersModalHandlers>
) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [roleSelected, setRoleSelected] = useState<string>();
	const [formRef] = useForm();

	useImperativeHandle(ref, () => ({
		open,
	}));

	const open = useCallback(() => {
		setIsModalOpen(true);
	}, []);

	const onClose = useCallback(() => {
		setRoleSelected(undefined);
		formRef.resetFields(FIELD_PATHS);
		setIsModalOpen(false);
	}, [formRef]);

	const validateFields = useCallback(async () => {
		return formRef
			.validateFields(FIELD_PATHS)
			.then((response) => {
				return response as Record<string, unknown>;
			})
			.catch((_) => undefined);
	}, [formRef]);

	const onOk = useCallback(async () => {
		const validate = await validateFields();
		if (validate !== undefined) {
			const isOK = await handleOk(Account.fromForm(validate));
			if (isOK) return onClose();
		}
	}, [formRef]);

	const handleSelect = useCallback((value: string) => {
		setRoleSelected(value);
	}, []);

	return (
		<Modal
			width={700}
			title={title}
			open={isModalOpen}
			onOk={onOk}
			onCancel={onClose}
		>
			<Form form={formRef} layout="vertical">
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item
							label="Nome"
							name="name"
							required
							rules={[
								{
									required: true,
									message: "Digite um nome válido",
								},
							]}
						>
							<Input type="text" name="user_first_name" />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							label="Sobrenome"
							name="last_name"
							required
							rules={[
								{
									required: true,
									message: "Digite um sobrenome válido",
								},
							]}
						>
							<Input type="text" name="user_last_name" />
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
								onSelect={handleSelect}
								defaultActiveFirstOption={false}
								value={roleSelected}
								options={[
									{
										label: "Professor",
										value: "8ca0fa8a-5347-4e0f-84ca-7775ebd03d50",
									},
									{
										label: "Agente",
										value: "96975b07-457b-4814-a1d1-f8801de65270",
									},
									{
										label: "Administrador",
										value: "9008a2d6-6526-4b82-adae-1f92ffef66fe",
									},
								]}
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
							<Input type="phone" name="user_phone" />
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
							<Input type="phone" name="user_whatsapp" />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					{roleSelected === "role-1" && (
						<Col span={24}>
							<Form.Item
								label="Escola"
								name="schools"
								required
								rules={[
									{
										required: true,
										message:
											"Atribua uma escola ao usuário",
									},
								]}
							>
								<Select
									options={[
										{ label: "Escola 1", value: "1" },
										{ label: "Escola 2", value: "2" },
										{ label: "Escola 3", value: "3" },
									]}
								/>
							</Form.Item>
						</Col>
					)}
					{roleSelected === "role-2" && (
						<Col span={24}>
							<Form.Item
								label="Delegacia"
								name="cops"
								required
								rules={[
									{
										required: true,
										message:
											"Atribua uma delegacia ao usuário",
									},
								]}
							>
								<Select
									options={[
										{ label: "PMAL", value: "1" },
										{ label: "Empresa 1", value: "2" },
										{ label: "Empresa 2", value: "3" },
									]}
								/>
							</Form.Item>
						</Col>
					)}
				</Row>
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
			</Form>
		</Modal>
	);
}

export default forwardRef(CreateUsersModal);
