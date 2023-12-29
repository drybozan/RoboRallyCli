// useRaceTimer.js

import { useState, useEffect, useRef } from 'react';
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

  useEffect(() => {
    initializeTimers();
  }, [competitors.length]);


  const startTimer = (id) => {

    console.log("Start timer for id: ", id);


    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id ? { ...timer, isRunning: true } : timer
      )
    );

    const getCurrentDateTime = () => new Date().toLocaleString('tr-TR');
    console.log("getCurrentDateTime : ", getCurrentDateTime());
    roboRallyServerService.updateStartTimeById(id, getCurrentDateTime())
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

  const stopTimer = (id) => {

    console.log("Stop timer for id: ", id);

    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id ? { ...timer, isRunning: false } : timer
      )
    );

    const getCurrentDateTime = () => new Date().toLocaleString('tr-TR');
    console.log("getCurrentDateTime : ", getCurrentDateTime());

    roboRallyServerService.updateStopTimeById(id, getCurrentDateTime())
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




  // const getElapsedTime2 = (index) => {
  //   return timers[index] ? timers[index].time : { minutes: 0, seconds: 0, milliseconds: 0 };
  // };

  const getElapsedTime =  () => {
    return timers;
  };

  return {
    startTimer,
    stopTimer,
    getElapsedTime

  };
};


export default useRaceTimer;
