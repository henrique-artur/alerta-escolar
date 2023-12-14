import { AiOutlineUnorderedList } from "react-icons/ai";
import { NavigationBranch } from "../types";
import ListUsers from "@web/pages/admin/list-users";
import ListSchools from "@web/pages/admin/school/list";
import ListCops from "@web/pages/admin/cop/list";
import CreateOrEditSchoolPage from "@web/pages/admin/school/create-or-edit";
import CreateOrEditCopPage from "@web/pages/admin/cop/create-or-edit";

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
					name: "Listar Delegacias",
					path: "/admin/listar-delegacias",
					icon: AiOutlineUnorderedList({ size: 22 }),
					page: ListCops,
				},
				{
					name: "Criar Delegacia",
					path: "/admin/criar-delegacia",
					hidden: true,
					page: CreateOrEditCopPage,
				},
				{
					name: "Editar Delegacia",
					path: "/admin/editar-delegacia/:copID",
					hidden: true,
					page: CreateOrEditCopPage,
				},
			],
		},
	],
};
