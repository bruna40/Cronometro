import { HandPalm, Play  } from "phosphor-react";
import { differenceInSeconds } from 'date-fns'

import { 
    ButtonContainer,
    HomeContainer,
    StopButtonContainer,
} from "./style";
import { useState, useEffect } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";



interface Cycle {
    id: string;
    task: string;
    time: number;
    startedAt: Date;
    finished?: Date;

}


export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCyclesId, setActiveCyclesId] = useState<string | null >(null);

    const activeCycle = cycles.find(cycle => cycle.id === activeCyclesId);
    const totalSeconds = activeCycle ? activeCycle.time * 60 : 0;


    useEffect(() => {
        let interval: number;

        if(activeCycle) {
            interval = setInterval(() => {
                const difference= differenceInSeconds(new Date(), activeCycle.startedAt);

                if(difference >= totalSeconds) {
                    setCycles((state) => state.map(cycle => {
                        if(cycle.id === activeCyclesId) {
                            return {
                                ...cycle,
                                finished: new Date(),
                            }
                        }
                        return cycle;
                    }));

                    setAmountSecondsPassed(totalSeconds);
                }else {
                    setAmountSecondsPassed(difference);
                }
                
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        }
    }, [activeCycle, totalSeconds]);

    function handleCreateNewCycle({task, time}: NewCycleFormData) {
        const newCycle:Cycle = {
            id: new Date().getTime().toString(),
            task: task,
            time: time,
            startedAt: new Date(),
        }

        setCycles((state) => [...state, newCycle]);
        setActiveCyclesId(newCycle.id);
        setAmountSecondsPassed(0);

        reset();
    } 

    function handleStopCycle() {
        setActiveCyclesId(null);
        setCycles((state) => state.map(cycle => {
            if(cycle.id === activeCyclesId) {
                return {
                    ...cycle,
                    finishedAt: new Date(),
                }
            }

            return cycle;
        }));
        setActiveCyclesId(null);
    };

  

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;


    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2, '0');
    const seconds = String(secondsAmount).padStart(2, '0');


    useEffect(() => {
        document.title = `${minutes}:${seconds}`;
    }, [minutes, seconds, activeCycle]);

    const task = watch("task");
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <NewCycleForm />
                <Countdown />
            {
                activeCycle ? (
                    <StopButtonContainer onClick={handleStopCycle}  type="button">
                        <HandPalm size={24} />
                        Interromper
                    </StopButtonContainer>
                ) : (
                    <ButtonContainer disabled={isSubmitDisabled} type="submit">
                        <Play size={24} />
                        Começar
                    </ButtonContainer>
                )
            }
            </form>
        </HomeContainer>
    )
}