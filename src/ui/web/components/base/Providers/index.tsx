import { PropsWithChildren } from "react";
import NavigatorProvider, {
	NavigationProps,
} from "@web/contexts/common/navigator/provider";
import SideMenuProvider from "@web/contexts/common/sidemenu/provider";
import AdminProviders from "@web/components/base/Providers/roles/AdminProviders";
import UnAuthProviders from "@web/components/base/Providers/roles/UnAuthProviders";

function ApplicationProviders<BranchIdentifier extends string>({
	children,
	initialBranch,
	useAccountAsIdentifier,
}: PropsWithChildren<NavigationProps<BranchIdentifier>>) {
	let ProviderRole;

	switch (initialBranch) {
		case "admin":
			ProviderRole = AdminProviders;
			break;
		default:
			ProviderRole = UnAuthProviders;
			break;
	}

	return (
		<NavigatorProvider<BranchIdentifier>
			initialBranch={initialBranch}
			useAccountAsIdentifier={useAccountAsIdentifier}
		>
			<SideMenuProvider>
				<ProviderRole>{children}</ProviderRole>
			</SideMenuProvider>
		</NavigatorProvider>
	);
}

export { ApplicationProviders };
