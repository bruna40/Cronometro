import { useEffect, useReducer } from 'react';
import { createContext, useState } from 'react';
import { cyclesReducer } from '../reducers/cycles/reducer';
import { actionsTypes, addNewCycle, finishedCycle, interruptedCycle } from '../reducers/cycles/actions';
import { differenceInSeconds } from 'date-fns';

interface CreateCycleData {
    task: string;
    time: number;
}


export interface Cycle {
    id: string;
    task: string;
    time: number;
    startedAt: Date;
    finished?: Date;
    interruptedDate?: Date;
}

interface CyclesContextType {
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCyclesId: string | null;
    handleFinishedCycle: () => void;
    amountSecondsPassed: number;
    setSecondsPassed: (seconds: number) => void;
    creteNewCycles: ({ task,time }:CreateCycleData) => void;
    interrupedCycles: () => void;
}

interface CyclesContextProviderProps {
    children: React.ReactNode;
};



export const CycleContext = createContext({} as CyclesContextType);

export function CycleProvider({ children }: CyclesContextProviderProps) {


    const [cyclesState, dispatch] = useReducer(cyclesReducer, {
        cycles: [],
        activeCyclesId: null,
    }, () => {
        const storageStateAsJSON = localStorage.getItem('@ignite-timer:cycle-state');

        if(storageStateAsJSON) {
            return JSON.parse(storageStateAsJSON);
        }
    });

    const { cycles, activeCyclesId } = cyclesState;
    const activeCycle = cycles.find(cycle => cycle.id === activeCyclesId);

    const [ amountSecondsPassed, setAmountSecondsPassed ] = useState(() => {
        if(activeCycle ) {
            const difference= differenceInSeconds(new Date(), new Date(activeCycle.startedAt));
            return difference;
        }

        return 0;
    });

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState);

        localStorage.setItem('@ignite-timer:cycle-state', stateJSON);
    }, [cyclesState]);
 



    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds);
    }

    function handleFinishedCycle() {

        dispatch(finishedCycle())
    }


    function creteNewCycles({task, time}: CreateCycleData) {
        const newCycle:Cycle = {
            id: new Date().getTime().toString(),
            task: task,
            time: time,
            startedAt: new Date(),
        }

        dispatch(addNewCycle(newCycle));
        setAmountSecondsPassed(0);
    } 

    function interrupedCycles() {
        dispatch(interruptedCycle());
    };

    
    return (
        <CycleContext.Provider 
            value={{
                cycles,
                activeCycle,
                activeCyclesId,
                handleFinishedCycle,
                amountSecondsPassed,
                setSecondsPassed,
                creteNewCycles,
                interrupedCycles
            }}
        >
            {children}
        </CycleContext.Provider>
    )
}