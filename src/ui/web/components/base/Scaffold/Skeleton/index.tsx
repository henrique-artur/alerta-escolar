import { Outlet } from "react-router-dom";
import styles from "./styles.module.scss";

function Skeleton() {
	return (
		<div className={styles.container}>
			<Outlet />
		</div>
	);
}

export default Skeleton;
