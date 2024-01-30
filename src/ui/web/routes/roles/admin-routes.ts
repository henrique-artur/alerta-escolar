import { AiOutlineUnorderedList, AiTwotoneAlert } from "react-icons/ai";
import { NavigationBranch } from "../types";
import ListUsers from "@web/pages/admin/list-users";
import ListSchools from "@web/pages/admin/school/list";
import ListCops from "@web/pages/admin/cop/list";
import CreateOrEditSchoolPage from "@web/pages/admin/school/create-or-edit";
import CreateOrEditCopPage from "@web/pages/admin/cop/create-or-edit";
import AlertListPage from "@web/pages/admin/alert/list";
import AlertDetailsPage from "@web/pages/agent/alert/details";

export const routes: NavigationBranch = {
	redirectPath: "/admin/listar-usuarios",
	groups: [
		{
			name: "",
			routes: [
				{
					name: "Listar Usuário",
					path: "/admin/listar-usuarios",
					icon: AiOutlineUnorderedList({ size: 22 }),
					page: ListUsers,
				},
				{
					name: "Listar Escolas",
					path: "/admin/listar-escolas",
					icon: AiOutlineUnorderedList({ size: 22 }),
					page: ListSchools,
				},
				{
					name: "Criar Escola",
					path: "/admin/criar-escola",
					page: CreateOrEditSchoolPage,
					hidden: true,
				},
				{
					name: "Editar Escola",
					path: "/admin/editar-escola/:schoolId",
					page: CreateOrEditSchoolPage,
					hidden: true,
				},
				{
					name: "Listar Centrais",
					path: "/admin/listar-centrais",
					icon: AiOutlineUnorderedList({ size: 22 }),
					page: ListCops,
				},
				{
					name: "Listar Alertas",
					path: "/admin/listar-alerta",
					icon: AiOutlineUnorderedList({ size: 22 }),
					page: AlertListPage,
				},
				{
					name: "Detalhes do alerta",
					path: "/admin/detalhes-alerta/:id",
					icon: AiOutlineUnorderedList({ size: 22 }),
					page: () => AlertDetailsPage({ isWebsocket: false }),
					hidden: true,
				},
				{
					name: "Sala de Alerta",
					path: "/admin/sala-alerta",
					icon: AiTwotoneAlert({ size: 22 }),
					page: () => AlertDetailsPage({ isWebsocket: true }),
				},
				{
					name: "Criar Central",
					path: "/admin/criar-central",
					hidden: true,
					page: CreateOrEditCopPage,
				},
				{
					name: "Editar Central",
					path: "/admin/editar-central/:copID",
					hidden: true,
					page: CreateOrEditCopPage,
				},
			],
		},
	],
};
