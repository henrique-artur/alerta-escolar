import PanicButtonPage from "@web/pages/teacher/panic-button";
import { NavigationBranch } from "../types";
import { AiFillCheckSquare, AiTwotoneAlert } from "react-icons/ai";
import { BiMailSend } from "react-icons/bi";
import SendAlertPage from "@web/pages/teacher/send-alert";
import OccurrenceResumePage from "@web/pages/teacher/occurence-resume";

export const routes: NavigationBranch = {
	redirectPath: "/professor/botao-de-panico",
	groups: [
		{
			name: "",
			routes: [
				{
					name: "Botão de Pânico",
					path: "/professor/botao-de-panico",
					page: PanicButtonPage,
					icon: AiTwotoneAlert({ size: 22 }),
				},
				{
					name: "Complemento do Alerta",
					path: "/professor/complemento-alerta/:id",
					page: SendAlertPage,
					icon: BiMailSend({ size: 22 }),
					hidden: true,
				},
				{
					name: "Resumo da Ocorrência",
					path: "/professor/resumo-ocorrencia/:id",
					page: OccurrenceResumePage,
					icon: AiFillCheckSquare({ size: 22 }),
					hidden: true,
				},
			],
		},
	],
};
