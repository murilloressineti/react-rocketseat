import { useState, useEffect } from "react";

import { AppointmentForm, AppointmentsList } from "../components/features";

import { Logo } from "../assets/images";

interface Appointment {
  id: string;
  date: string;
  time: string;
  client: string;
}

export default function Home() {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const storedAppointments = localStorage.getItem("hairday:appointments");

    if (storedAppointments) {
      return JSON.parse(storedAppointments);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("hairday:appointments", JSON.stringify(appointments));
  }, [appointments]);

  // Função para lidar com a criação de um novo agendamento. Recebe um objeto do tipo Appointment e atualiza o estado de appointments adicionando o novo agendamento à lista existente.
  // O Spread operator(...) espalha os agendamentos atuais em um novo array e adiciona o novo agendamento no final, garantindo que a lista de agendamentos seja atualizada corretamente.
  function handleCreateAppointment(appointment: Appointment) {
    setAppointments((currentAppontments) => [
      ...currentAppontments,
      appointment,
    ]);
  }

  // Função para excluir agendamento
  function handleDeleteAppointment(id: string) {
    setAppointments((currentAppontments) =>
      currentAppontments.filter((appointment) => appointment.id !== id),
    );
  }

  return (
    <div className="min-h-screen bg-bg-default relative">
      <header className="absolute top-0 left-0">
        <div className="inline-flex rounded-br-xl bg-gray-600 px-2.5 py-1.5 md:px-5 md:py-3">
          <img src={Logo} alt="Logo Hair Day" />
        </div>
      </header>

      <main className="min-h-screen grid grid-cols-1 md:grid-cols-[auto_2fr] gap-3 p-3">
        <AppointmentForm
          today={today} // today
          selectedDate={selectedDate} // date
          onDateChange={setSelectedDate} // setDate

          appointments={appointments} // appointments
          onCreateAppointment={handleCreateAppointment} // setAppointments
        />

        <AppointmentsList
          selectedDate={selectedDate} // date
          onDateChange={setSelectedDate} // setDate

          appointments={appointments} // appointments
          onDeleteAppointment={handleDeleteAppointment} // setAppointments
        />
      </main>
    </div>
  );
}

{
  /*  
  AppointmentForm
  → cria um agendamento

  Home
  → guarda todos os agendamentos

  AppointmentsList
  → recebe os agendamentos para exibir
*/
}
