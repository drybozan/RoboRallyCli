// useRaceTimer.js

import { useState, useEffect } from 'react';
import RoboRallyServerService from '../services/RoboRallyServerService';

const useRaceTimer = (competitors) => {

  const roboRallyServerService = new RoboRallyServerService();
  const [timers, setTimers] = useState([]);

  const initializeTimers = () => {
    const initialTimers = competitors.map((competitor) => ({
      id: competitor.id,
      city: competitor.city,
      name: competitor.name,
      eliminated: competitor.eliminated,
      isRunning: false,
      time: { minutes: 0, seconds: 0, milliseconds: 0 }
    }));
    setTimers(initialTimers);
  };

  const formatTime = (time) => {
    const minutes = time.minutes.toString().padStart(2, '0');
    const seconds = time.seconds.toString().padStart(2, '0');
    const milliseconds = time.milliseconds.toString().padStart(3, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  const startTimer = (id) => {
 
    console.log("gdddd");

    console.log("Start timer for id: ", id);
    const getCurrentDateTime = () => new Date().toLocaleString('tr-TR');
    console.log("getCurrentDateTime : ", getCurrentDateTime );
    roboRallyServerService.updateStartTimeById(id,getCurrentDateTime )
      .then((result) => {
        if (result.data.success === true) {
          console.log(result.data.message);
        } else {
          console.log(result.data.message);
        }
      })
      .catch((e) => {
        console.error(e);
      });


    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id ? { ...timer, isRunning: true } : timer
      )
    );

   

  };

  const stopTimer = (id) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id ? { ...timer, isRunning: false } : timer
      )
    );

    const getCurrentDateTime = () => new Date().toLocaleString('tr-TR');
    roboRallyServerService
      .updateDurationById(id,getCurrentDateTime )
      .then((result) => {
        if (result.data.success === true) {
          console.log(result.data.message);
        } else {
          console.log(result.data.message);
        }
      })
      .catch((e) => {
        console.error(e);
      });

  };

  useEffect(() => {
    initializeTimers();
  }, [competitors.length]);

  useEffect(() => {
    const intervalIds = [];


    timers.forEach((timer, index) => {
      if (timer.isRunning) {
        const intervalId = setInterval(() => {
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

            // if (timer.id !== 0) {
            //   roboRallyServerService
            //     .updateDurationById(timer.id, formatTime(timer.time))
            //     .then((result) => {
            //       if (result.data.success === true) {
            //         console.log(result.data.message);
            //       } else {
            //         console.log(result.data.message);
            //       }
            //     })
            //     .catch((e) => {
            //       console.error(e);
            //     });
            //}

            return updatedTimers;
          });
        }, 10);

        intervalIds.push(intervalId);
      }
    });

    // Temizleme işlemi
    return () => {
      intervalIds.forEach((id) => clearInterval(id));
    };
  }, [timers]);


  // const getElapsedTime = (index) => {
  //   return timers[index] ? timers[index].time : { minutes: 0, seconds: 0, milliseconds: 0 };
  // };

  const getElapsedTime = () => {
    return timers;
  };

  return {
    startTimer,
    stopTimer,
    getElapsedTime,
  };
};


export default useRaceTimer;
