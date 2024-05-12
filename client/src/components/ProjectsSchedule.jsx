import { useParams } from "react-router-dom";
import Calendar from "../Utils/Calendar";
import { useState } from "react";
import {
  format,
  isEqual,
  isSameDay,
  setHours,
  setMinutes,
  startOfToday,
} from "date-fns";
import { is, ptBR } from "date-fns/locale";
import Button from "../Utils/Button";
import axios from "axios";
import useGet from "../hooks/useGet";
import Loader from "../Utils/Loader";
import Error from "../Utils/Error";

function ProjectsSchedule() {
  const { requestId } = useParams();
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [projectRequest, setProjectRequest] = useState(null);

  const appointments = projectRequest?.schedules.map((schedule) => {
    return {
      ...schedule,
      scheduledAt: new Date(schedule.scheduledAt.toLocaleString()),
    };
  });

  const todayAppointments = appointments?.filter((task) =>
    isSameDay(selectedDay, task.scheduledAt),
  );

  //PRECISO RENDERIZAR OS APPOINTMENTS JÁ FEITOS NO CALENDÁRIO! SE JÁ HOUVER UM APPOINTMENT NO SELECTED DAY, quero renderizar um iconzinho do appointment e um button para criar nova atividade.

  useGet(
    setProjectRequest,
    "projectRequest",
    `/api/v1/project-requests/${requestId}`,
    true,
    setIsLoading,
    setError,
  );

  return (
    <div className="relative flex w-full grow flex-col items-center justify-start gap-8 px-6 font-poppins ">
      <h1 className="text-xl text-gray-800">AGENDAMENTO</h1>
      {isLoading && (
        <Loader size={120} position={"absolute centerDivAbsolute"} />
      )}
      {error && (
        <Error
          message={error}
          path={`/admin/dashboard/project-requests/${requestId}`}
        />
      )}
      {!isLoading && !error && (
        <>
          <Calendar
            today={today}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            appointments={appointments?.map((task) => task.scheduledAt)}
          />
          {todayAppointments?.length > 0 &&
            todayAppointments.map((task) => (
              <Appointment key={task._id} appointment={task} />
            ))}

          <NewTask
            day={selectedDay}
            requestId={requestId}
            setters={{
              projectRequest: setProjectRequest,
              isLoading: setIsLoading,
              error: setError,
            }}
          />
        </>
      )}
    </div>
  );
}

function Appointment({ appointment }) {
  console.log(appointment);
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 rounded border border-dashed border-blue-500 p-3 font-poppins shadow">
      <div>
        <p className="text-center text-lg text-orange-500 drop-shadow-sm">
          {appointment?.title.toUpperCase()}
        </p>
        <p className="text-center text-xs text-gray-500 drop-shadow-sm">
          {format(
            appointment.scheduledAt,
            "dd 'de' MMM'. de' yyyy '|' kk':'mm",
            {
              locale: ptBR,
            },
          )}
        </p>
      </div>
      <p className="text-sm text-gray-800 drop-shadow-sm">
        {appointment.description}
      </p>
    </div>
  );
}

function NewTask({ day, requestId, setters }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  async function handleSchedule() {
    const scheduleData = createSchedule();

    if (!scheduleData) return;

    try {
      setters.isLoading(true);
      const res = await axios.post("/api/v1/schedule", scheduleData, {
        withCredentials: true,
      });

      setters.projectRequest(res.data.data.projectRequest);
    } catch (err) {
      console.log(err);
      setters.error(err.response.data.message);
    } finally {
      setters.isLoading(false);
    }
  }

  function createSchedule() {
    if (!time || !description || !title) return;

    const [hour, minute] = time.split(":");

    const scheduledAt = setMinutes(setHours(day, hour), minute);

    const schedule = {
      title,
      description,
      scheduledAt,
      requestId,
    };

    return schedule;
  }

  return (
    <div className="relative flex w-full flex-col items-center justify-start gap-6">
      <img
        src="/arrow-y-icon.png"
        className={`absolute right-2 top-5 w-[10%] drop-shadow-xl duration-150 ${isExpanded ? "rotate-180" : ""} `}
        onClick={() => setIsExpanded((state) => !state)}
      />
      <div className="flex flex-col items-center justify-center gap-2">
        <h3 className="text-lg text-gray-800">NOVA ATIVIDADE</h3>
        <p className="text-sm text-blue-500 underline underline-offset-2">
          {format(day, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
        </p>
      </div>
      <div
        className={`${isExpanded ? "h-full opacity-100" : "h-0 overflow-y-hidden opacity-0"} mb-6 flex w-full flex-col items-center justify-start gap-6 duration-300 ease-in-out`}
      >
        <div className="flex w-[80%] flex-col items-start justify-center gap-2">
          <label htmlFor="title" className="text-gray-500">
            TÍTULO
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full rounded border ${title ? "border-blue-500" : "border-gray-300"} p-2 text-sm text-gray-800 shadow outline-none focus:border-orange-500`}
            placeholder="Reunião de alinhamento"
          />
        </div>
        <div className="flex flex-col items-start justify-center gap-2">
          <label htmlFor="description" className="text-gray-500">
            DESCRIÇÃO
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full rounded border ${description ? "border-blue-500" : "border-gray-300"} p-2 text-sm text-gray-800 shadow outline-none focus:border-orange-500`}
            cols={38}
            rows={4}
            placeholder="Apresentar o projeto e proposta de cronograma"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <label htmlFor="time" className="text-gray-500">
            HORÁRIO
          </label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={`${time ? "border-blue-500" : "border-gray-300"} rounded  border  px-4 py-2 text-xl text-gray-800 shadow outline-none focus:border-orange-500`}
          />
        </div>
        {title && description && time ? (
          <Button
            type="action"
            onAction={() => handleSchedule()}
            fontSize={`text-lg`}
            margin={"my-4"}
          >
            AGENDAR
          </Button>
        ) : (
          <p className="my-4 w-[70%] text-center text-sm text-gray-400">
            Preencha todos os campos para agendar uma atv.
          </p>
        )}
      </div>
    </div>
  );
}

export default ProjectsSchedule;
