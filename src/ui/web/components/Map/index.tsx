import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { PropsWithChildren } from "react";

function Map({ children }: PropsWithChildren) {
	return (
		<MapContainer
			center={[-9.6133065, -36.6884267]}
			zoom={9}
			scrollWheelZoom={true}
			style={{
				width: "100%",
				height: 400,
			}}
		>
			{children}
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
		</MapContainer>
	);
}

export default Map;
