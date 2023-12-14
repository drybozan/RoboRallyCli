import React from 'react'
import { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";



export default function MainDashboard() {

    const [screenWidth, setScreenWidth] = useState(window.innerWidth); //tarayıcı penceresinin mevcut genişliği  
    const [screenHeight, setScreenHeight] = useState(window.innerHeight); // tarayıcı penceresinin mevcut yüksekliği

    const navigate = useNavigate();
    const location = useLocation();


    //yarismacı guncelleme modalı için
    const [showUpdate, setShowUpdate] = useState(false);
    const handleShowUpdateClose = () => setShowUpdate(false);
    const handleShowUpdateOpen = () => setShowUpdate(true);



    const [time, setTime] = useState({ minutes: 0, seconds: 0, milliseconds: 0 });
    const [isRunning, setIsRunning] = useState(false);

    const receivedData = location.state;
    // console.log("receivedData")
    // console.log(receivedData)

    const numOfSections = receivedData.key; // Kaç parça olacağını belirtin


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

    async function previousPageClick() {
        navigate('/main')
    }

    async function logOutClick() {
        localStorage.removeItem("username")
        navigate('/')
    }


    // yarismacı düzenleme
    async function handleIconUpdateClick(index) {

        console.log("update click index : ")
        console.log(index)
        //modal aç
        handleShowUpdateOpen()
    }

    async function updateCompetitorClick() {

        //modal kapat
        handleShowUpdateClose()
    }


    async function handleIconDeleteClick() { }


    useEffect(() => {

        let intervalId;

        if (isRunning) {
            intervalId = setInterval(() => {
                // Süreyi güncelle
                setTime((prevTime) => {
                    const newMilliseconds = prevTime.milliseconds + 10;

                    // 1000 milisaniye 1 saniyedir
                    if (newMilliseconds === 1000) {
                        return {
                            minutes: prevTime.minutes,
                            seconds: prevTime.seconds + 1,
                            milliseconds: 0,
                        };
                    }

                    // 60 saniye 1 dakikadır
                    if (prevTime.seconds === 60) {
                        return {
                            minutes: prevTime.minutes + 1,
                            seconds: 0,
                            milliseconds: 0,
                        };
                    }

                    return {
                        ...prevTime,
                        milliseconds: newMilliseconds,
                    };
                });
            }, 10); // Her 10 milisaniyede bir güncelle
        }

        // Temizleme işlemi
        return () => clearInterval(intervalId);
    }, [isRunning]);

    const formattedTime = `${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}.${String(time.milliseconds).padStart(3, '0')}`;


    const sections = [];

    for (let index = 0; index < numOfSections; index++) {
        if (index >= 10 && index <= 19) {
            sections.push(

                <div style={{ width: "95%",color: '#fff', height: "8%", borderRadius: "50px", backgroundImage: `linear-gradient(to left, rgba(255, 227, 0, 0.2), rgba(241, 108, 5, 0.3))`, display: 'flex', alignItems: 'center', marginBottom: "0.5%", border: "2px solid white" }}>

                    {/* sıralama kısmı */}
                    <div style={{ flex: "0.3" }}>

                        <img src={`${process.env.PUBLIC_URL}/${index + 1}.png`} alt={`Icon ${index}`} width="122" height="122" style={{ alignSelf: 'flex-start', marginLeft: '-55px' }} />


                    </div>

                    <div style={{ flex: "0.5", fontWeight: 'bold', fontSize: "35px", fontStyle: 'italic', fontFamily: 'New Times Roman' }}> KARS  </div>
                    <div style={{ flex: "2", fontWeight: 'bold', fontSize: "35px", fontStyle: 'italic', fontFamily: 'New Times Roman' }}> KARS ORTAOKUL </div>

                    <div style={{ flex: "1",  fontWeight: 'bold', fontSize: "35px", fontStyle: 'italic', fontFamily: 'New Times Roman' }}>

                        {formattedTime}

                    </div>
                    <div style={{ flex: "0.5", display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

                        <div onClick={() => handleIconUpdateClick(index)} style={{ cursor: 'pointer', marginRight: '5px' }}>
                            <img src={`${process.env.PUBLIC_URL}/updateIcon.png`} alt="Icon update" width="35" height="35" />
                        </div>
                        <div onClick={() => handleIconDeleteClick(index)} style={{ cursor: 'pointer', marginLeft: '5px' }}>
                            <img src={`${process.env.PUBLIC_URL}/deleteIcon.png`} alt="Icon delete" width="35" height="35" />
                        </div>

                    </div>
                </div>

            );
        }
    }


    return (
        <div style={{ width: screenWidth, height: screenHeight, backgroundImage: 'url(/homeBG3.png)', backgroundSize: 'cover', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>

                <div onClick={() => logOutClick()} style={{ cursor: 'pointer' }}>
                    <img src={`${process.env.PUBLIC_URL}/logout.png`} alt="logout" style={{ width: '7%', height: '7vh', position: 'fixed', top: '4%', right: '6%' }} />
                </div>

            </div>


            <div style={{ width: "95%", height: "80%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: "0.1%" }}>

                {/* tablo başlıkları  */}
                <div style={{ width: "95%", height: "7%", display: 'flex', alignItems: 'center', marginBottom: "0.5%", color: '#fff', fontWeight: 'bold', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)', fontSize: "30px", fontFamily: 'New Times Roman' }}>
                    <div style={{ flex: "0.3" }}></div>
                    <div style={{ flex: "0.5" }}>ŞEHİR </div>
                    <div style={{ flex: "2" }}> YARIŞMACI </div>
                    <div style={{ flex: "1" }}> SÜRE </div>
                    <div style={{ flex: "0.5" }}></div>
                </div>


                {/* tablonun gövdesi */}
                {sections}

            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>

                <img src={`${process.env.PUBLIC_URL}/homeLogo2.png`} alt="sunnyTeknolojiLogo" style={{ width: '18%', height: '13vh', position: 'fixed', bottom: '-1%', left: '37%' }} />
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
                                <Form.Select aria-label="Default select example">
                                    <option>Şehir seçiniz.</option>
                                    <option value="1">Ağrı</option>
                                    <option value="2">Ardahan</option>
                                    <option value="3">Iğdır</option>
                                    <option value="4">Kars</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>YARIŞMACI İSMİ</Form.Label>
                                <Form.Control as="textarea" rows={2} />
                            </Form.Group>

                            <Form.Check // prettier-ignore
                                type="switch"
                                id="custom-switch"
                                label="Yarışmacıyı devre dışı bırak."
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
