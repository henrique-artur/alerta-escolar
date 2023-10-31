import { NavigationBranch } from "./types";
import { routes as UnAuthRoutes } from "./roles/unauth-routes";
import { routes as SchoolWorkerRoutes } from "./roles/school-worker-routes";
import { AccountRoleType } from "@typing/account/AccountRoleTypes";

export const namedBranchs: Readonly<Record<string | number, NavigationBranch>> =
	{
		[AccountRoleType.UNAUTH]: UnAuthRoutes,
		[AccountRoleType["SCHOOL-WORKER"]]: SchoolWorkerRoutes,
	};
