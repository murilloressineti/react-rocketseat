import React, { useState } from "react";

import { toast } from "sonner";

import { Schedule } from "../features";
import { Button, DateInput, Icon, Input, Text } from "../ui";

import { UserSquare } from "../../assets/icons";

interface Appointment {
  id: string;
  date: string;
  time: string;
  client: string;
}

interface AppointmentFormProps {
  today: string
  selectedDate: string;
  onDateChange: (date: string) => void;

  appointments: Appointment[];
  onCreateAppointment: (appointment: Appointment) => void;
}

export default function AppointmentForm({
  today,
  selectedDate,
  onDateChange,

  appointments,
  onCreateAppointment,
}: AppointmentFormProps) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null); // Aqui é feito um lifting state up para que o estado do horário selecionado seja gerenciado pelo componente pai.
  const [client, setClient] = useState("");

  const unavailableTimes = appointments
    .filter((appointment) => appointment.date === selectedDate)
    .map((appointment) => appointment.time);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedDate || !selectedTime || !client.trim()) {
      toast.error("Por favor, preencha todos os campos antes de agendar.");
      return;
    }

    const newAppoitment: Appointment = {
      id: crypto.randomUUID(),
      date: selectedDate,
      time: selectedTime,
      client,
    };

    onCreateAppointment(newAppoitment);
    toast.success("Agendamento criado com sucesso.");

    setSelectedTime(null);
    setClient("");
  }

  return (
    <section className="bg-bg-light p-10 md:p-20 w-full flex justify-center rounded-lg">
      <form onSubmit={handleSubmit} className="h-full md:w-84.5">
        <header className="flex flex-col gap-2">
          <Text
            as={"h1"}
            size={"title-lg"}
            textColor={"primary"}
            weight={"bold"}
          >
            Agende um atendimento
          </Text>

          <Text size={"sm"} textColor={"tertiary"}>
            Selecione data, horário e informe o nome do cliente para criar o
            agendamento
          </Text>
        </header>

        <div className="flex flex-col gap-8 my-6">
          <DateInput
            value={selectedDate}
            min={today}
            onChange={(event) => onDateChange(event.target.value)}
          />

          <Schedule
            selectedDate={selectedDate} // date
            selectedTime={selectedTime} // selectedTime
            onSelectTime={setSelectedTime} // setSelectedTime
            unavailableTimes={unavailableTimes}
          />

          <Input
            id="client"
            label="Cliente"
            leftSection={<Icon svg={UserSquare} />}
            placeholder="Nome do Cliente"
            value={client}
            onChange={(event) => setClient(event.target.value)}
          />
        </div>

        <Button type="submit" className="w-full uppercase">
          Agendar
        </Button>
      </form>
    </section>
  );
}
