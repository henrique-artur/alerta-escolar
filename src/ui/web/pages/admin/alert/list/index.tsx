import AlertList from "@web/components/AlertList";
import ModalFilter from "@web/components/ModalFilter";
import { useModalFilter } from "@web/components/ModalFilter/hooks";
import View from "@web/components/base/View";
import { Button } from "antd";
import { FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
					navigate(`/admin/detalhes-alerta/${id}`)
				}
			/>
			<ModalFilter ref={modalFilterRef} />
		</View>
	);
}

export default AlertListPage;
