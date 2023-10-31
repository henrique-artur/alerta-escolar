enum AccountRoleType {
	UNAUTH = "unauth",
	ADMIN = "admin",
	"SCHOOL-WORKER" = "Professor",
}

export function getAccountRoleByCode(roleKey?: string) {
	roleKey = roleKey?.toUpperCase();
	switch (roleKey) {
		case "ADMIN":
			return AccountRoleType.ADMIN;
		case "SCHOOL-WORKER":
			return AccountRoleType["SCHOOL-WORKER"];
		default:
			return AccountRoleType.UNAUTH;
	}
}

export function getAccountRoleKeyByName(roleName: string) {
	return (
		Object.entries(AccountRoleType).find(
			(item) => item[1] === roleName
		)?.[0] ?? "UNAUTH"
	);
}

export { AccountRoleType };
