import { Button, Table } from "antd";
import styles from "./styles.module.scss";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { useCallback, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEraseConfirmModal } from "@web/components/EraseConfirmModal/hooks";
import EraseConfirmModal from "@web/components/EraseConfirmModal";
import Cop from "@models/Cop";
import { useCops, useEraseCop, useFetchCops } from "@web/contexts/cop/hooks";
import View from "@web/components/base/View";
import { useNavigate } from "react-router-dom";

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
		render: (_: string, { address }: Cop) => {
			return `${address.publicArea}, ${address.district}, ${address.location}`;
		},
	},
	{
		title: "Nome do Responsável",
		dataIndex: "responsible_name",
		key: "responsible_name",
		render: (_: string, { responsible }: Cop) => {
			return responsible?.name;
		},
	},
	{
		title: "Ações",
		dataIndex: "actions",
		key: "actions",
		render: (_: string, data: Cop) => {
			return <></>;
		},
	},
];

function ListCops() {
	const fetch = useFetchCops();
	const data = useCops();
	const erase = useEraseCop();
	const eraseConfirmModalRef = useEraseConfirmModal();
	const navigate = useNavigate();

	const actionButtons = useCallback((_: string, data: Cop) => {
		return (
			<div
				style={{
					display: "flex",
					gap: ".4rem",
				}}
			>
				<Button
					type="primary"
					onClick={() =>
						navigate(`/admin/editar-central/${data.id}`)
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
		if (!data && !!fetch) {
			fetch();
		}
	}, []);

	return (
		<View
			rightButton={
				<Button
					size="large"
					className={styles.addButton}
					onClick={() => navigate("/admin/criar-central")}
				>
					<AiOutlinePlus size={20} />
					Adicionar
				</Button>
			}
		>
			<Table
				columns={tableColumns}
				dataSource={data?.results}
				pagination={{
					pageSize: data?.limit,
					total: data?.count,
					// onChange: (page) => TODO: finalizar onChange da paginação
				}}
			/>
			<EraseConfirmModal
				title="Deletar central"
				handleOk={erase}
				ref={eraseConfirmModalRef}
			/>
		</View>
	);
}

export default ListCops;
