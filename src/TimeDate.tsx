import { useState, useEffect } from "react";

const TimeDate = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setTimeout(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [time]);

  const getTimeString = () => {
    return time
      .toLocaleString([], {
        hour: "numeric",
        minute: "numeric",
        hourCycle: "h12",
      })
      .slice(0, -3);
  };

  const getPeriodOfDay = () => {
    return time.toLocaleString([], {
      dayPeriod: "long",
    });
  };

  const getDateString = () => {
    return time.toLocaleDateString([], {
      weekday: "long",
      day: "2-digit",
      month: "long",
    });
  };

  return (
    <div>
      <div className="flex items-end">
        <span className="text-9xl">{getTimeString()}</span>
        <span className="text-3xl m-4 font-light">{getPeriodOfDay()}</span>
      </div>
      <div className="my-5 ml-2">
        <span className="text-5xl font-light">{getDateString()}</span>
      </div>
    </div>
  );
};

export default TimeDate;
