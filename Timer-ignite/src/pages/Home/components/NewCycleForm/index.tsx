import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as zod from 'zod';
import {
    FormContainer,
    MinutesInput,
    TaskInput
} from "./style";


const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    time: zod.number().min(1).max(60, 'O ciclo deve durar no máximo 60 minutos'),
})
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function NewCycleForm() {

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver:zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            time: 0,
        }

    });

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
            // step={5}
            max={60}
            disabled={!!activeCycle}
            {...register("time", {valueAsNumber: true})}
        />

        <span>minutos.</span>
    </FormContainer>
    );
}