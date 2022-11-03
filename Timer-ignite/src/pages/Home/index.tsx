import { HandPalm, Play  } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';
import { 
    ButtonContainer,
    HomeContainer,
    StopButtonContainer,
} from "./style";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { CycleContext } from "../../contexts/CyclesContext";
import { useContext } from "react";


const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    time: zod.number().min(1).max(60, 'O ciclo deve durar no máximo 60 minutos'),
})
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;


export function Home() {

    const { creteNewCycles, interrupedCycles, activeCycle } = useContext(CycleContext);

    const newCycleForm = useForm<NewCycleFormData>({
        resolver:zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            time: 0,
        }

    });

    const { handleSubmit, reset, watch } = newCycleForm;

    function handleCreateNewCycle({task, time}: NewCycleFormData) {
        creteNewCycles({task, time });
        reset();
    }

    const task = watch("task");
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormProvider {...newCycleForm }>
                    <NewCycleForm />
                </FormProvider>
                <Countdown/>

            {
                activeCycle ? (
                    <StopButtonContainer onClick={interrupedCycles}  type="button">
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