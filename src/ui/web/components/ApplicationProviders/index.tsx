import { PropsWithChildren } from "react";
import UnAuthProviders from "./roles/UnAuthProviders";

function ApplicationProviders({ children }: PropsWithChildren) {
	return <UnAuthProviders>{children}</UnAuthProviders>;
}

export default ApplicationProviders;
