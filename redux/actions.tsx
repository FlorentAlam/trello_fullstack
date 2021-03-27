import { UPDATE_STATE } from "./constantes";

export const updateState = (newState: any) => ({ type: UPDATE_STATE, payload: newState});