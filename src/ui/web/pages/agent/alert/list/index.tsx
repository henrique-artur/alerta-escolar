import View from "@web/components/base/View";
import { useNavigate } from "react-router-dom";
import AlertList from "@web/components/AlertList";
import { Button, Typography } from "antd";
import { FaFilter } from "react-icons/fa";
import { useModalFilter } from "@web/components/ModalFilter/hooks";
import ModalFilter from "@web/components/ModalFilter";
import AlertModal from "@web/components/AlertModal";
import { useAlertModal } from "@web/components/AlertModal/hooks";
import {
	useCountieSelected,
	useLastAlert,
} from "@web/contexts/panicButton/hooks";
import { useEffect } from "react";
import ChooseCityModal from "@web/components/ChooseCityModal";
import { useChooseCityModal } from "@web/components/ChooseCityModal/hooks";
import { useCounties, useFetchCounties } from "@web/contexts/resources/hooks";
import { useToggleAudio } from "@web/contexts/audio/hooks";

function AlertListPage() {
	const navigate = useNavigate();
	const modalFilterRef = useModalFilter();
	const alertModalRef = useAlertModal();
	const lastAlert = useLastAlert();
	const countieSelected = useCountieSelected();
	const chooseCityModalRef = useChooseCityModal();
	const counties = useCounties();
	const fetchCounties = useFetchCounties();
	const toggle = useToggleAudio();

	useEffect(() => {
		if (lastAlert && !lastAlert.responsible) {
			alertModalRef.current.open();
			toggle(true)
		}

		if (!counties && !!fetchCounties) {
			fetchCounties();
		}

		if (!countieSelected) {
			chooseCityModalRef.current.open();
		}
	}, [lastAlert, countieSelected, counties]);

	const { Paragraph } = Typography;

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
			{countieSelected && (
				<Paragraph>
					Sua Área de Cobertura Atual:{" "}
					<Button
						type="default"
						onClick={() => chooseCityModalRef.current.open()}
					>
						{
							counties?.find(
								(item) => item.id === countieSelected
							)?.name
						}
					</Button>
				</Paragraph>
			)}
			<AlertList
				detailsOnClick={(id) =>
					navigate(`/agente/detalhes-alerta/${id}`)
				}
			/>
			<ModalFilter ref={modalFilterRef} />
			<AlertModal
				detailsOnClick={(id) =>
					navigate(`/agente/detalhes-alerta/${id}`)
				}
				ref={alertModalRef}
			/>
			<ChooseCityModal ref={chooseCityModalRef} />
		</View>
	);
}

export default AlertListPage;
