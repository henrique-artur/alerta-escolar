import { Button, Table } from "antd";
import styles from "./styles.module.scss";
import { AiOutlineInfoCircle, AiOutlinePlus } from "react-icons/ai";
import CreateUserModal from "@web/components/CreateUserModal";
import { useCreateUserModal } from "@web/components/CreateUserModal/hooks";
import {
	useCreateUser,
	useEraseUser,
	useFetchUsers,
	useUsers,
} from "@web/contexts/users/hooks";
import { useCallback, useEffect } from "react";
import { Account } from "@models/auth";
import { RiDeleteBin6Line } from "react-icons/ri";

const tableColumns = [
	{
		title: "Nome",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "Função",
		dataIndex: "role",
		key: "role",
		render: (_: string, { role }: Account) => {
			if (role) return role[0]?.name;
		},
	},
	{
		title: "E-mail",
		dataIndex: "email",
		key: "email",
	},
	{
		title: "Telefone",
		dataIndex: "phone",
		key: "phone",
	},
	{
		title: "Whatsapp",
		dataIndex: "whatsapp",
		key: "whatsapp",
	},
	{
		title: "Ações",
		dataIndex: "actions",
		key: "actions",
		render: (_: string, data: Account) => {
			return <></>;
		},
	},
];

function ListUsers() {
	const createUserModalRef = useCreateUserModal();
	const fetchUsers = useFetchUsers();
	const data = useUsers();
	const erase = useEraseUser();
	const create = useCreateUser();

	const actionButtons = useCallback((_: string, { id }: Account) => {
		return (
			<div
				style={{
					display: "flex",
					gap: ".4rem",
				}}
			>
				<Button>
					<AiOutlineInfoCircle size={20} />
				</Button>
				<Button danger type="primary" onClick={() => erase(id)}>
					<RiDeleteBin6Line size={20} />
				</Button>
			</div>
		);
	}, []);

	tableColumns.find((item) => item.key === "actions")!.render = actionButtons;

	useEffect(() => {
		if (!data && !!fetchUsers) {
			fetchUsers();
		}
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.headerContainer}>
				<h3>Listar Usuários</h3>
				<Button
					size="large"
					className={styles.addButton}
					onClick={() => createUserModalRef.current.open()}
				>
					<AiOutlinePlus size={20} />
					Adicionar
				</Button>
			</div>
			<Table
				columns={tableColumns}
				dataSource={data?.results}
				pagination={{
					pageSize: data?.limit,
					total: data?.count,
					// onChange: (page) => TODO: finalizar onChange da paginação
				}}
			/>
			<CreateUserModal
				title="Criar Usuário"
				handleOk={create}
				ref={createUserModalRef}
			/>
		</div>
	);
}

export default ListUsers;
