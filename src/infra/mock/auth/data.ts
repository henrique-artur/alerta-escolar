const serializedAuthorization = {
	access_token: "token",
};

const serializedCredentials = {
	email: "username@test.com",
	password: "12345678",
};

const serializedAccount = {
	id: 1,
	profile: {
		id: 1,
		name: "Test User",
		birth_date: "2000-01-01",
		cpf: "12312312312",
		email: "user@test.com",
		phone: "11911111111",
		created_at: "2000-01-01T00:00:00",
		updated_at: "2000-01-01T00:00:00",
	},
	role: {
		id: 1,
		name: "Professor",
		code: "SCHOOL-WORKER",
	},
};

export { serializedAuthorization, serializedCredentials, serializedAccount };
