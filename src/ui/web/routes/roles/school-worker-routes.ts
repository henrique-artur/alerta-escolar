import PanicButtonPage from "@web/pages/school_worker/panic-button";
import { NavigationBranch } from "../types";
import { AiFillCheckSquare, AiTwotoneAlert } from "react-icons/ai";
import { BiMailSend } from "react-icons/bi";
import SendAlertPage from "@web/pages/school_worker/send-alert";
import OccurrenceResumePage from "@web/pages/school_worker/occurence-resume";

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
					icon: AiTwotoneAlert({}),
				},
				{
					name: "Enviar Alerta",
					path: "/professor/enviar-alerta",
					page: SendAlertPage,
					icon: BiMailSend({}),
				},
				{
					name: "Resumo da Ocorrência",
					path: "/professor/occurrence-resume",
					page: OccurrenceResumePage,
					icon: AiFillCheckSquare({}),
				},
			],
		},
	],
};
