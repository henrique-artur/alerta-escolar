import CacheService from "@services/CacheService";
import { AccountRoleType, getAccountRoleByCode } from "@typing/account";
import RouterSwitch from "@web/components/base/Router";
import Scaffold from "@web/components/base/Scaffold";
import AuthProvider from "@web/contexts/auth/provider";
import { ViteDIContainer } from "@web/dicontainer";
import "./globals.scss";
import { PropsWithChildren } from "react";
import { useAccount } from "@web/contexts/auth/hooks";
import AppConfigProvider from "@web/contexts/appconfig/provider";
import NotificationProvider from "@web/contexts/common/notification/provider";
import UsersProvider from "@web/contexts/users/provider";
import ResourcesProvider from "@web/contexts/resources/provider";
import SchoolProvider from "@web/contexts/school/provider";
import CopProvider from "@web/contexts/cop/provider";
import PanicButtonProvider from "@web/contexts/panicButton/provider";
import AudioProvider from "@web/contexts/audio/provider";

interface Props {
	showHeader?: boolean;
	showSideMenu?: boolean;
}

function AppConfigSetup({
	children,
	showHeader,
	showSideMenu,
}: PropsWithChildren<Props>) {
	const account = useAccount();
	showHeader = showSideMenu = account !== undefined;

	return (
		<AppConfigProvider showHeader={showHeader} showSideMenu={showSideMenu}>
			<UsersProvider usecase={ViteDIContainer.getUsersUseCase()}>
				<ResourcesProvider
					usecase={ViteDIContainer.getResourcesUseCase()}
				>
					<SchoolProvider
						usecase={ViteDIContainer.getSchoolsUseCase()}
					>
						<CopProvider usecase={ViteDIContainer.getCopsUseCase()}>
							<PanicButtonProvider
								usecase={ViteDIContainer.getPanicButtonUseCase()}
							>
								<AudioProvider>{children}</AudioProvider>
							</PanicButtonProvider>
						</CopProvider>
					</SchoolProvider>
				</ResourcesProvider>
			</UsersProvider>
		</AppConfigProvider>
	);
}

function App() {
	const cachedAccount = new CacheService().getAccount();
	const accountRoleCode = cachedAccount?.role[0].code ?? "UNAUTH";
	const initialAccountRoleType = getAccountRoleByCode(accountRoleCode);

	return (
		<NotificationProvider>
			<AuthProvider
				usecase={ViteDIContainer.getAuthUseCase()}
				cacheUsecase={ViteDIContainer.getCacheUsecase()}
			>
				<AppConfigSetup>
					<Scaffold<AccountRoleType>
						initialBranch={initialAccountRoleType}
						useAccountAsIdentifier
					>
						<RouterSwitch />
					</Scaffold>
				</AppConfigSetup>
			</AuthProvider>
		</NotificationProvider>
	);
}

export default App;
