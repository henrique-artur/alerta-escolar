import ResourcesProvider from "@web/contexts/resources/provider";
import SchoolProvider from "@web/contexts/school/provider";
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
					<SchoolProvider
						usecase={ViteDIContainer.getSchoolsUseCase()}
					>
						{children}
					</SchoolProvider>
				</ResourcesProvider>
			</UsersProvider>
		</>
	);
}

export default AdminProviders;
