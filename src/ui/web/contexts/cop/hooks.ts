import { useContextSelector } from "use-context-selector";
import { CopCTX } from ".";

export function useFetchCops() {
	return useContextSelector(CopCTX, (ctx) => ctx.fetch);
}

export function useFindCopByID() {
	return useContextSelector(CopCTX, (ctx) => ctx.findByID);
}

export function useCops() {
	return useContextSelector(CopCTX, (ctx) => ctx.cops);
}

export function useCreateCop() {
	return useContextSelector(CopCTX, (ctx) => ctx.create);
}

export function useEraseCop() {
	return useContextSelector(CopCTX, (ctx) => ctx.delete);
}

export function useUpdateCop() {
	return useContextSelector(CopCTX, (ctx) => ctx.update);
}
