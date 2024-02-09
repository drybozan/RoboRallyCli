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
    const [start, setStart] = useState("");
    const [stop, setStop] = useState("");
    const [duration, setDuration] = useState("");


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


    // useEffect(() => {

    //     roboRallyServerService.getAllCompetitorsByDuration().then(result => {


    //         if (result.data.success === true) {

    //             setCompetitors(result.data.data);
    //         } else {
    //             toast.error(result.data.message);


    //         }

    //     })
    // })

    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await roboRallyServerService.getAllCompetitorsByDuration();
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
        const intervalId = setInterval(fetchData, 500);
    
        // Component unmount edildiğinde interval'i temizle
        return () => clearInterval(intervalId);
      }, []); // Boş dizi, sadece ilk render'da çalışmasını sağlar.



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
        setStart("")
        setStop("")
        setDuration("")
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
                setStart(result.data.data.startTime)
                setStop(result.data.data.stopTime)
                setDuration(result.data.data.duration)
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
                setStart("")
                setStop("")
                setDuration("")

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

    const getCurrentDateTime = () => {
        const now = new Date();
        const formattedDate = now.toLocaleString('tr-TR', { year: 'numeric', month: '2-digit', day: '2-digit', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const milliseconds = `${now.getMilliseconds()}`.padStart(3, '0');
        return `${formattedDate}:${milliseconds}`;
    };
  


  // Helper function to get gradient colors based on index
  const getGradientColors = (index) => {
    // Define your gradient colors logic here
    const gradientColors = [
     
      `linear-gradient(to left, rgba(255, 227, 0, 0.2), rgba(241, 108, 5, 0.3))`,
    ];
    return gradientColors[index] || gradientColors[gradientColors.length - 1];
  };

  // Helper function to get gradient colors based on index
  const getGradientStart = (index) => {
    // Define your gradient colors logic here
    const gradientColors = [
      `linear-gradient(to left, rgba(250, 100, 38, 0.8), rgba(220, 0, 0, 0.6))`
    ];
    return gradientColors[index] || gradientColors[gradientColors.length - 1];
  };

    const sections = competitors.slice(10, 20).map((competitor, index) => {
        const adjustedIndex = index + 10;
        // index numarasına göre div boya koyudan açık renge doğru
        const gradientColors = getGradientColors(index);

        // index numarasına göre div boya kırmızı
        const gradientColorsStart = getGradientStart(index);

        // Yarışmacının "start" alanına göre stil belirle
        const divStyle = {
            width: "95%",
            height: "8.8%",
            borderRadius: "50px",
            backgroundImage: competitor.ready ? gradientColorsStart : gradientColors,
            display: 'flex',
            alignItems: 'center',
            marginBottom: "0.3%",
            border: competitor.ready ? "4px ridge white" : "2px solid white",  // "ready" true ise kırmızı, değilse beyaz kenarlık
            animation: competitor.ready  ? "pulse 1s infinite" : "none",  // "ready" true ise animasyonu etkinleştir  

        };

        return (
            // yarışmacıları listeleyen yatay cubuk
            <div key={competitor.id} style={divStyle}>

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
                <div style={{ flex: "3", fontWeight: 'bold', fontSize: "32px", color: "white", fontStyle: 'italic', fontFamily: 'New Times Roman' }}>{competitor.name.toUpperCase()}</div>
                <div style={{ flex: "0.5", fontWeight: 'bold', fontSize: "40px", color: "white", fontStyle: 'italic', fontFamily: 'New Times Roman' }}>
                    {competitor.eliminated ? <img src={`${process.env.PUBLIC_URL}/eliminated.png`} alt="Icon" width="95" height="85" /> : competitor.duration}

                    {/* {competitor.eliminated ? <img src={`${process.env.PUBLIC_URL}/eliminated.png`} alt="Icon" width="95" height="85" /> : formatTime(competitor.time)} */}
                </div>

                <div style={{ flex: "0.5", display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    {/* <Button onClick={() => startTimer(competitor.id)} >Start</Button>
                    <Button onClick={() => stopTimer(competitor.id)} >Stop</Button> */}
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

                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Form.Label>Başlangıç : </Form.Label>
                                <Form.Control
                                    style={{ width: '15vw', height: "3.5vh", marginLeft: "10px" }} // Genişlik ayarlayın
                                    type="text"
                                    placeholder={start}
                                    aria-label="Disabled input example"
                                    disabled
                                    readOnly
                                />
                            </div>

                            <br />
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Form.Label>Bitiş : </Form.Label>
                                <Form.Control
                                    style={{ width: '15vw', height: "3.5vh", marginLeft: "15px" }} // Genişlik ayarlayın
                                    type="text"
                                    placeholder={stop}
                                    aria-label="Disabled input example"
                                    disabled
                                    readOnly
                                />
                            </div>
                            <br />
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Form.Label>Süre : </Form.Label>
                                <Form.Control
                                    style={{ width: '10vw', height: "3.5vh", marginLeft: "15px" }} // Genişlik ayarlayın
                                    type="text"
                                    placeholder={duration}
                                    aria-label="Disabled input example"
                                    disabled
                                    readOnly
                                />
                            </div>
                            <br />

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
