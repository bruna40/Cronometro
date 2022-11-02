import { 
    HistoryContainer,
    HistoryList,
    Status
} from "./style";

export function History() {
    return (
        <HistoryContainer>
            <h1>Meu histórico</h1>
            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Estudar React</td>
                            <td>25 minutos</td>
                            <td>Há cerca de 2 meses</td>
                            <td>
                            <Status statusColor="green">Concluído</Status>
                            </td>
                        </tr>
                        <tr>
                            <td>Estudar React</td>
                            <td>25 minutos</td>
                            <td>Há cerca de 2 meses</td>
                            <td>
                            <Status statusColor="green">Concluído</Status>
                            </td>
                        </tr>
                        <tr>
                            <td>Estudar React</td>
                            <td>25 minutos</td>
                            <td>Há cerca de 2 meses</td>
                            <td>
                            <Status statusColor="green">Concluído</Status>
                            </td>
                        </tr>
                        <tr>
                            <td>Estudar React</td>
                            <td>25 minutos</td>
                            <td>Há cerca de 2 meses</td>
                            <td>
                            <Status statusColor="green">Concluído</Status>
                            </td>
                        </tr>
                        <tr>
                            <td>Estudar React</td>
                            <td>25 minutos</td>
                            <td>Há cerca de 2 meses</td>
                            <td>
                            <Status statusColor="green">Concluído</Status>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </HistoryList>
        </HistoryContainer>
    )
}