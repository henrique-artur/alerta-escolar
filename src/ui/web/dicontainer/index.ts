import AuthAPI from "@api/auth";
import ResourcesAPI from "@api/resources";
import UsersAPI from "@api/users";
import AuthService from "@services/AuthService";
import CacheService from "@services/CacheService";
import ResourcesService from "@services/ResourcesService";
import UsersService from "@services/UsersService";

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

	static getUsersUseCase() {
		return new UsersService(new UsersAPI());
	}

	static getResourcesUseCase() {
		return new ResourcesService(new ResourcesAPI());
	}
}

export { ViteDIContainer };
