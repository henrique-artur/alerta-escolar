import AuthAPI from "@api/auth";
import AuthAdapter from "@interfaces/adapters/AuthAdapter";
import AuthMock from "@mock/auth";
import AuthService from "@services/AuthService";
import CacheService from "@services/CacheService";

class ViteDIContainer {
	static getCacheUsecase() {
		return new CacheService();
	}

	static getAuthUseCase() {
		return new AuthService(
			new AuthAPI(),
			ViteDIContainer.getCacheUsecase()
		);
	}
}

export { ViteDIContainer };
