import AlertList from "@web/components/AlertList";
import View from "@web/components/base/View";
import { useNavigate } from "react-router-dom";

function AlertListPage() {
	const navigate = useNavigate();

	return (
		<View>
			<AlertList
				detailsOnClick={(id) =>
					navigate(`/admin/detalhes-alerta/${id}`)
				}
			/>
		</View>
	);
}

export default AlertListPage;
