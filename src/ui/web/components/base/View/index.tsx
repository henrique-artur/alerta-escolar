import { PropsWithChildren, ReactNode } from "react";
import styles from "./styles.module.scss";
import { useCurrentRouteProps } from "@web/contexts/common/navigator/hooks";
import { Button } from "antd";
import { IoArrowBack } from "react-icons/io5";

interface Props {
	rightButton?: ReactNode;
	showBackButton?: boolean;
}

function View({
	rightButton,
	children,
	showBackButton = false,
}: PropsWithChildren<Props>) {
	const currentRoute = useCurrentRouteProps();

	return (
		<div id={styles.container}>
			<div className={styles.content}>
				<div className={styles.headerContainer}>
					<div className={styles.headerTitleContent}>
						{showBackButton && (
							<Button
								icon={<IoArrowBack size={22} />}
								type="primary"
								onClick={() => history.back()}
							/>
						)}
						<h3>{currentRoute?.name}</h3>
					</div>
					{rightButton}
				</div>
				{children}
			</div>
		</div>
	);
}

export default View;
