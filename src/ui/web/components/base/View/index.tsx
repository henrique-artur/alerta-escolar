import { PropsWithChildren, ReactNode } from "react";
import styles from "./styles.module.scss";
import { useCurrentRouteProps } from "@web/contexts/common/navigator/hooks";
import { Button } from "antd";
import { IoArrowBack } from "react-icons/io5";
import classNames from "classnames";

interface Props {
	rightButton?: ReactNode;
	showBackButton?: boolean;
	hiddenPageTitle?: boolean;
	className?: string;
}

function View({
	rightButton,
	children,
	showBackButton = false,
	hiddenPageTitle = false,
	className,
}: PropsWithChildren<Props>) {
	const currentRoute = useCurrentRouteProps();

	return (
		<div id={styles.container}>
			<div className={classNames(styles.content, className)}>
				<div className={styles.headerContainer}>
					<div className={styles.headerTitleContent}>
						{showBackButton && (
							<Button
								icon={<IoArrowBack size={22} />}
								type="primary"
								onClick={() => history.back()}
							/>
						)}
						{!hiddenPageTitle && <h3>{currentRoute?.name}</h3>}
					</div>
					{rightButton}
				</div>
				{children}
			</div>
		</div>
	);
}

export default View;
