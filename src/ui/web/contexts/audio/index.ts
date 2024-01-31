import { createContext } from "use-context-selector";

interface Props {
	playing: boolean;
	toggle(value: boolean): void;
}

export const AudioCTX = createContext({} as Props);
