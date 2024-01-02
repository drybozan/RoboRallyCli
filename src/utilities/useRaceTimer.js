// useRaceTimer.js

import { useState, useEffect, useRef } from 'react';
import RoboRallyServerService from '../services/RoboRallyServerService';

const useRaceTimer = (competitors) => {


  const roboRallyServerService = new RoboRallyServerService();
  const [timers, setTimers] = useState([]);

  // const initializeTimers = () => {
  //   const initialTimers = competitors.map((competitor) => ({
  //     id: competitor.id,
  //     city: competitor.city,
  //     name: competitor.name,
  //     eliminated: competitor.eliminated,
  //     isRunning: false,
  //     time: { minutes: 0, seconds: 0, milliseconds: 0 }
  //   }));
  //   setTimers(initialTimers);
  // };

  useEffect(() => {
    initializeTimers();
  }, [competitors.length]);

  const initializeTimers = () => {
    const initialTimers = competitors.map((competitor) => ({
      id: competitor.id,
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
    // Bu dizide zamanlayıcıların ID'lerini saklamak için kullanılacak bir dizi oluşturuyoruz.
    const intervalIds = [];
  
    // timers dizisindeki her bir zamanlayıcı için işlemleri gerçekleştiriyoruz.
    timers.forEach((timer, index) => {
      // Eğer zamanlayıcı çalışıyorsa, belirli bir aralıklarla çalışan bir zamanlayıcı başlatıyoruz.
      if (timer.isRunning) {
        // setInterval fonksiyonu kullanılarak belirli bir aralıkta çalışan bir fonksiyon tanımlıyoruz.
        const intervalId = setInterval(() => {
          // setTimers fonksiyonu ile timer state'ini güncelliyoruz.
          setTimers((prevTimers) => {
            // State'in mevcut durumunu kopyalıyoruz.
            const updatedTimers = [...prevTimers];
            // Zamanlayıcıya 10 milisaniye ekliyoruz.
            const newMilliseconds = timer.time.milliseconds + 10;
  
            // Zamanlayıcı 1 saniyeye ulaştığında
            if (newMilliseconds === 1000) {
              updatedTimers[index].time = {
                minutes: timer.time.minutes,
                seconds: timer.time.seconds + 1,
                milliseconds: 0,
              };
            }
            // Zamanlayıcı 1 dakikaya ulaştığında
            else if (timer.time.seconds === 60) {
              updatedTimers[index].time = {
                minutes: timer.time.minutes + 1,
                seconds: 0,
                milliseconds: 0,
              };
            }
            // Diğer durumlar
            else {
              updatedTimers[index].time = {
                ...timer.time,
                milliseconds: newMilliseconds,
              };
            }
  
            // Güncellenmiş zamanlayıcı durumunu döndürüyoruz.
            return updatedTimers;
          });
        }, 10); // 10 milisaniye aralıklarla çalışacak.
  
        // Oluşturulan zamanlayıcı ID'sini intervalIds dizisine ekliyoruz.
        intervalIds.push(intervalId);
      }
    });
    
    timers.map((timer, index) => {

      if(timer.id !== 0 &&  formatTime(timer.time) !== "00:00:000"){

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
