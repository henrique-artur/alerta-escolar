import { NavigationBranch } from "../types";
import { AiOutlineUnorderedList } from "react-icons/ai";
import ListAlertPage from "@web/pages/agent/alert/list";
import AlertDetailsPage from "@web/pages/agent/alert/details";

export const routes: NavigationBranch = {
	redirectPath: "/agente/listagem-alertas",
	groups: [
		{
			name: "",
			routes: [
				{
					name: "Listagem de Alertas",
					path: "/agente/listagem-alertas",
					page: ListAlertPage,
					icon: AiOutlineUnorderedList({ size: 22 }),
				},
				{
					name: "Detalhes do Alerta",
					path: "/agente/detalhes-alerta/:id",
					page: () => AlertDetailsPage({}),
					icon: AiOutlineUnorderedList({ size: 22 }),
					hidden: true,
				},
			],
		},
	],
};
