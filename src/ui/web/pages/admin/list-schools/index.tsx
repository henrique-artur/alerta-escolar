import { Button, Table } from "antd";
import styles from "./styles.module.scss";
import {
	AiOutlineEdit,
	AiOutlineInfoCircle,
	AiOutlinePlus,
} from "react-icons/ai";
import { useCallback, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import School from "@models/School";
import {
	useCreateSchool,
	useEraseSchool,
	useFetchSchools,
	useSchools,
	useUpdateSchool,
} from "@web/contexts/school/hooks";
import CreateSchoolModal from "@web/components/CreateSchoolModal";
import { useCreateSchoolModal } from "@web/components/CreateSchoolModal/hooks";
import { useEraseConfirmModal } from "@web/components/EraseConfirmModal/hooks";
import EraseConfirmModal from "@web/components/EraseConfirmModal";

const tableColumns = [
	{
		title: "Nome",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "Endereço",
		dataIndex: "address",
		key: "address",
	},
	{
		title: "Nome do Responsável",
		dataIndex: "responsible_name",
		key: "responsible_name",
		render: (_: string, { responsible }: School) => {
			return responsible?.name;
		},
	},
	{
		title: "Ações",
		dataIndex: "actions",
		key: "actions",
		render: (_: string, data: School) => {
			return <></>;
		},
	},
];

function ListSchools() {
	const createSchoolModalRef = useCreateSchoolModal();
	const fetchSchools = useFetchSchools();
	const data = useSchools();
	const createSchool = useCreateSchool();
	const editSchool = useUpdateSchool();
	const eraseSchool = useEraseSchool();
	const eraseConfirmModalRef = useEraseConfirmModal();

	const actionButtons = useCallback((_: string, data: School) => {
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
				<Button
					type="primary"
					onClick={() =>
						createSchoolModalRef.current.open(editSchool, data)
					}
				>
					<AiOutlineEdit size={20} />
				</Button>
				<Button
					danger
					type="primary"
					onClick={() => eraseConfirmModalRef.current.open(data.id)}
				>
					<RiDeleteBin6Line size={20} />
				</Button>
			</div>
		);
	}, []);

	tableColumns.find((item) => item.key === "actions")!.render = actionButtons;

	useEffect(() => {
		if (!data && !!fetchSchools) {
			fetchSchools();
		}
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.headerContainer}>
				<h3>Listar Escolas</h3>
				<Button
					size="large"
					className={styles.addButton}
					onClick={() =>
						createSchoolModalRef.current.open(createSchool)
					}
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
			<CreateSchoolModal ref={createSchoolModalRef} />
			<EraseConfirmModal
				title="Deletar Escola"
				handleOk={eraseSchool}
				ref={eraseConfirmModalRef}
			/>
		</div>
	);
}

export default ListSchools;
