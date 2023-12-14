import PanicButtonProvider from "@web/contexts/panicButton/provider";
import ResourcesProvider from "@web/contexts/resources/provider";
import { ViteDIContainer } from "@web/dicontainer";
import React, { PropsWithChildren } from "react";

function TeacherProviders({ children }: PropsWithChildren) {
	return (
		<>
			<ResourcesProvider usecase={ViteDIContainer.getResourcesUseCase()}>
				<PanicButtonProvider
					usecase={ViteDIContainer.getPanicButtonUseCase()}
				>
					{children}
				</PanicButtonProvider>
			</ResourcesProvider>
		</>
	);
}

export default TeacherProviders;
