import AuthMock from '@mock/auth';
import AuthService from '@services/AuthService';
import CacheService from '@services/CacheService';

class ViteDIContainer {
  static getCacheUsecase() {
    return new CacheService();
  }

  static getAuthUseCase() {
    return new AuthService(new AuthMock(), ViteDIContainer.getCacheUsecase());
  }
}

export { ViteDIContainer };
