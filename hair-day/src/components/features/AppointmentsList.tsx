import { toast } from "sonner";

import { Button, DateInput, Icon, Text } from "../ui";

import { CloudSun, MoonStars, SunHorizon, Trash } from "../../assets/icons";

interface Appointment {
  id: string;
  date: string;
  time: string;
  client: string;
}

interface AppointmentsListProps {
  selectedDate: string;
  onDateChange: (date: string) => void;

  appointments: Appointment[];
  onDeleteAppointment: (id: string) => void;
}

// Função para extrair a hora de uma string de tempo no formato "HH:MM"
function getHour(time: string) {
  return Number(time.split(":")[0]);
}

// Função para formatar o nome do cliente
function formatClienteName(name: string) {
  return name
    .trim()
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function AppointmentsList({
  selectedDate,
  onDateChange,

  appointments,
  onDeleteAppointment,
}: AppointmentsListProps) {
  // Filtrar agendamentos pela data
  const appointmentsByDate = appointments
    .filter((appointments) => appointments.date === selectedDate)
    .sort((a, b) => a.time.localeCompare(b.time));

  // Separar manhã, tarde e noite
  const morningAppointments = appointmentsByDate.filter((appointments) => {
    const hour = getHour(appointments.time);

    return hour >= 9 && hour <= 12;
  });

  const afternoonAppointments = appointmentsByDate.filter((appointments) => {
    const hour = getHour(appointments.time);

    return hour >= 13 && hour <= 18;
  });

  const nightAppointments = appointmentsByDate.filter((appointments) => {
    const hour = getHour(appointments.time);

    return hour >= 19 && hour <= 21;
  });

  // Função para lidar com a exclusão de agendamento
  function handleDelete(id: string) {
    toast.custom((toastId) => (
      <div className="w-full min-w-sm rounded-lg border border-gray-600 bg-gray-700 p-4 shadow-lg">
        <Text size="title-sm" weight="bold" textColor="primary">
          Excluir agendamento?
        </Text>

        <Text size="sm" textColor="tertiary" className="mt-2">
          Essa ação não poderá ser desfeita.
        </Text>

        <div className="mt-4 flex justify-end gap-2">
          <Button
            variant="none"
            size="sm"
            onClick={() => toast.dismiss(toastId)}
            className="bg-yellow-light border hover:border-yellow-dark"
          >
            Cancelar
          </Button>

          <Button
            size="sm"
            onClick={() => {
              onDeleteAppointment(id);
              toast.dismiss(toastId);
              toast.success("Agendamento excluído com sucesso.");
            }}
          >
            Excluir
          </Button>
        </div>
      </div>
    ));
  }

  return (
    <section className="bg-bg-default p-10 md:p-20 w-full flex justify-center">
      <div className="w-170 h-full">
        <header className="flex flex-col gap-4 md:flex-row md:items-start  md:justify-between mb-8">
          <div className="flex flex-col gap-2">
            <Text
              as={"h2"}
              size={"title-lg"}
              textColor={"primary"}
              weight={"bold"}
            >
              Sua agenda
            </Text>
            <Text size={"sm"} textColor={"tertiary"}>
              Consulte os seus cortes de cabelo agendados por dia
            </Text>
          </div>

          <DateInput
            label=""
            value={selectedDate}
            onChange={(event) => onDateChange(event.target.value)}
            className="md:w-44"
          />
        </header>

        <div className="flex flex-col gap-3">
          {/* Manhã */}
          <section className="border border-gray-600 rounded-lg">
            <header className="flex items-center justify-between py-3 px-5 border-b border-gray-600">
              <div className="flex gap-3">
                <Icon svg={SunHorizon} />
                <Text as="h3" size={"sm"} textColor={"tertiary"}>
                  Manhã
                </Text>
              </div>
              <Text size={"sm"} textColor={"quaternary"}>
                09h-12h
              </Text>
            </header>

            <ul className="flex flex-col gap-1 p-5">
              {morningAppointments.length === 0 ? (
                <Text size="sm" textColor="quaternary">
                  Nenhum agendamento para este período.
                </Text>
              ) : (
                morningAppointments.map((appointment) => (
                  <li
                    key={appointment.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex gap-5 w-full">
                      <Text
                        size={"title-md"}
                        textColor={"secondary"}
                        weight={"bold"}
                      >
                        {appointment.time}
                      </Text>
                      <Text textColor={"secondary"}>
                        {formatClienteName(appointment.client)}
                      </Text>
                    </div>

                    <Button variant={"none"} size={"sm"}>
                      <Icon
                        svg={Trash}
                        size={"sm"}
                        className="group-hover:fill-yellow-dark"
                        onClick={() => handleDelete(appointment.id)}
                      />
                    </Button>
                  </li>
                ))
              )}
            </ul>
          </section>

          {/* Tarde */}
          <section className="border border-gray-600 rounded-lg">
            <header className="flex items-center justify-between py-3 px-5 border-b border-gray-600">
              <div className="flex gap-3">
                <Icon svg={CloudSun} />
                <Text as="h3" size={"sm"} textColor={"tertiary"}>
                  Tarde
                </Text>
              </div>
              <Text size={"sm"} textColor={"quaternary"}>
                13h-18h
              </Text>
            </header>

            <ul className="flex flex-col gap-1 p-5">
              {afternoonAppointments.length === 0 ? (
                <Text size="sm" textColor="quaternary">
                  Nenhum agendamento para este período.
                </Text>
              ) : (
                afternoonAppointments.map((appointment) => (
                  <li
                    key={appointment.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex gap-5 w-full">
                      <Text
                        size={"title-md"}
                        textColor={"secondary"}
                        weight={"bold"}
                      >
                        {appointment.time}
                      </Text>
                      <Text textColor={"secondary"}>
                        {formatClienteName(appointment.client)}
                      </Text>
                    </div>

                    <Button variant={"none"} size={"sm"}>
                      <Icon
                        svg={Trash}
                        size={"sm"}
                        className="group-hover:fill-yellow-dark"
                        onClick={() => handleDelete(appointment.id)}
                      />
                    </Button>
                  </li>
                ))
              )}
            </ul>
          </section>

          {/* Noite */}
          <section className="border border-gray-600 rounded-lg">
            <header className="flex items-center justify-between py-3 px-5 border-b border-gray-600">
              <div className="flex gap-3">
                <Icon svg={MoonStars} />
                <Text as="h3" size={"sm"} textColor={"tertiary"}>
                  Noite
                </Text>
              </div>
              <Text size={"sm"} textColor={"quaternary"}>
                19h-21h
              </Text>
            </header>

            <ul className="flex flex-col gap-1 p-5">
              {nightAppointments.length === 0 ? (
                <Text size="sm" textColor="quaternary">
                  Nenhum agendamento para este período.
                </Text>
              ) : (
                nightAppointments.map((appointment) => (
                  <li
                    key={appointment.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex gap-5 w-full">
                      <Text
                        size={"title-md"}
                        textColor={"secondary"}
                        weight={"bold"}
                      >
                        {appointment.time}
                      </Text>
                      <Text textColor={"secondary"}>
                        {formatClienteName(appointment.client)}
                      </Text>
                    </div>

                    <Button variant={"none"} size={"sm"}>
                      <Icon
                        svg={Trash}
                        size={"sm"}
                        className="group-hover:fill-yellow-dark"
                        onClick={() => handleDelete(appointment.id)}
                      />
                    </Button>
                  </li>
                ))
              )}
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}
