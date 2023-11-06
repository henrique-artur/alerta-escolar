import UsersProvider from "@web/contexts/users/provider";
import { ViteDIContainer } from "@web/dicontainer";
import { PropsWithChildren } from "react";

function AdminProviders({ children }: PropsWithChildren) {
	return (
		<>
			<UsersProvider usecase={ViteDIContainer.getUsersUseCase()}>
				{children}
			</UsersProvider>
		</>
	);
}

export default AdminProviders;
