import { UPDATE_STATE } from "./constantes";

interface IState{
    selectedList: null | number,
    translationX: number,
    isMoving: boolean,
    startedAt: number,
    initMousePosition: number
}

const initialState: IState = {
    selectedList: null,
    translationX: 0,
    isMoving: false,
    startedAt: 0,
    initMousePosition: 0
}

const listReducer = (state: IState = initialState, action) => {
    switch(action.type){
        case UPDATE_STATE:
            return {...state, ...action.payload};
        default: 
            return state;
    }
}

export default listReducer;