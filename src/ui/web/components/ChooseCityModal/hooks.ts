import { useRef } from "react";
import { ChooseCityModalHandlers } from ".";

export function useChooseCityModal() {
	return useRef({} as ChooseCityModalHandlers);
}
