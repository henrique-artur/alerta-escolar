import { useRef } from "react";
import { AlertModalHandlers } from ".";

export function useAlertModal() {
	return useRef({} as AlertModalHandlers);
}
