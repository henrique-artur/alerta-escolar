import View from "@web/components/base/View";
import { useNavigate } from "react-router-dom";
import AlertList from "@web/components/AlertList";
import { Button } from "antd";
import { FaFilter } from "react-icons/fa";
import { useModalFilter } from "@web/components/ModalFilter/hooks";
import ModalFilter from "@web/components/ModalFilter";

function AlertListPage() {
	const navigate = useNavigate();
	const modalFilterRef = useModalFilter();

	return (
		<View
			rightButton={
				<Button
					type="default"
					onClick={() => modalFilterRef.current.open()}
				>
					<FaFilter size={24} />
				</Button>
			}
		>
			<AlertList
				detailsOnClick={(id) =>
					navigate(`/agente/detalhes-alerta/${id}`)
				}
			/>
			<ModalFilter ref={modalFilterRef} />
		</View>
	);
}

export default AlertListPage;
