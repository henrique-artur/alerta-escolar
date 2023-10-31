import AuthAdapter from "@interfaces/adapters/AuthAdapter";
import { Account, AuthResponse, AuthCredentials } from "@models/index";
import { serializedAccount, serializedAuthorization } from "./data";

class AuthMock implements AuthAdapter {
	login(_: AuthCredentials): Promise<AuthResponse> {
		return Promise.resolve(AuthResponse.fromJSON(serializedAuthorization));
	}
	findProfile(): Promise<Account> {
		return Promise.resolve(Account.fromJSON(serializedAccount));
	}
	logout(): Promise<void> {
		return Promise.resolve();
	}
	saveAuthorization(_: string): void {}
	clearAuthorization(): void {}
}

export default AuthMock;
