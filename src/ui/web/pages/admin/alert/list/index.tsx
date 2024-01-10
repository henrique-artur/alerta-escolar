import AlertList from "@web/components/AlertList";
import ChooseCityModal from "@web/components/ChooseCityModal";
import { useChooseCityModal } from "@web/components/ChooseCityModal/hooks";
import ModalFilter from "@web/components/ModalFilter";
import { useModalFilter } from "@web/components/ModalFilter/hooks";
import View from "@web/components/base/View";
import { useCountieSelected } from "@web/contexts/panicButton/hooks";
import { useCounties, useFetchCounties } from "@web/contexts/resources/hooks";
import { Button, Typography } from "antd";
import { useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AlertListPage() {
	const navigate = useNavigate();
	const modalFilterRef = useModalFilter();
	const countieSelected = useCountieSelected();
	const chooseCityModalRef = useChooseCityModal();
	const fetchCounties = useFetchCounties();
	const counties = useCounties();

	useEffect(() => {
		if (!countieSelected) {
			chooseCityModalRef.current.open();
		}

		if (!counties && !!fetchCounties) {
			fetchCounties();
		}
	}, [countieSelected, counties]);

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
			<ModalFilter ref={modalFilterRef} />
			<ChooseCityModal ref={chooseCityModalRef} />
		</View>
	);
}

export default AlertListPage;
