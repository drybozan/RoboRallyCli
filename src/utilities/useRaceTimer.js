// useRaceTimer.js

import { useState, useEffect } from 'react';
import RoboRallyServerService from '../services/RoboRallyServerService';

const useRaceTimer = (numOfSections) => {
  const roboRallyServerService = new RoboRallyServerService();
  const [timers, setTimers] = useState([]);

  const initializeTimers = () => {
    const initialTimers = Array(numOfSections).fill({
      id: 0,
      isRunning: false,
      time: { minutes: 0, seconds: 0, milliseconds: 0 },
    });
    setTimers(initialTimers);
  };

  const formatTime = (time) => {
    const minutes = time.minutes.toString().padStart(2, '0');
    const seconds = time.seconds.toString().padStart(2, '0');
    const milliseconds = time.milliseconds.toString().padStart(3, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  const startTimer = (id, index) => {
    console.log("start timer id ", id)
    console.log("start timer index ", index)
    setTimers((prevTimers) => {
      const updatedTimers = [...prevTimers];
      updatedTimers[index] = {
        ...updatedTimers[index],
        isRunning: true,
        id: id
      };

      //console.log("start updatedTimers ", formatTime(updatedTimers[0].time))
      return updatedTimers;
    });
  };

  const stopTimer = (id, index) => {
    console.log("stop timer id ", id)
    console.log("stop timer index ", index)
    setTimers((prevTimers) => {
      const updatedTimers = [...prevTimers];
      updatedTimers[index] = {
        ...updatedTimers[index],
        isRunning: false,
      };
      return updatedTimers;
    });
  };

  const getElapsedTime = (index) => {
    return timers[index] ? timers[index].time : { minutes: 0, seconds: 0, milliseconds: 0 };
  };

  useEffect(() => {
    initializeTimers();
  }, [numOfSections]);

  useEffect(() => {
    const intervalIds = timers.map((timer, index) => {
      if (timer.isRunning) {
        return setInterval(() => {
          setTimers((prevTimers) => {
            const updatedTimers = [...prevTimers];
            const newMilliseconds = timer.time.milliseconds + 10;

            if (newMilliseconds === 1000) {
              updatedTimers[index].time = {
                minutes: timer.time.minutes,
                seconds: timer.time.seconds + 1,
                milliseconds: 0,
              };
            } else if (timer.time.seconds === 60) {
              updatedTimers[index].time = {
                minutes: timer.time.minutes + 1,
                seconds: 0,
                milliseconds: 0,
              };
            } else {
              updatedTimers[index].time = {
                ...timer.time,
                milliseconds: newMilliseconds,
              };
            }

            return updatedTimers;
          });
        }, 10);
      }

      return null;
    });

    timers.map((timer, index) => {

      if(timer.id !== 0){

      roboRallyServerService.updateDurationById(timer.id,formatTime(timer.time)).then(result => {
  
        //console.log("updateDurationById id :",timer.id)
        //console.log(result)
  
        if (result.data.success === true) {
          console.log(result.data.message)
        } else {
          //console.log(result.data.message)
        }
      }).catch(e => {
        console.error(e);
      })
      }

    });

// Temizleme işlemi
return () => {
    intervalIds.forEach((id) => clearInterval(id));
  };
}, [timers]);


return {
  timers,
  startTimer,
  stopTimer,
  getElapsedTime,
};
};

export default useRaceTimer;
