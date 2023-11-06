import AuthAPI from "@api/auth";
import ResourcesAPI from "@api/resources";
import SchoolAPI from "@api/school";
import UsersAPI from "@api/users";
import AuthService from "@services/AuthService";
import CacheService from "@services/CacheService";
import ResourcesService from "@services/ResourcesService";
import SchoolService from "@services/SchoolService";
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

	static getSchoolsUseCase() {
		return new SchoolService(new SchoolAPI());
	}
}

export { ViteDIContainer };
