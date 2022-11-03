import { Cycle } from "../../contexts/CyclesContext";

export enum actionsTypes {
    ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
    FINISHED_CYCLE = 'FINISHED_CYCLE',
    INTERRUPTED_CYCLE = 'INTERRUPTED_CYCLE',
}

export function addNewCycle(newCycle: Cycle) {
    return {
        type: actionsTypes.ADD_NEW_CYCLE,
        payload: {
            newCycle,
        }
    }
}

export function finishedCycle() {
    return{
        type: actionsTypes.FINISHED_CYCLE,
    }
}


export function interruptedCycle() {
    return {
        type: actionsTypes.INTERRUPTED_CYCLE,
    }
}