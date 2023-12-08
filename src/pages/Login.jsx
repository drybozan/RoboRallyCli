import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
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
            console.log("Kullanıcı adı  veya şifre alanı boş olamaz.")
        } else {

            roboRallyServerService.login(username, password).then(result => {


                if (result.data.success == true) {

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
        <div style={{ width: screenWidth, height: screenHeight, backgroundImage: 'url(/loginBG3.jpg)', backgroundSize: 'cover', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

            <div style={{ padding: '20px', background: 'white', width: '30%', height: '50%', borderRadius: '5%', opacity: '0.7', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                <img src="/sunnyTeknolojiLogo.png" alt="sunnyTeknolojiLogo" style={{ width: '50%', height: '10vh', marginTop: '10vh', background: 'white' }} />

                <Form style={{ width: '50%', marginTop: '5vh' }}>
                    <Form.Group>
                        <Form.Control style={{ marginBottom: '3vh', border: '1px solid #FF7F00' }}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="username"
                            value={username}
                        />

                    </Form.Group>

                    <Form.Group>
                        <Form.Control style={{ marginBottom: '3vh', border: '1px solid #FF7F00' }}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="password"
                            value={password}
                        />
                    </Form.Group>
                </Form>
                <Button style={{ width: '40%', color: 'white', border: '1px solid #FF7F00', background: isHovered ? '#F7BE11' : '#F77F11', }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={OnClickLogin}
                >
                    Giriş Yap
                </Button>

            </div>


            <div style={{ position: 'fixed', bottom: '1%', left: '1%', color: 'black' }}>
                <FontAwesomeIcon icon={faCopyright} style={{ fontSize: '140%' }} /> <span style={{ marginLeft: '5px' }}>2023  Developed By Derya Bozan</span>
            </div>

        </div>


    )
}
