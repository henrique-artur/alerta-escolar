import View from "@web/components/base/View";
import { useNavigate } from "react-router-dom";
import AlertList from "@web/components/AlertList";

function AlertListPage() {
	const navigate = useNavigate();

	return (
		<View>
			<AlertList
				detailsOnClick={(id) =>
					navigate(`/agente/detalhes-alerta/${id}`)
				}
			/>
		</View>
	);
}

export default AlertListPage;
