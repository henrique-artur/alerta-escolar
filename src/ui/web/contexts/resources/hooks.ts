import { useContextSelector } from "use-context-selector";
import { ResourcesCTX } from ".";

export function useFetchRoles() {
	return useContextSelector(ResourcesCTX, (ctx) => ctx.fetch);
}

export function useRoles() {
	return useContextSelector(ResourcesCTX, (ctx) => ctx.roles);
}

export function useGetAddressByZipCode() {
	return useContextSelector(ResourcesCTX, (ctx) => ctx.getAddressByZipCode);
}

export function useFetchCounties() {
	return useContextSelector(ResourcesCTX, (ctx) => ctx.fetchCounties);
}

export function useCounties() {
	return useContextSelector(ResourcesCTX, (ctx) => ctx.counties);
}

export function useFetchIncidentType() {
	return useContextSelector(ResourcesCTX, (ctx) => ctx.fetchTypeIncident);
}

export function useIncidentTypes() {
	return useContextSelector(ResourcesCTX, (ctx) => ctx.incidentTypes);
}
