import AlertList from "@web/components/AlertList";
import AlertModal from "@web/components/AlertModal";
import { useAlertModal } from "@web/components/AlertModal/hooks";
import ChooseCityModal from "@web/components/ChooseCityModal";
import { useChooseCityModal } from "@web/components/ChooseCityModal/hooks";
import ModalFilter from "@web/components/ModalFilter";
import { useModalFilter } from "@web/components/ModalFilter/hooks";
import View from "@web/components/base/View";
import { useToggleAudio } from "@web/contexts/audio/hooks";
import { useCountieSelected, useLastAlert } from "@web/contexts/panicButton/hooks";
import { useCounties, useFetchCounties } from "@web/contexts/resources/hooks";
import { Button, Typography } from "antd";
import { useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AlertListPage() {
	const navigate = useNavigate();
	const modalFilterRef = useModalFilter();
	const countieSelected = useCountieSelected();
	const lastAlert = useLastAlert();
	const alertModalRef = useAlertModal();
	const chooseCityModalRef = useChooseCityModal();
	const fetchCounties = useFetchCounties();
	const counties = useCounties();
	const toggle = useToggleAudio();
	useEffect(() => {
		if (lastAlert && !lastAlert.responsible) {
			alertModalRef.current.open();
			toggle(true)
		}

		if (!countieSelected) {
			chooseCityModalRef.current.open();
		}

		if (!counties && !!fetchCounties) {
			fetchCounties();
		}
	}, [lastAlert,countieSelected, counties]);

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
					navigate(`/admin/detalhes-alerta/${id}`)
				}
			/>
			<AlertModal
				detailsOnClick={(id) =>
					navigate(`/admin/detalhes-alerta/${id}`)
				}
				ref={alertModalRef}
			/>
			<ModalFilter ref={modalFilterRef} />
			<ChooseCityModal ref={chooseCityModalRef} />
		</View>
	);
}

export default AlertListPage;
