import React from 'react'
import { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import RoboRallyServerService from '../services/RoboRallyServerService';


export default function MainPage1() {

  const [screenWidth, setScreenWidth] = useState(window.innerWidth); //tarayıcı penceresinin mevcut genişliği  
  const [screenHeight, setScreenHeight] = useState(window.innerHeight); // tarayıcı penceresinin mevcut yüksekliği

  const navigate = useNavigate();
  const roboRallyServerService = new RoboRallyServerService();


  //yarismacı ekleme modalı için
  const [showAdd, setShowAdd] = useState(false);

  //yarismacı guncelleme modalı için
  const [showUpdate, setShowUpdate] = useState(false);

  const [id, setId] = useState(0);
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [isEliminated, setEliminated] = useState(false);

  const [competitors, setCompetitors] = useState([]);

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



  useEffect(() => {

    roboRallyServerService.getAllCompetitorsByDuration().then(result => {


      if (result.data.success === true) {

        setCompetitors(result.data.data);
      } else {
        toast.error(result.data.message);


      }

    })
  })


  async function nextPageClick() {

    navigate('/main/page2');
  }

  async function logOutClick() {
    localStorage.removeItem("username")
    navigate('/')
  }

  //yarismaci ekleme modal kapatma 
  const handleShowAddClose = () => {
    setShowAdd(false)
    setCity("")
    setName("")
  };
  //yarismaci ekleme modal acma
  const handleShowAddOpen = () => setShowAdd(true);


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

  async function addCompetitorClick() {

    console.log("city")
    console.log(city)

    console.log("name")
    console.log(name)

    console.log("formattedTime")
    console.log(formattedTime)

    if (city === "") {

      toast.warning("Lütfen şehir bilgisini giriniz.");

    } else if (name === "") {

      toast.warning("Lütfen yarışmacı ismini giriniz.");

    } else {
      roboRallyServerService.add(city, name,"0:00:000", isEliminated).then(result => {

        if (result.data.success === true) {
          toast.success(result.data.message);
        } else {
          toast.error(result.data.message);

        }
      }).catch(e => {
        console.error(e);
      }).finally(() => {
        // modal kapat
        handleShowAddClose();
        setCity("")
        setName("")

      });

    }
  }

  const startTimer = (id) => {

    console.log("Start timer for id: ", id);

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

  // Helper function to get medal icon based on index
  const getMedalIcon = (index) => {
    const medalIcons = ['1.png', '2.png', '3.png'];
    return medalIcons[index] || `${index + 1}.png`;
  };

  const sections = competitors.slice(0, 10).map((competitor, index) => {

    // index numarasına göre div boya koyudan açık renge doğru
    const gradientColors = getGradientColors(index);
    // index bilgisine göre sıralama toplarını listele.
    const medalIcon = getMedalIcon(index);

    return (
      // yarışmacıları listeleyen yatay cubuk
      <div key={competitor.id} style={{ width: "95%", height: "8.8%", borderRadius: "50px", backgroundImage: gradientColors, display: 'flex', alignItems: 'center', marginBottom: "0.3%", border: "2px solid white" }}>

        {/* sıralama kısmı */}
        <div style={{ flex: "0.3" }}>
          {/* sıralamanın yazıldığı yuvarlaklar*/}
          <div style={{ width: "60%", height: "100%", borderRadius: "50%" }}>

            {index < 3 && (
              <img src={`${process.env.PUBLIC_URL}/${medalIcon}`} alt={`Icon ${index + 1}`} width="100" height="100" style={{ alignSelf: 'flex-start', marginLeft: '-20px' }} />
            )}

            {index !== 0 && index !== 1 && index !== 2 && (

              <img src={`${process.env.PUBLIC_URL}/${index + 1}.png`} alt={`Icon ${index}`} width="123" height="125" style={{ alignSelf: 'flex-start', marginLeft: '-36px' }} />

            )}

          </div>
        </div>

        {/* yarısmacı bilgileri*/}
        <div style={{ flex: "0.5", fontWeight: 'bold', fontSize: "37px", color: "white", fontStyle: 'italic', fontFamily: 'New Times Roman' }}>{competitor.city.toUpperCase()}</div>
        <div style={{ flex: "3", fontWeight: 'bold', fontSize: "32px", color: "white", fontStyle: 'italic', fontFamily: 'New Times Roman' }}>{competitor.name.toUpperCase()}
        </div>
        <div style={{ flex: "0.5", fontWeight: 'bold', fontSize: "40px", color: "white", fontStyle: 'italic', fontFamily: 'New Times Roman' }}>

          {competitor.eliminated ? <img src={`${process.env.PUBLIC_URL}/eliminated.png`} alt="Icon" width="95" height="85" /> : competitor.duration}



          {/*competitor.eliminated ? <img src={`${process.env.PUBLIC_URL}/eliminated.png`} alt="Icon" width="95" height="85" /> : formatTime(competitor.time)*/}

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

        <img src={`${process.env.PUBLIC_URL}/homeLogo.png`} alt="sunnyTeknolojiLogo" style={{ width: '25%', height: '15vh', position: 'fixed', top: '1%', left: '3%' }} />

        <div onClick={handleShowAddOpen} style={{ cursor: 'pointer' }}>
          <img src={`${process.env.PUBLIC_URL}/addCompetitor.png`} alt="add competitor" style={{ width: '15%', height: '8vh', position: 'fixed', top: '3%', right: '13%' }} />
        </div>


        <div onClick={() => logOutClick()} style={{ cursor: 'pointer' }}>
          <img src={`${process.env.PUBLIC_URL}/logout.png`} alt="logout" style={{ width: '7%', height: '7vh', position: 'fixed', top: '4%', right: '6%' }} />
        </div>

      </div>


      <div style={{ width: "95%", height: "80%", display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', marginTop: "3%" }}>

        {/* tablo başlıkları  */}
        <div style={{ width: "95%", height: "7%", display: 'flex', alignItems: 'center', marginBottom: "0.5%", color: '#fff', fontWeight: 'bold', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.8)', fontSize: "30px", fontFamily: 'New Times Roman' }}>
          <div style={{ flex: "0.3" }}></div>
          <div style={{ flex: "0.5" }}>ŞEHİR </div>
          <div style={{ flex: "3" }}> YARIŞMACI </div>
          <div style={{ flex: "0.5" }}> SÜRE </div>
          <div style={{ flex: "0.5" }}> </div>
        </div>

        {/* tablonun gövdesi */}
        {sections}

        {/* <WebSocketComponent /> */}

      </div>

      <div onClick={() => nextPageClick()} style={{ cursor: 'pointer' }}>
        <img src={`${process.env.PUBLIC_URL}/firstPage.png`} alt="first page" style={{ width: '6%', height: '7vh', position: 'fixed', bottom: '1.2%', right: '7%' }} />
      </div>

      {/* YARIŞMACI EKLEME MODAL */}

      <>

        <Modal show={showAdd} onHide={handleShowAddClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>YARIŞMACI EKLE</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>ŞEHİR</Form.Label>
                <Form.Select aria-label="Default select example" onChange={(e) => setCity(e.target.value.toUpperCase())} value={city}>
                  <option>Şehir seçiniz.</option>
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
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-success" onClick={addCompetitorClick}>
              Kaydet
            </Button>
          </Modal.Footer>
        </Modal>


        {/* YARIŞMACI DÜZENLEME MODAL */}


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
