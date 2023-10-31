import CacheService from "@services/CacheService";
import { AccountRoleType, getAccountRoleByCode } from "@typing/account";
import RouterSwitch from "@web/components/base/Router";
import Scaffold from "@web/components/base/Scaffold";
import AuthProvider from "@web/contexts/auth/provider";
import { ViteDIContainer } from "@web/dicontainer";
import "./globals.scss";

function App() {
	const cachedAccount = new CacheService().getAccount();
	const accountRoleCode = cachedAccount?.role?.code ?? "UNAUTH";
	const initialAccountRoleType = getAccountRoleByCode(accountRoleCode);

	return (
		<AuthProvider
			usecase={ViteDIContainer.getAuthUseCase()}
			cacheUsecase={ViteDIContainer.getCacheUsecase()}
		>
			<Scaffold<AccountRoleType>
				initialBranch={initialAccountRoleType}
				useAccountAsIdentifier
			>
				<RouterSwitch />
			</Scaffold>
		</AuthProvider>
	);
}

export default App;
