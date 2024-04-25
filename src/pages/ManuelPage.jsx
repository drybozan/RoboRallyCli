import React from 'react'
import { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import RoboRallyServerService from '../services/RoboRallyServerService';

export default function ManuelPage() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth); //tarayıcı penceresinin mevcut genişliği  
    const [screenHeight, setScreenHeight] = useState(window.innerHeight); // tarayıcı penceresinin mevcut yüksekliği

    const [competitors, setCompetitors] = useState([]);

    const [checkedItems, setCheckedItems] = useState([]);


    const roboRallyServerService = new RoboRallyServerService();


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
        const intervalId = setInterval(fetchData, 2000);

        // Component unmount edildiğinde interval'i temizle
        return () => clearInterval(intervalId);
    }, []); // Boş dizi, sadece ilk render'da çalışmasını sağlar.


    const ready = () => {
        console.log("ready codes:")
        console.log(checkedItems)

        roboRallyServerService.ready(checkedItems)
            .then((result) => {
                if (result.data.success === true) {
                    console.log(result.data.message);
                } else {
                    console.log(result.data.message);
                    toast.warning(result.data.message);
                }
            })
            .catch((e) => {
                console.error(e);
            });

    };


    const start = () => {
        console.log("start codes:")
        console.log(checkedItems)

        roboRallyServerService.start(checkedItems)
            .then((result) => {
                if (result.data.success === true) {
                    console.log(result.data.message);
                } else {
                    console.log(result.data.message);
                    toast.warning(result.data.message);
                }
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const finish = (code) => {

        roboRallyServerService.finish(code)
            .then((result) => {
                if (result.data.success === true) {
                    console.log(result.data.message);
                    // checkedItems dizisinde code varsa, code'u çıkar
                    const updatedCheckedItems = checkedItems.filter((item) => item !== code);
                    setCheckedItems(updatedCheckedItems);
                } else {
                    console.log(result.data.message);
                    toast.warning(result.data.message);
                }
            })
            .catch((e) => {
                console.error(e);
            });


    };


    // Checkbox durumunu güncellemek için bir işlev oluşturun
    const handleCheckboxChange = (code) => {
        console.log("code : " + code)
        // Checkbox durumu dizi içinde var mı yok mu kontrol edin
        const isChecked = checkedItems.includes(code);
        // Eğer varsa, çıkarın; yoksa ekleyin
        const updatedItems = isChecked
            ? checkedItems.filter((item) => item !== code)
            : [...checkedItems, code];
        // Güncellenmiş diziyi duruma ayarlayın
        setCheckedItems(updatedItems);
    };

    console.log(checkedItems)
    // Helper function to get gradient colors based on index
    const getGradientColors = (index) => {
        // Define your gradient colors logic here
        const gradientColors = [
            `linear-gradient(to left, rgba(255, 227, 0, 0.8), rgba(220, 50, 5, 0.8))`,
            `linear-gradient(to left, rgba(255, 227, 0, 0.6), rgba(220, 50, 5, 0.7))`,
            `linear-gradient(to left, rgba(255, 227, 0, 0.5), rgba(220, 50, 5, 0.6))`,
            `linear-gradient(to left, rgba(255, 227, 0, 0.2), rgba(241, 108, 5, 0.3))`,
        ];
        return gradientColors[index] || gradientColors[gradientColors.length - 1];
    };

    // Helper function to get gradient colors based on index
    const getGradientReady = (index) => {
        // Define your gradient colors logic here
        const gradientColors = [
            `linear-gradient(to left, rgba(240, 205, 22, 0.8), rgba(240, 178, 22, 0.9))`
        ];
        return gradientColors[index] || gradientColors[gradientColors.length - 1];
    };

    // Helper function to get gradient colors based on index
    const getGradientStart = (index) => {
        // Define your gradient colors logic here
        const gradientColors = [
            `linear-gradient(to left, rgba(144, 158, 26, 0.8), rgba(4, 114, 26, 0.9))`
        ];
        return gradientColors[index] || gradientColors[gradientColors.length - 1];
    };

    // Helper function to get medal icon based on index
    const getMedalIcon = (index) => {
        const medalIcons = ['1.png', '2.png', '3.png'];
        return medalIcons[index] || `${index + 1}.png`;
    };

    const sections = competitors.slice(0, 20).map((competitor, index) => {

        // index numarasına göre div boya koyudan açık renge doğru
        const gradientColors = getGradientColors(index);

        // index bilgisine göre sıralama toplarını listele.
        const medalIcon = getMedalIcon(index);

        // index numarasına göre div boya sarı koyudan açık renge doğru
        const gradientColorsReady = getGradientReady(index);


        // index numarasına göre div boya yeşil koyudan açık renge doğru
        const gradientColorsStart = getGradientStart(index);

        // Yarışmacının listelendiği yatay cizgi still
        const divStyle = {
            width: "100%",
            height: "4.2%",
            borderRadius: "50px",
            backgroundImage: competitor.ready ? gradientColorsReady : competitor.start ? gradientColorsStart : gradientColors,
            display: 'flex',
            alignItems: 'center',
            marginBottom: "0.2%",
            border: competitor.ready ? "4px ridge white" : "2px solid white",  // "ready" true ise kırmızı, değilse beyaz kenarlık
            animation: competitor.ready ? "pulse 1s infinite" : "none",  // "ready" true ise animasyonu etkinleştir    


        };

        return (
            // yarışmacıları listeleyen yatay cubuk
            <div key={competitor.id} style={divStyle}>
                <Form>

                    <div style={{ flex: "0.1", margin: "30%" }} >
                        <Form.Check
                            type="checkbox"
                            id={competitor.id}
                            onChange={() => handleCheckboxChange(competitor.code)}
                            checked={checkedItems.includes(competitor.code)}

                        />
                    </div>
                </Form>



                {/* yarısmacı bilgileri*/}
                <div style={{ marginLeft: "0.5%", flex: "0.7", fontWeight: 'bold', fontSize: "140%", color: "white", fontStyle: 'italic', fontFamily: 'New Times Roman', display: 'flex', alignItems: 'start' }}>{competitor.city.toUpperCase()}</div>
                <div style={{ flex: "4", fontWeight: 'bold', fontSize: "140%", color: "white", fontStyle: 'italic', fontFamily: 'New Times Roman', display: 'flex', alignItems: 'start' }}>{competitor.name.toUpperCase()}</div>
                <div style={{ flex: "0.5", fontWeight: 'bold', fontSize: "150%", color: "white", fontStyle: 'italic', fontFamily: 'New Times Roman' }}>

                    {competitor.eliminated ? <img src={`${process.env.PUBLIC_URL}/eliminated.png`} alt="Icon" width="20%" height="20%" /> : competitor.duration}

                </div>

                <div style={{ flex: "0.5", display: 'flex', flexDirection: 'row', justifyContent: 'center', width: "100%", height: "100%" }}>
                    {/* <Button onClick={() => startTimer(competitor.id)} >Start</Button> */}
                    {/* <Button onClick={() => stopTimer(competitor.id)} >Stop</Button> */}
                    {/* <div onClick={() => handleIconUpdateClick(competitor.id)} style={{ cursor: 'pointer', marginRight: '5px' }}>
                        <img src={`${process.env.PUBLIC_URL}/updateIcon.png`} alt="Icon update" width="100%" height="100%" />
                    </div> */}

                    <div onClick={() => finish(competitor.code)} style={{ cursor: 'pointer', marginRight: '5px' }}>
                        <img src={`${process.env.PUBLIC_URL}/button_finish.png`} alt="Icon finish" width="100%" height="100%" />
                    </div>


                </div>
            </div >
        );
    });



    return (
        <div style={{
            width: screenWidth, height: screenHeight,
            backgroundImage: 'url(/homeBG3.png)',
            backgroundSize: '100% 100%', // Yatay boyutu otomatik, dikey boyutu %100 olacak şekilde ayarla
            backgroundRepeat: 'no-repeat', // Arka plan resmini yalnızca bir kez göster
            backgroundPosition: 'center', // Resmi ekranda merkeze hizala
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>

                <img src={`${process.env.PUBLIC_URL}/homeLogo.png`} alt="sunnyTeknolojiLogo" style={{ width: '15%', height: '13vh', position: 'fixed', top: '1%', left: '3%' }} />


                <div onClick={() => ready()} style={{ cursor: 'pointer' }}>
                    <img src={`${process.env.PUBLIC_URL}/button_ready.png`} alt="ready" style={{ width: '4vw', height: '4vh', position: 'fixed', top: '4.9%', right: '12%' }} />
                </div>

                <div onClick={() => start()} style={{ cursor: 'pointer' }}>
                    <img src={`${process.env.PUBLIC_URL}/button_start.png`} alt="start" style={{ width: '4vw', height: '4vh', position: 'fixed', top: '4.9%', right: '7%' }} />
                </div>


                <div style={{ position: 'fixed', top: '9%', left: '19%', color: "#ffff" }}> screenWidth : {screenWidth}  screenHeight : {screenHeight}</div>


            </div>


            <div style={{ width: "95%", height: "86%", display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', marginTop: "4%" }}>

                {/* tablo başlıkları  */}
                <div style={{ width: "95%", height: "3%", display: 'flex', alignItems: 'center', marginBottom: "0.5%", color: '#fff', fontWeight: 'bold', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.8)', fontSize: "125%", fontFamily: 'New Times Roman' }}>
                    <div style={{ flex: "0.1" }}></div>
                    <div style={{ flex: "0.4" }}>ŞEHİR </div>
                    <div style={{ flex: "4" }}> YARIŞMACI </div>
                    <div style={{ flex: "0.5" }}> SÜRE </div>
                    <div style={{ flex: "0.5" }}> </div>
                </div>

                <div style={{ width: "95%", height: "97%" }}>
                    {/* tablonun gövdesi */}
                    {sections}

                </div>

            </div>

        </div>
    )
}
