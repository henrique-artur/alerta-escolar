import { useRef } from "react";
import { ModalConcludedAlertHandlers } from ".";

export function useModalconcludedAlert() {
	return useRef({} as ModalConcludedAlertHandlers);
}
