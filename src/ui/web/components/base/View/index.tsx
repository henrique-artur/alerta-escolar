import { PropsWithChildren, ReactNode } from "react";
import styles from "./styles.module.scss";
import { useCurrentRouteProps } from "@web/contexts/common/navigator/hooks";

interface Props {
	rightButton?: ReactNode;
}

function View({ rightButton, children }: PropsWithChildren<Props>) {
	const currentRoute = useCurrentRouteProps();

	return (
		<div id={styles.container}>
			<div className={styles.content}>
				<div className={styles.headerContainer}>
					<h3>{currentRoute?.name}</h3>
					{rightButton}
				</div>
				{children}
			</div>
		</div>
	);
}

export default View;
