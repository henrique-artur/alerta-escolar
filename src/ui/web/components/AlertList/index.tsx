import { Button, Table, Tooltip } from "antd";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useCallback, useEffect } from "react";
import {
	useAlerts,
	useFetchAlert,
	useUpdateResponsibleAlert,
} from "@web/contexts/panicButton/hooks";
import Alert from "@models/Alert";
import { ALERT_STATUS } from "@utils/alertStatus";
import { FaRegHandPointer } from "react-icons/fa";
import { useAccount } from "@web/contexts/auth/hooks";
import { IoCheckboxOutline } from "react-icons/io5";
import { useModalconcludedAlert } from "../ModalConcludedAlert/hooks";
import ModalConcludedAlert from "../ModalConcludedAlert";

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
		key: "address",
		render: (_: string, { school }: Alert) => {
			return school.address.completeAddres();
		},
	},
	{
		title: "Nome do Responsável",
		key: "responsible_name",
		render: (_: string, { responsible }: Alert) => {
			return responsible?.name ?? "Responsável não Atribuído";
		},
	},
	{
		title: "Status",
		key: "status",
		render: (_: string, { status }: Alert) => {
			return ALERT_STATUS.find((item) => item.value === status)?.label;
		},
	},
	{
		title: "Criado Em",
		dataIndex: "createdAt",
	},
	{
		title: "Ações",
		key: "actions",
		render: (_: string, data: Alert) => {
			return <></>;
		},
	},
];

interface Props {
	detailsOnClick: (id: string) => void;
}

function AlertList({ detailsOnClick }: Props) {
	const fetch = useFetchAlert();
	const data = useAlerts();
	const getAlert = useUpdateResponsibleAlert();
	const modalConcludedAlertRef = useModalconcludedAlert();
	const account = useAccount();

	const actionButtons = useCallback(
		(_: string, data: Alert) => {
			return (
				<div
					key={data.id}
					style={{
						display: "flex",
						gap: ".4rem",
					}}
				>
					<Tooltip title="Ver Mais">
						<Button>
							<AiOutlineInfoCircle
								size={20}
								onClick={() => detailsOnClick(data.id)}
							/>
						</Button>
					</Tooltip>
					{!data.responsible?.id && (
						<Tooltip title="Pegar Alerta">
							<Button type="primary">
								<FaRegHandPointer
									size={20}
									onClick={async () => {
										await getAlert(
											Alert.fromForm({
												id: data.id,
												responsible: account?.id,
												status: "ajuda_caminho",
											})
										);
										detailsOnClick(data.id);
									}}
								/>
							</Button>
						</Tooltip>
					)}

					{data.responsible?.id && !data.problemSolving && (
						<Tooltip title="Finalizar Alerta">
							<Button
								type="primary"
								style={{
									backgroundColor: "#32cd32",
								}}
							>
								<IoCheckboxOutline
									size={20}
									onClick={() =>
										modalConcludedAlertRef.current.open(
											data.id
										)
									}
								/>
							</Button>
						</Tooltip>
					)}
				</div>
			);
		},
		[account]
	);

	tableColumns.find((item) => item.key === "actions")!.render = actionButtons;

	useEffect(() => {
		if (!!fetch) {
			fetch();
		}
	}, []);

	return (
		<>
			<Table
				columns={tableColumns}
				dataSource={data?.results}
				pagination={{
					pageSize: data?.limit,
					total: data?.count,
					onChange(page, pageSize) {
						const virtualPage =
							(page - 1) * pageSize <= 0
								? 0
								: (page - 1) * pageSize;
						fetch({ limit: pageSize, offset: virtualPage });
					},
				}}
				loading={data === undefined}
			/>
			<ModalConcludedAlert ref={modalConcludedAlertRef} />
		</>
	);
}

export default AlertList;
