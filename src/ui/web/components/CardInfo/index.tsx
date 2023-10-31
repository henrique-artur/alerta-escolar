import { Card } from "antd";
import styles from "./styles.module.scss";
import { PropsWithChildren } from "react";
import classNames from "classnames";

interface Props {
	className?: string;
	title: string;
}

function CardInfo({ children, className, title }: PropsWithChildren<Props>) {
	return (
		<Card className={classNames(styles.cardInfo, className)} title={title}>
			{children}
		</Card>
	);
}

export default CardInfo;
