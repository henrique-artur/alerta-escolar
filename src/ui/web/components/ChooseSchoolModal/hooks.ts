import { useRef } from "react";
import { ChooseSchoolModalHandlers } from ".";

export function useChooseSchoolModal() {
	return useRef({} as ChooseSchoolModalHandlers);
}
