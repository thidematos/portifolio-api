import {
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth,
  startOfToday,
  endOfWeek,
  startOfWeek,
  isToday,
  isSameMonth,
  isEqual,
  getMonth,
  add,
  parse,
  isSameDay,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";

function Calendar({ today, selectedDay, setSelectedDay, appointments }) {
  //PRECISO RENDERIZAR OS APPOINTMENTS JÁ FEITOS!

  const [currentMonth, setCurrentMonth] = useState(
    format(today, "MMM-yyyy", { locale: ptBR }),
  );
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date(), {
    locale: ptBR,
  });

  const monthDays = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  function handleMonth(minus = false) {
    const firstDayNextMonth = add(firstDayCurrentMonth, {
      months: minus ? -1 : 1,
    });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy", { locale: ptBR }));
  }

  useEffect(() => {
    setSelectedDay(firstDayCurrentMonth);
  }, [currentMonth, setSelectedDay]);

  return (
    <div className="flex w-full flex-col items-center justify-center  text-center">
      <div className="flex w-full flex-row items-center justify-between">
        <h2 className=" font-poppins text-lg text-gray-800">
          {format(firstDayCurrentMonth, "MMMM 'de' yyyy", { locale: ptBR })}
        </h2>
        <div className="flex flex-row items-center justify-center gap-4 font-noto text-2xl text-gray-700">
          <button onClick={() => handleMonth(true)}>{"<"}</button>
          <button onClick={() => handleMonth()}>{">"}</button>
        </div>
      </div>

      <div className="mt-6 grid w-full grid-cols-7 font-noto">
        <p>D</p>
        <p>S</p>
        <p>T</p>
        <p>Q</p>
        <p>Q</p>
        <p>S</p>
        <p>S</p>
      </div>

      <div className="grid w-full grid-cols-7 text-gray-800">
        {monthDays.map((day) => {
          const hasAppointment = appointments?.filter((task) =>
            isSameDay(day, task),
          );

          return (
            <Day
              key={day}
              hasAppointment={hasAppointment?.length > 0}
              isSelected={isEqual(day, selectedDay)}
              className={`${isSameMonth(day, firstDayCurrentMonth) ? "" : "text-gray-400"} ${isToday(day) ? " text-red-600" : " "}`}
              setSelected={() => setSelectedDay(day)}
            >
              {format(day, "dd")}
            </Day>
          );
        })}
      </div>
    </div>
  );
}

function Day({ children, className, isSelected, setSelected, hasAppointment }) {
  return (
    <div
      className={`py-4  text-center font-noto  ${className}`}
      onClick={setSelected}
    >
      <button
        className={`${hasAppointment ? "rounded-full bg-orange-500 p-1 text-gray-50" : ""} ${isSelected ? "rounded-full bg-blue-500/75 p-1 text-gray-50" : ""} ${isSelected && hasAppointment && "font-bold"} size-8 duration-150`}
      >
        {children}
      </button>
    </div>
  );
}

export default Calendar;
