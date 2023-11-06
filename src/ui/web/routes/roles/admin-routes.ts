import { AiOutlineUnorderedList } from "react-icons/ai";
import { NavigationBranch } from "../types";
import ListUsers from "@web/pages/admin/list-users";

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
				// {
				// 	name: "Listar Escolar",
				// 	path: "/admin/listar-usuarios",
				// 	icon: AiOutlineUnorderedList({ size: 22 }),
				// },
			],
		},
	],
};
