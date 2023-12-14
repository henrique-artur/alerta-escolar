import { useContextSelector } from "use-context-selector";
import { PanicButtonCTX } from ".";

export function usePressPanicButton() {
	return useContextSelector(PanicButtonCTX, (ctx) => ctx.press);
}

export function useGetAlertByID() {
	return useContextSelector(PanicButtonCTX, (ctx) => ctx.getByID);
}

export function useUpdateAlert() {
	return useContextSelector(PanicButtonCTX, (ctx) => ctx.update);
}
