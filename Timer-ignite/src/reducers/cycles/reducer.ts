import { produce } from 'immer';

import { Cycle } from '../../contexts/CyclesContext';
import {actionsTypes} from './actions';

interface CyclesState {
    cycles: Cycle[];
    activeCyclesId: string | null;
}


export function cyclesReducer(state: CyclesState, action: any) {

    switch (action.type) {
        case actionsTypes.ADD_NEW_CYCLE:
            return produce(state, draft => {
                draft.cycles.push(action.payload.newCycle);
                draft.activeCyclesId = action.payload.newCycle.id;
            });
        case actionsTypes.FINISHED_CYCLE:
            return produce(state, draft => {
                const activeCycleIndex = draft.cycles.findIndex(cycle => cycle.id === draft.activeCyclesId);

                if(activeCycleIndex < 0) {
                    return state;
                }

                draft.cycles[activeCycleIndex].finished = new Date();
                draft.activeCyclesId = null;
            });
        case actionsTypes.INTERRUPTED_CYCLE:
            return produce(state, draft => {
                const activeCycleIndex = draft.cycles.findIndex(cycle => cycle.id === draft.activeCyclesId);

                if(activeCycleIndex < 0) {
                    return state;
                }
                draft.cycles[activeCycleIndex].interruptedDate = new Date();
                draft.activeCyclesId = null;
            });
        default:
            return state;
        

    }
}