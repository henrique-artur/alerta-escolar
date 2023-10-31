import { PropsWithChildren } from "react";
import NavigatorProvider, {
	NavigationProps,
} from "@web/contexts/common/navigator/provider";

function ApplicationProviders<BranchIdentifier extends string>({
	children,
	initialBranch,
	useAccountAsIdentifier,
}: PropsWithChildren<NavigationProps<BranchIdentifier>>) {
	return (
		<NavigatorProvider<BranchIdentifier>
			initialBranch={initialBranch}
			useAccountAsIdentifier={useAccountAsIdentifier}
		>
			{children}
		</NavigatorProvider>
	);
}

export { ApplicationProviders };
