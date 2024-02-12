import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RoboRallyServerService from '../services/RoboRallyServerService';


export default function Login() {

    const [screenWidth, setScreenWidth] = useState(window.innerWidth); //tarayıcı penceresinin mevcut genişliği  
    const [screenHeight, setScreenHeight] = useState(window.innerHeight); // tarayıcı penceresinin mevcut yüksekliği
    const [isHovered, setIsHovered] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const navigate = useNavigate();
    const roboRallyServerService = new RoboRallyServerService();

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

        // Clean up the event listener on component unmount
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);


    async function OnClickLogin() {

        if (username === "" || password === "") {

            toast.error("Kullanıcı adı  veya şifre alanı boş olamaz.");
        } else {

            roboRallyServerService.login(username, password).then(result => {


                if (result.data.success === true) {

                    localStorage.setItem("username", result.data.data.username);
                    console.log(localStorage.getItem("username"));
                    navigate("/main")
                    toast.success(result.data.message);
                } else {
                    toast.error(result.data.message);
                    setUsername("")
                    setPassword("")

                }

            })

        }
    }


    return (
        <div style={{
            width: screenWidth, height: screenHeight,
            backgroundImage: 'url(/loginBG.png)',
            backgroundSize: '100% 100%', // Yatay boyutu otomatik, dikey boyutu %100 olacak şekilde ayarla
            backgroundRepeat: 'no-repeat', // Arka plan resmini yalnızca bir kez göster
            backgroundPosition: 'center', // Resmi ekranda merkeze hizala
            display: 'flex', 
            justifyContent: 'flex-start',
            alignItems: 'center' }}>

            <div style={{ width: '45%', height: "80%", marginRight: "13vw" }} >

                <img src="/loginSunny.png" alt="sunnyTeknolojiLogo" style={{ width: '100%', height: "100%" }} />
              
            </div>
            <div style={{
                padding: '20px', background: 'white', width: '23%', height: '55%', borderRadius: '7%',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', boxShadow: '-12px -12px 3px 2px rgba(230, 230, 230, 0.5)'
            }}>

                <div style={{ width: '20%', height: "18%", marginLeft: "75%" }}>
                    <img src="/yildiz.png" alt="sunnyTeknolojiLogo" style={{ width: '100%', height: "100%" }} />
                </div>

                <div style={{ width: '70%', height: "15%" }}>
                    <img src="/merhaba.png" alt="sunnyTeknolojiLogo" style={{ width: '100%', height: "100%" }} />
                </div>

                <Form style={{ width: '100%', marginTop: '5vh', marginBottom: '3vh' }}>

                    <Form.Group  >
                        <Form.Label style={{ marginRight: '16vw' }}>Kullanıcı Adı</Form.Label>
                        <Form.Control style={{ marginBottom: '3vh', height: "5vh" }}
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />

                    </Form.Group>

                    <Form.Group>
                        <Form.Label style={{ marginRight: '19vw' }}>Şifre</Form.Label>
                        <Form.Control style={{ marginBottom: '3vh', height: "5vh" }}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            value={password}
                        />
                    </Form.Group>
                </Form>
                <Button style={{ width: '90%', height: "10%", color: 'white', border: '1px solid #000000', background: isHovered ? '#000D33' : '#000000', marginLeft: "5%" }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={OnClickLogin}
                >
                    Giriş Yap
                </Button>

            </div>

        </div>





    )
}
