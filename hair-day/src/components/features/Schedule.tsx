import { Text, TimeSelect } from "../ui";

const MORNING_TIMES = ["09:00", "10:00", "11:00", "12:00"];

const AFTERNOON_TIMES = ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

const NIGHT_TIMES = ["19:00", "20:00", "21:00"];

interface ScheduleProps {
  selectedTime: string | null;
  onSelectTime: (time: string | null) => void;
  unavailableTimes: string[];

  selectedDate: string;
}

export default function Schedule({
  selectedTime, // selectedTime
  onSelectTime, // setSelectedTime

  unavailableTimes,

  selectedDate,
}: ScheduleProps) {
  // Função para atualizar o estado e fazer o toggle do horário selecionado.
  function handleSelectTime(time: string) {
    onSelectTime(selectedTime === time ? null : time);
  }

  // Função para verificar se o horário já passou. Compara a data e hora atual com a data e hora do agendamento.
  function isPastTime(time: string) {
    const now = new Date();

    const today = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0"),
    ].join("-");

    if (selectedDate !== today) {
      return false;
    }

    const [hour, minute] = time.split(":").map(Number);

    const appointmentTime = new Date();

    appointmentTime.setHours(hour, minute, 0, 0);

    return appointmentTime <= now;
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <Text as={"label"} size="title-md" weight="bold" textColor="secondary">
        Horários
      </Text>

      <div className="flex flex-col gap-3">
        {/* Manhã */}
        <section className="flex flex-col gap-2">
          <Text size={"sm"} textColor={"tertiary"}>
            Manhã
          </Text>
          <div className="grid grid-cols-4 gap-2">
            {MORNING_TIMES.map((time) => {
              const isUnavailable = unavailableTimes.includes(time);

              const hasPassed = isPastTime(time);

              const isDisabled = isUnavailable || hasPassed;
              return (
                <TimeSelect
                  key={time}
                  time={time}
                  selected={selectedTime === time} // Verifica se o horário atual é o selecionado
                  disabled={isDisabled} // Desabilita o botão se o horário estiver na lista de horários indisponíveis
                  onClick={() => handleSelectTime(time)} // Captura o clique e atualiza o estado do horário selecionado
                />
              );
            })}
          </div>
        </section>

        {/* Tarde */}
        <section className="flex flex-col gap-2">
          <Text size={"sm"} textColor={"tertiary"}>
            Tarde
          </Text>
          <div className="grid grid-cols-4 gap-2">
            {AFTERNOON_TIMES.map((time) => {
              const isUnavailable = unavailableTimes.includes(time);

              const hasPassed = isPastTime(time);

              const isDisabled = isUnavailable || hasPassed;
              return (
                <TimeSelect
                  key={time}
                  time={time}
                  selected={selectedTime === time} // Verifica se o horário atual é o selecionado
                  disabled={isDisabled} // Desabilita o botão se o horário estiver na lista de horários indisponíveis
                  onClick={() => handleSelectTime(time)} // Captura o clique e atualiza o estado do horário selecionado
                />
              );
            })}
          </div>
        </section>

        {/* Noite */}
        <section className="flex flex-col gap-2">
          <Text size={"sm"} textColor={"tertiary"}>
            Noite
          </Text>
          <div className="grid grid-cols-4 gap-2">
            {NIGHT_TIMES.map((time) => {
              const isUnavailable = unavailableTimes.includes(time);

              const hasPassed = isPastTime(time);

              const isDisabled = isUnavailable || hasPassed;
              return (
                <TimeSelect
                  key={time}
                  time={time}
                  selected={selectedTime === time} // Verifica se o horário atual é o selecionado
                  disabled={isDisabled} // Desabilita o botão se o horário estiver na lista de horários indisponíveis
                  onClick={() => handleSelectTime(time)} // Captura o clique e atualiza o estado do horário selecionado
                />
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
