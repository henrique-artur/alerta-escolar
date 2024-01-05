import { useContextSelector } from "use-context-selector";
import { AudioCTX } from ".";

export function usePlayingAudio() {
	return useContextSelector(AudioCTX, (ctx) => ctx.playing);
}

export function useToggleAudio() {
	return useContextSelector(AudioCTX, (ctx) => ctx.toggle);
}