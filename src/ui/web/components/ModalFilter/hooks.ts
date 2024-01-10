import { useRef } from "react";
import { ModalFilterHandlers } from ".";

export function useModalFilter() {
	return useRef({} as ModalFilterHandlers);
}
