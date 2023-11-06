import { useContextSelector } from "use-context-selector";
import { ResourcesCTX } from ".";

export function useFetchRoles() {
	return useContextSelector(ResourcesCTX, (ctx) => ctx.fetch);
}

export function useRoles() {
	return useContextSelector(ResourcesCTX, (ctx) => ctx.roles);
}
