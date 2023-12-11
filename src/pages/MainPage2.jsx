import React from 'react'
import { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";



export default function MainDashboard() {

    const [screenWidth, setScreenWidth] = useState(window.innerWidth); //tarayıcı penceresinin mevcut genişliği  
    const [screenHeight, setScreenHeight] = useState(window.innerHeight); // tarayıcı penceresinin mevcut yüksekliği

    const navigate = useNavigate();

    const numOfSections = 12; // Kaç parça olacağını belirtin

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

    async function handleIconUpdateClick() { }
    async function handleIconDeleteClick() { }

    async function previousPageClick() {
        navigate('/main')
    }

    async function logOutClick() {
        localStorage.removeItem("username")
        navigate('/')
    }

    const sections = Array.from({ length: numOfSections }, (_, index) => (

        <div style={{ width: "95%", height: "8%", borderRadius: "50px", backgroundImage: 'linear-gradient(to right, #DB6E1A, #FFDB00)', opacity: 0.8, display: 'flex', alignItems: 'center', marginBottom: "0.5%" }}>
            <div style={{ flex: "0.3" }}>{index} </div>
            <div style={{ flex: "0.5" }}>{index} parca 1 </div>
            <div style={{ flex: "2" }}>{index}  parca 2 </div>
            <div style={{ flex: "1" }}>{index}  parca 3 </div>
            <div style={{ flex: "0.5", display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

                <div onClick={() => handleIconUpdateClick(index)} style={{ cursor: 'pointer', marginRight: '5px' }}>
                    <img src={`${process.env.PUBLIC_URL}/updateIcon.png`} alt="Icon update" width="35" height="35" />
                </div>
                <div onClick={() => handleIconDeleteClick(index)} style={{ cursor: 'pointer', marginLeft: '5px' }}>
                    <img src={`${process.env.PUBLIC_URL}/deleteIcon.png`} alt="Icon delete" width="35" height="35" />
                </div>

            </div>
        </div>
    ));


    return (
        <div style={{ width: screenWidth, height: screenHeight, backgroundImage: 'url(/homeBG3.png)', backgroundSize: 'cover', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>

                <div onClick={() => logOutClick()} style={{ cursor: 'pointer' }}>
                    <img src={`${process.env.PUBLIC_URL}/logout.png`} alt="logout" style={{ width: '6%', height: '7vh', position: 'fixed', top: '5.5%', right: '7%' }} />
                </div>

            </div>


            <div style={{ width: "95%", height: "75%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: "0.1%" }}>

                {/* tablo başlıkları  */}
                <div style={{ width: "95%", height: "7%", display: 'flex', alignItems: 'center', marginBottom: "0.5%", color: '#fff', fontWeight: 'bold', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                    <div style={{ flex: "0.3" }}>SIRALAMA </div>
                    <div style={{ flex: "0.5" }}>ŞEHİR </div>
                    <div style={{ flex: "2" }}> OKUL </div>
                    <div style={{ flex: "1" }}> SÜRE </div>
                    <div style={{ flex: "0.5" }}></div>
                </div>


                {/* tablonun gövdesi */}
                {sections}

            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>

                <img src={`${process.env.PUBLIC_URL}/homeLogo2.png`} alt="sunnyTeknolojiLogo" style={{ width: '20%', height: '13vh', position: 'fixed', bottom: '0.1%', left: '37%' }} />
            </div>

            <div onClick={() => previousPageClick()} style={{ cursor: 'pointer' }}>
                <img src={`${process.env.PUBLIC_URL}/secondPage.png`} alt="second page" style={{ width: '6%', height: '7vh', position: 'fixed', bottom: '2%', right: '7%' }} />
            </div>



        </div>
    )
}