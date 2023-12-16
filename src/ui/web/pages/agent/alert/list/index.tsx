import { Button, Table } from "antd";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useCallback, useEffect } from "react";
import View from "@web/components/base/View";
import { useNavigate } from "react-router-dom";
import { useAlerts, useFetchAlert } from "@web/contexts/panicButton/hooks";
import Alert from "@models/Alert";

const tableColumns = [
	{
		title: "Nome da Escola",
		key: "school_name",
		render: (_: string, { school }: Alert) => {
			return school.name;
		},
	},
	{
		title: "Endereço",
		dataIndex: "address",
		key: "address",
		render: (_: string, { school }: Alert) => {
			return school.address.completeAddres();
		},
	},
	{
		title: "Nome do Responsável",
		dataIndex: "responsible_name",
		key: "responsible_name",
		render: (_: string, { responsible }: Alert) => {
			return responsible?.name ?? "Responsável não Atribuído";
		},
	},
	{
		title: "Ações",
		dataIndex: "actions",
		key: "actions",
		render: (_: string, data: Alert) => {
			return <></>;
		},
	},
];

function ListAlertPage() {
	const fetch = useFetchAlert();
	const data = useAlerts();
	const navigate = useNavigate();

	const actionButtons = useCallback((_: string, data: Alert) => {
		return (
			<div
				key={data.id}
				style={{
					display: "flex",
					gap: ".4rem",
				}}
			>
				<Button>
					<AiOutlineInfoCircle
						size={20}
						onClick={() =>
							navigate(`/agente/detalhes-alerta/${data.id}`)
						}
					/>
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
		<View>
			<Table
				columns={tableColumns}
				dataSource={data?.results}
				pagination={{
					pageSize: data?.limit,
					total: data?.count,
					// onChange: (page) => TODO: finalizar onChange da paginação
				}}
			/>
		</View>
	);
}

export default ListAlertPage;
