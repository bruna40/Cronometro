import { Play } from "phosphor-react";
import { 
    ButtonContainer,
    CountdownContainer,
    FormContainer,
    HomeContainer,
    MinutesInput,
    Separator, 
    TaskInput
} from "./style";

export function Home() {
    return (
        <HomeContainer>
            <form>
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput 
                        type="text"
                        id="task"
                        placeholder="Dê um nome para seu projeto"
                    />

                    <label htmlFor="time">Durante</label>
                    <MinutesInput 
                        type="number"
                        id="time"
                        placeholder="00"
                    />

                    <span>minutos.</span>
                </FormContainer>
                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <ButtonContainer disabled type="submit">
                    <Play size={24} />
                    Começar
                </ButtonContainer>
            </form>
        </HomeContainer>
    )
}