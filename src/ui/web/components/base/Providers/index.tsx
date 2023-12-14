import { PropsWithChildren, useMemo } from "react";
import NavigatorProvider, {
	NavigationProps,
} from "@web/contexts/common/navigator/provider";
import SideMenuProvider from "@web/contexts/common/sidemenu/provider";
import AdminProviders from "@web/components/base/Providers/roles/AdminProviders";
import UnAuthProviders from "@web/components/base/Providers/roles/UnAuthProviders";
import TeacherProviders from "./roles/TeacherProviders";

function ApplicationProviders<BranchIdentifier extends string>({
	children,
	initialBranch,
	useAccountAsIdentifier,
}: PropsWithChildren<NavigationProps<BranchIdentifier>>) {
	const ProviderRole = useMemo(() => {
		switch (initialBranch) {
			case "admin":
				return AdminProviders;
			case "teacher":
				return TeacherProviders;
			default:
				return UnAuthProviders;
		}
	}, [initialBranch]);

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
