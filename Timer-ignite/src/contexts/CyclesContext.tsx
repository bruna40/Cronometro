import { createContext, useState } from 'react';

interface CreateCycleData {
    task: string;
    time: number;
}


interface Cycle {
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
}


export const CycleContext = createContext({} as CyclesContextType);

export function CycleProvider({ children }: CyclesContextProviderProps) {

    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCyclesId, setActiveCyclesId] = useState<string | null >(null);
    const [ amountSecondsPassed, setAmountSecondsPassed ] = useState(0);

    const activeCycle = cycles.find(cycle => cycle.id === activeCyclesId);

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds);
    }

    function handleFinishedCycle() {
        setCycles((state) => state.map(cycle => {
            if(cycle.id === activeCyclesId) {
                return {
                    ...cycle,
                    finished: new Date(),
                }
            }
            return cycle;
        }));
    }


    function creteNewCycles({task, time}: CreateCycleData) {
        const newCycle:Cycle = {
            id: new Date().getTime().toString(),
            task: task,
            time: time,
            startedAt: new Date(),
        }

        setCycles((state) => [...state, newCycle]);
        setActiveCyclesId(newCycle.id);
        setAmountSecondsPassed(0);
    } 

    function interrupedCycles() {
        setActiveCyclesId(null);
        setCycles((state) => state.map(cycle => {
            if(cycle.id === activeCyclesId) {
                return {
                    ...cycle,
                    interruptedDate: new Date(),
                }
            }

            return cycle;
        }));
        setActiveCyclesId(null);
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