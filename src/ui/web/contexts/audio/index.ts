import { createContext } from "use-context-selector";

interface Props {
    playing : boolean;
    toggle: ()=>void;
}

export const AudioCTX = createContext({} as Props);
