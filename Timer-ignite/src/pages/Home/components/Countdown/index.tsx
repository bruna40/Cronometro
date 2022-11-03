import { differenceInSeconds } from "date-fns";
import { useContext, useEffect } from "react";
import { CycleContext } from "../../../../contexts/CyclesContext";
import { CountdownContainer, Separator } from "./style";

export function Countdown() {

    const { 
        activeCycle,
        activeCyclesId,
        handleFinishedCycle,
        amountSecondsPassed,
        setSecondsPassed,
    } = useContext(CycleContext)

    const totalSeconds = activeCycle ? activeCycle.time * 60 : 0;

    useEffect(() => {
        let interval: number;

        if(activeCycle) {
            interval = setInterval(() => {
                const difference= differenceInSeconds(new Date(), activeCycle.startedAt);

                if(difference >= totalSeconds) {
                    handleFinishedCycle();
                    setSecondsPassed(totalSeconds);
                }else {
                    setSecondsPassed(difference);
                }
                
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        }
    }, [activeCycle, totalSeconds, activeCyclesId, handleFinishedCycle, setSecondsPassed]);


    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;


    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2, '0');
    const seconds = String(secondsAmount).padStart(2, '0');

    useEffect(() => {
        document.title = `${minutes}:${seconds}`;
    }, [minutes, seconds, activeCycle]);

    return(
        <CountdownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountdownContainer>
    )
}