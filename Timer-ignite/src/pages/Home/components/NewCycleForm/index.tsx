import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CycleContext } from "../../../../contexts/CyclesContext";
import {
    FormContainer,
    MinutesInput,
    TaskInput
} from "./style";

export function NewCycleForm() {

    const { activeCycle } = useContext(CycleContext);
    const { register } = useFormContext();

    return(
        <FormContainer>
        <label htmlFor="task">Vou trabalhar em</label>
        <TaskInput 
            type="text"
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para seu projeto"
            disabled={!!activeCycle}
            {...register("task")}
        />

        <datalist id="task-suggestions">
            <option value=""/>
        </datalist>

        <label htmlFor="time">Durante</label>
        <MinutesInput 
            type="number"
            id="time"
            placeholder="00"
            min={1}
            // step={5}
            max={60}
            disabled={!!activeCycle}
            {...register("time", {valueAsNumber: true})}
        />

        <span>minutos.</span>
    </FormContainer>
    );
}