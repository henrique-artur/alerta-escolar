import { useRef } from "react";
import { CreateSchoolModalHandlers } from ".";

export function useCreateSchoolModal() {
	return useRef({} as CreateSchoolModalHandlers);
}
