import ResourcesProvider from "@web/contexts/resources/provider";
import UsersProvider from "@web/contexts/users/provider";
import { ViteDIContainer } from "@web/dicontainer";
import { PropsWithChildren } from "react";

function AdminProviders({ children }: PropsWithChildren) {
	return (
		<>
			<UsersProvider usecase={ViteDIContainer.getUsersUseCase()}>
				<ResourcesProvider
					usecase={ViteDIContainer.getResourcesUseCase()}
				>
					{children}
				</ResourcesProvider>
			</UsersProvider>
		</>
	);
}

export default AdminProviders;
