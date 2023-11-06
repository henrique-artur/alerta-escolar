import { useRef } from "react";
import { CreateUsersModalHandlers } from ".";

export function useCreateUserModal() {
	return useRef({} as CreateUsersModalHandlers);
}
