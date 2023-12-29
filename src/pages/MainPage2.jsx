import React from 'react'
import { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RoboRallyServerService from '../services/RoboRallyServerService';
import useRaceTimer from '../utilities/useRaceTimer';


export default function MainPage2() {

    const [screenWidth, setScreenWidth] = useState(window.innerWidth); //tarayıcı penceresinin mevcut genişliği  
    const [screenHeight, setScreenHeight] = useState(window.innerHeight); // tarayıcı penceresinin mevcut yüksekliği

    const navigate = useNavigate();
    const roboRallyServerService = new RoboRallyServerService();

    //yarismacı guncelleme modalı için
    const [showUpdate, setShowUpdate] = useState(false);


    const [competitors, setCompetitors] = useState([]);
    const [id, setId] = useState(0);
    const [city, setCity] = useState("");
    const [name, setName] = useState("");   
    const [isEliminated, setEliminated] = useState(false);


    useEffect(() => {
        // Function to update screen dimensions on resize
        //Bu fonksiyon, ekran boyutları güncellendiğinde çağrılacak ve setScreenWidth ve setScreenHeight ile yeni genişlik ve yüksekliği state'lere set edecektir.
        const updateDimensions = () => {
            setScreenWidth(window.innerWidth);
            setScreenHeight(window.innerHeight);
        };

        // Event listener to handle resize
        // tarayıcı penceresinin boyutu değiştiğinde çağrılacak olan updateDimensions fonksiyonu bir event listener'a eklenir.
        window.addEventListener('resize', updateDimensions);
        // navigate('/main/page1');
        // Clean up the event listener on component unmount
        return () => window.removeEventListener('resize', updateDimensions);

    }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await roboRallyServerService.getAllCompetitors();
        if (result.data.success === true) {
          setCompetitors(result.data.data);
        } else {
          toast.error(result.data.message);
        }
      } catch (e) {
        console.error(e);
      }
    };

    // İlk çalıştırmak için
    fetchData();

    // Her saniyede bir çalıştırmak için interval
    const intervalId = setInterval(fetchData, 1000);

    // Component unmount edildiğinde interval'i temizle
    return () => clearInterval(intervalId);
  }, []); // Boş dizi, sadece ilk render'da çalışmasını sağlar.

  const formatTime = (time) => {
    const minutes = time.minutes.toString().padStart(2, '0');
    const seconds = time.seconds.toString().padStart(2, '0');
    const milliseconds = time.milliseconds.toString().padStart(3, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  // timer oluştur her yarışmacı için
  const { startTimer, stopTimer, getElapsedTime } = useRaceTimer(competitors);
  const [sortedData, setSortedData] = useState([]);

   // her yarısmacının bilgi ve timer değerini al
  const dataFromTimer = getElapsedTime();

  //eger yarismaci elendiyse timer icindeki yarismaciyi de ele. Yarimaci elendiginde timer degeri 0 set ediliyor ki sıralama da en arkaya dussun diye
  useEffect(() => {

    // competitors içinde eliminated alanı true olanları bul
    const eliminatedCompetitors = competitors.filter((competitor) => competitor.eliminated === true);

    // timers içinde aynı id'ye sahip olanların eliminated alanını güncelle
    const updatedSortedData = dataFromTimer.map((data) => {
      const eliminatedCompetitor = eliminatedCompetitors.find((competitor) => competitor.id === data.id);
      if (eliminatedCompetitor) {
        return {
          ...data,
          eliminated: true,
          time: {
            minutes: 0,
            seconds: 0,
            milliseconds: 0
          }
        };
      } else {
        return {
          ...data,
          eliminated: false
          // Burada `time`'ı değiştirmeye gerek yok, çünkü `eliminated` false durumunda zaman değerlerini koru
        };
      }
    });

   
    setSortedData(updatedSortedData);

  }, [competitors]);


  // Süreye göre sıralama
  const updatedCompetitors = sortedData.sort((a, b) => {
    const timeA = a.time.minutes * 60 + a.time.seconds + a.time.milliseconds / 1000;
    const timeB = b.time.minutes * 60 + b.time.seconds + b.time.milliseconds / 1000;

    // Süresi 0 olanları en sonda bırak
    if (timeA === 0 && timeB !== 0) {
      return 1;
    } else if (timeA !== 0 && timeB === 0) {
      return -1;
    }

    // Süreleri küçükten büyüğe sırala
    return timeA - timeB;
  });

  // console.log("updatedCompetitors")
  // console.log(updatedCompetitors)


  console.log("dataFromTimer")
  console.log(dataFromTimer)



    async function previousPageClick() {
        navigate('/main')
    }

    async function logOutClick() {
        localStorage.removeItem("username")
        navigate('/')
    }



    //yarismaci guncelleme modal kapatma
    const handleShowUpdateClose = () => {
        setId(0)
        setCity("")
        setName("")
        setEliminated(false)
        setShowUpdate(false)
    };

    //yarismaci guncelleme modal acma
    const handleShowUpdateOpen = () => setShowUpdate(true);

    // yarismacı düzenleme
    async function handleIconUpdateClick(_id) {
        console.log("update click id : ", _id)

        roboRallyServerService.getById(_id).then(result => {

            if (result.data.success === true) {
                console.log("result")
                console.log(result.data.data)
                setId(result.data.data.id)
                setCity(result.data.data.city.toUpperCase())
                setName(result.data.data.name)
                setEliminated(result.data.data.eliminated)
            } else {
                toast.error(result.data.message);

            }
        }).catch(e => {
            console.error(e);
        })
        //modal aç
        handleShowUpdateOpen()
    }

    async function updateCompetitorClick() {

        console.log("id")
        console.log(id)

        console.log("city")
        console.log(city)

        console.log("name")
        console.log(name)

        console.log("isEliminated")
        console.log(isEliminated)

        if (city === "") {

            toast.warning("Lütfen şehir bilgisini giriniz.");

        } else if (name === "") {

            toast.warning("Lütfen yarışmacı ismini giriniz.");

        } else {
            roboRallyServerService.update(id, city, name, isEliminated).then(result => {

                console.log("update result")
                console.log(result)

                if (result.data.success === true) {
                    toast.success(result.data.message);
                } else {
                    toast.error(result.data.message);

                }
            }).catch(e => {
                console.error(e);
            }).finally(() => {
                //modal kapat
                handleShowUpdateClose()
                setId(0)
                setCity("")
                setName("")
                setEliminated(false)

            });


        }
    }


    async function handleIconDeleteClick(id) {

        console.log("deleted id : ", id)

        roboRallyServerService.deleteById(id).then(result => {

            if (result.data.success === true) {
                toast.success(result.data.message);
            } else {
                toast.error(result.data.message);

            }
        }).catch(e => {
            console.error(e);
        })
    }




    const sections = updatedCompetitors.slice(10, 20).map((competitor, index) => {
        const adjustedIndex = index + 10;

        return (
            // yarışmacıları listeleyen yatay cubuk
            <div key={competitor.id} style={{ width: "95%", height: "8.8%", borderRadius: "50px", backgroundImage: `linear-gradient(to left, rgba(255, 227, 0, 0.2), rgba(241, 108, 5, 0.3))`, display: 'flex', alignItems: 'center', marginBottom: "0.3%", border: "2px solid white" }}>

                {/* sıralama kısmı */}
                <div style={{ flex: "0.3" }}>
                    {/* sıralamanın yazıldığı yuvarlaklar*/}
                    {adjustedIndex === 12 && (
                        <img src={`${process.env.PUBLIC_URL}/${adjustedIndex + 1}.png`} alt={`Icon ${adjustedIndex}`} width="123" height="125" style={{ alignSelf: 'flex-start', marginLeft: '-58px', marginBottom: '8px' }} />
                    )}

                    {adjustedIndex === 14 && (
                        <img src={`${process.env.PUBLIC_URL}/${adjustedIndex + 1}.png`} alt={`Icon ${adjustedIndex}`} width="123" height="125" style={{ alignSelf: 'flex-start', marginLeft: '-58px', marginTop: '7px' }} />
                    )}

                    {adjustedIndex !== 12 && adjustedIndex !== 14 && (
                        <img src={`${process.env.PUBLIC_URL}/${adjustedIndex + 1}.png`} alt={`Icon ${adjustedIndex}`} width="123" height="125" style={{ alignSelf: 'flex-start', marginLeft: '-58px' }} />
                    )}
                </div>

                {/* yarısmacı bilgileri*/}
                <div style={{ flex: "0.5", fontWeight: 'bold', fontSize: "37px", color: "white", fontStyle: 'italic', fontFamily: 'New Times Roman' }}>{competitor.city.toUpperCase()}</div>
                <div style={{ flex: "3",fontWeight: 'bold', fontSize: "32px", color: "white", fontStyle: 'italic', fontFamily: 'New Times Roman' }}>{competitor.name.toUpperCase()}</div>
                <div style={{ flex: "0.5", fontWeight: 'bold', fontSize: "40px", color: "white", fontStyle: 'italic', fontFamily: 'New Times Roman' }}>
                    {/* {competitor.eliminated ? <img src={`${process.env.PUBLIC_URL}/eliminated.png`} alt="Icon" width="95" height="85" /> : competitor.duration} */}

                    {competitor.eliminated ? <img src={`${process.env.PUBLIC_URL}/eliminated.png`} alt="Icon" width="95" height="85" /> : formatTime(competitor.time)}
                </div>

                <div style={{ flex: "0.5", display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Button onClick={() => startTimer(competitor.id)} >Start</Button>
                    <Button onClick={() => stopTimer(competitor.id)} >Stop</Button>
                    <div onClick={() => handleIconUpdateClick(competitor.id)} style={{ cursor: 'pointer', marginRight: '5px' }}>
                        <img src={`${process.env.PUBLIC_URL}/updateIcon.png`} alt="Icon update" width="35" height="35" />
                    </div>
                    <div onClick={() => handleIconDeleteClick(competitor.id)} style={{ cursor: 'pointer', marginLeft: '5px' }}>
                        <img src={`${process.env.PUBLIC_URL}/deleteIcon.png`} alt="Icon delete" width="35" height="35" />
                    </div>
                </div>
            </div>
        );
    });




    return (
        <div style={{ width: screenWidth, height: screenHeight, backgroundImage: 'url(/homeBG3.png)', backgroundSize: 'cover', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>

                <div onClick={() => logOutClick()} style={{ cursor: 'pointer' }}>
                    <img src={`${process.env.PUBLIC_URL}/logout.png`} alt="logout" style={{ width: '7%', height: '7vh', position: 'fixed', top: '3%', right: '6%' }} />
                </div>

            </div>


            <div style={{ width: "95%", height: "80%", display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', marginTop: "0.1%" }}>

                {/* tablo başlıkları  */}
                <div style={{ width: "95%", height: "7%", display: 'flex', alignItems: 'center', marginBottom: "0.5%", color: '#fff', fontWeight: 'bold', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.8)', fontSize: "30px", fontFamily: 'New Times Roman' }}>
                    <div style={{ flex: "0.3" }}></div>
                    <div style={{ flex: "0.5" }}>ŞEHİR </div>
                    <div style={{ flex: "3" }}> YARIŞMACI </div>
                    <div style={{ flex: "0.5" }}> SÜRE </div>
                    <div style={{ flex: "0.5" }}></div>
                </div>


                {/* tablonun gövdesi */}
                {sections}

            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>

                <img src={`${process.env.PUBLIC_URL}/homeLogo2.png`} alt="sunnyTeknolojiLogo" style={{ width: '14%', height: '13vh', position: 'fixed', bottom: '-1%', left: '40%' }} />
            </div>

            <div onClick={() => previousPageClick()} style={{ cursor: 'pointer' }}>
                <img src={`${process.env.PUBLIC_URL}/secondPage.png`} alt="second page" style={{ width: '6%', height: '7vh', position: 'fixed', bottom: '2%', right: '7%' }} />
            </div>

            {/* YARIŞMACI DÜZENLEME MODAL */}


            <>
                <Modal show={showUpdate} centered>
                    <Modal.Header >
                        <Modal.Title>YARIŞMACI DÜZENLE</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>ŞEHİR</Form.Label>
                                <Form.Select aria-label="Default select example" onChange={(e) => setCity(e.target.value.toUpperCase())} value={city || ''}>
                                    <option disabled={!city} hidden={!city} value="">
                                        {city || 'Şehir seçiniz.'}
                                    </option>
                                    <option value="AĞRI">AĞRI</option>
                                    <option value="ARDAHAN">ARDAHAN</option>
                                    <option value="IĞDIR">IĞDIR</option>
                                    <option value="KARS">KARS</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>YARIŞMACI İSMİ</Form.Label>
                                <Form.Control as="textarea" rows={2} onChange={(e) => setName(e.target.value)} value={name} />
                            </Form.Group>

                            <Form.Check // prettier-ignore
                                type="switch"
                                id="custom-switch"
                                label="Yarışmacıyı devre dışı bırak"
                                checked={isEliminated}
                                onChange={(e) => setEliminated(e.target.checked)}
                            />
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="outline-danger" onClick={handleShowUpdateClose} >
                            Vazgeç
                        </Button>

                        <Button variant="outline-success" onClick={updateCompetitorClick}>
                            Kaydet
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>


        </div>
    )
}
