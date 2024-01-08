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

export function useFetchAlert() {
	return useContextSelector(PanicButtonCTX, (ctx) => ctx.fetch);
}

export function useAlerts() {
	return useContextSelector(PanicButtonCTX, (ctx) => ctx.alerts);
}

export function useLastAlert() {
	return useContextSelector(PanicButtonCTX, (ctx) => ctx.lastAlert);
}

export function useCreateRoom() {
	return useContextSelector(PanicButtonCTX, (ctx) => ctx.createRoom);
}

export function useJoinRoomAlert() {
	return useContextSelector(PanicButtonCTX, (ctx) => ctx.joinRoomAlert);
}

export function useUpdateStatusAlert() {
	return useContextSelector(PanicButtonCTX, (ctx) => ctx.updateStatusAlert);
}

export function useNewStatusAlert() {
	return useContextSelector(PanicButtonCTX, (ctx) => ctx.newStatusAlert);
}

export function useUpdateResponsibleAlert() {
	return useContextSelector(
		PanicButtonCTX,
		(ctx) => ctx.updateResponsibleAlert
	);
}

export function useConcludedAlert() {
	return useContextSelector(PanicButtonCTX, (ctx) => ctx.concludedAlert);
}

export function useChooseSchool() {
	return useContextSelector(PanicButtonCTX, (ctx) => ctx.chooseSchool);
}
