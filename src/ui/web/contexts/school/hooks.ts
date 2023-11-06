import { useContextSelector } from "use-context-selector";
import { SchoolCTX } from ".";

export function useFetchSchools() {
	return useContextSelector(SchoolCTX, (ctx) => ctx.fetch);
}

export function useSchools() {
	return useContextSelector(SchoolCTX, (ctx) => ctx.schools);
}

export function useCreateSchool() {
	return useContextSelector(SchoolCTX, (ctx) => ctx.create);
}

export function useEraseSchool() {
	return useContextSelector(SchoolCTX, (ctx) => ctx.erase);
}

export function useUpdateSchool() {
	return useContextSelector(SchoolCTX, (ctx) => ctx.update);
}
