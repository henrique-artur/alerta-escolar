import { PropsWithChildren, useEffect, useState } from "react";
import { AudioCTX } from ".";
import audioFile from "assets/audios/Alert.mp3";

function AudioProvider({ children }: PropsWithChildren) {
	const [audio] = useState(new Audio(audioFile));
	const [playing, setPlaying] = useState(false);

	useEffect(() => {
		playing ? audio.play() : audio.pause();
	}, [playing]);

	useEffect(() => {
		audio.loop = true;
		audio.addEventListener("ended", () => setPlaying(false));
		return () => {
			audio.removeEventListener("ended", () => setPlaying(false));
		};
	}, []);

	const toggle = (value: boolean) => setPlaying(value);

	return (
		<AudioCTX.Provider
			value={{
				playing,
				toggle,
			}}
		>
			{children}
		</AudioCTX.Provider>
	);
}

export default AudioProvider;
