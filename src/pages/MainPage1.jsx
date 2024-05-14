import React from 'react'
import { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import RoboRallyServerService from '../services/RoboRallyServerService';
import '../style.css';  // styles.css dosyasını içe aktarın




export default function MainPage1() {

  const [screenWidth, setScreenWidth] = useState(window.innerWidth); //tarayıcı penceresinin mevcut genişliği  
  const [screenHeight, setScreenHeight] = useState(window.innerHeight); // tarayıcı penceresinin mevcut yüksekliği

  const navigate = useNavigate();
  const roboRallyServerService = new RoboRallyServerService();


  //yarismacı ekleme modalı için
  const [showAdd, setShowAdd] = useState(false);

  //yarismacı guncelleme modalı için
  const [showUpdate, setShowUpdate] = useState(false);

  //log goruntule
  const [showLog, setShowLog] = useState(false);

  const [id, setId] = useState(0);
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [isEliminated, setEliminated] = useState(false);
  const [robotId, setRobotId] = useState("");


  const [competitors, setCompetitors] = useState([]);

  const [logFileNameOptions, setLogFileNameOptions] = useState([]); // log dosya isimlerini saklamak için state.
  const [logFileName, setLogFileName] = useState("");
  const [logData, setLogData] = useState([]);

  const [readyImageSize, setReadyImageSize] = useState({ width: '4vw', height: '4vh', position: 'fixed', top: '4.9%', right: '32.5%' });
  const [startImageSize, setStartImageSize] = useState({ width: '4vw', height: '4vh', position: 'fixed', top: '4.9%', right: '27.5%' });



  useEffect(() => {
    // Function to update screen dimensions on resize
    //Bu fonksiyon, ekran boyutları güncellendiğinde çağrılacak ve setScreenWidth ve setScreenHeight ile yeni genişlik ve yüksekliği state'lere set edecektir.
    const updateDimensions = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    console.log("screenWidth : " + screenWidth)
    console.log("screenHeight : " + screenHeight)
    // Event listener to handle resize
    // tarayıcı penceresinin boyutu değiştiğinde çağrılacak olan updateDimensions fonksiyonu bir event listener'a eklenir.
    window.addEventListener('resize', updateDimensions);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('resize', updateDimensions);

  }, []);



  // useEffect(() => {

  //   roboRallyServerService.getAllCompetitorsByDuration().then(result => {


  //     if (result.data.success === true) {

  //       setCompetitors(result.data.data);
  //     } else {
  //       toast.error(result.data.message);


  //     }

  //   })
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
    const intervalId = setInterval(fetchData, 50);

    // Component unmount edildiğinde interval'i temizle
    return () => clearInterval(intervalId);
  }, []); // Boş dizi, sadece ilk render'da çalışmasını sağlar.


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

    console.log("robotId")
    console.log(robotId)

    if (city === "") {

      toast.warning("Lütfen şehir bilgisini giriniz.");

    } else if (name === "") {

      toast.warning("Lütfen yarışmacı ismini giriniz.");

    } else if (robotId === "") {

      toast.warning("Lütfen yarışmacı robot kodunu giriniz.");

    } else {

      roboRallyServerService.add(city, name, "00:00:000", isEliminated, robotId).then(result => {

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
        setRobotId("")

      });

    }
  }

  //all log file names to dropdown
  useEffect(() => {
    roboRallyServerService.getLogFileNames().then(result =>
      //console.log(result.data.data)      
      setLogFileNameOptions(result.data.data)
    ).catch((e) => {
      console.error(e);
    });
  }, [showLog])


  //get log file when filename change
  useEffect(() => {
    // Her log dosyası değiştiğinde logData state'ini temizle
    setLogData([]);

    if (logFileName) { // logFileName değişkeni bir degere sahipse calissin

      // Yeni log dosyasını al
      roboRallyServerService.getLogFile(logFileName)
        .then(result => {
          // Gelen verinin içerisindeki "data" alanına eriş
          const rawData = result.data;

          if (typeof rawData === "object") { // sadece tek satırlık log geldiğinde object olarak geliyor.

            const rawDataString = JSON.stringify(rawData); //string e dönüştür

            // Her bir satırı ayır
            const lines = rawDataString.trim().split('\n');

            // Her bir satırı JSON nesnesine dönüştür
            const parsedData = lines.map(line => JSON.parse(line));

            setLogData(parsedData);

          } else if (typeof rawData === "string") {

            // Her bir satırı ayır
            const lines = rawData.trim().split('\n');
            // Her bir satırı JSON nesnesine dönüştür
            const parsedData = lines.map(line => JSON.parse(line));

            // State'i güncelle
            setLogData(parsedData);

          }



        })
        .catch((e) => {
          console.error(e);
        });
    }

  }, [logFileName]);
  //  console.log("logData")
  // console.log(logData)

  // console.log("logData.length")
  // console.log(logData.length)


  const getMessageColor = (messageType) => {
    switch (messageType.toLowerCase()) {
      case 'success':
        return 'green';
      case 'info':
        return '#FFC800';
      case 'error':
        return 'red';
      default:
        return 'black'; // or any default color you prefer
    }
  };


  function parseDefCompetitors(message) {
    const defCompetitorsIndex = message.indexOf("DefCompetitors(");
    if (defCompetitorsIndex !== -1) {
      const preDefCompetitorsString = message.substring(0, defCompetitorsIndex).trim();
      const defCompetitorsString = message.substring(defCompetitorsIndex).trim();
      const endIndex = defCompetitorsString.lastIndexOf(")");
      if (endIndex !== -1) {
        const properties = defCompetitorsString.substring(0, endIndex).match(/\w+\s*=\s*[^,]+/g);
        if (properties) {
          const formattedContent = properties.map(prop => {
            const [key, value] = prop.split('=');
            return `${key.trim()}: ${value.trim()}`;
          }).join("\n");
          return `${preDefCompetitorsString}\n${formattedContent}`;
        }
      }
    }
    return null;
  }


  const getReadyCode = () => {

    // Tıklama yapıldığında resmin boyutunu değiştir
    setReadyImageSize(prevSize => {
      // Örnek olarak mevcut boyutun %50 büyüğünü ayarla
      const newWidth = parseFloat(prevSize.width) * 1.2 + 'vw';
      const newHeight = parseFloat(prevSize.height) * 1.2 + 'vh';
      return { width: newWidth, height: newHeight, position: 'fixed', top: '4.9%', right: '32.5%' };
    });

    // Belirli bir süre sonra boyutları tekrar sıfırla
    setTimeout(() => {
      setReadyImageSize({ width: '4vw', height: '4vh', position: 'fixed', top: '4.9%', right: '32.5%' });
    }, 300); // Örnek olarak 0.3 saniye sonra boyutları sıfırlayabilir

    roboRallyServerService.ready()
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


  const getStartCodeAndStartTimer = () => {

    // Tıklama yapıldığında resmin boyutunu değiştir
    setStartImageSize(prevSize => {
      // Örnek olarak mevcut boyutun %50 büyüğünü ayarla
      const newWidth = parseFloat(prevSize.width) * 1.2 + 'vw';
      const newHeight = parseFloat(prevSize.height) * 1.2 + 'vh';
      return { width: newWidth, height: newHeight, position: 'fixed', top: '4.9%', right: '27.5%'};
    });

    // Belirli bir süre sonra boyutları tekrar sıfırla
    setTimeout(() => {
      setStartImageSize({ width: '4vw', height: '4vh', position: 'fixed', top: '4.9%', right: '27.5%' });
    }, 300); // Örnek olarak 0.3 saniye sonra boyutları sıfırlayabilir

    roboRallyServerService.start()
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



  // console.log("competitors")
  // console.log(competitors)


  // Helper function to get gradient colors based on index
  const getGradientColors = (index) => {
    // Define your gradient colors logic here
    const gradientColors = [
      `linear-gradient(to left, rgba(240, 160, 0, 0.9), rgba(150, 50, 5, 0.8))`,
      `linear-gradient(to left, rgba(240, 160, 0, 0.8), rgba(150, 50, 5, 0.8))`,
      `linear-gradient(to left, rgba(240, 160, 0, 0.7), rgba(150, 50, 5, 0.8))`,
      `linear-gradient(to left, rgba(240, 160, 0, 0.6), rgba(241, 108, 5, 0.6))`,
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
      height: "4.5%",
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

        {/* sıralama kısmı */}
        <div style={{ flex: "0.1" }}>
          {/* sıralamanın yazıldığı yuvarlaklar*/}
          <div style={{ width: "200%", height: "200%", borderRadius: "50%" }}>

            {index < 3 && (
              <img src={`${process.env.PUBLIC_URL}/${medalIcon}`} alt={`Icon ${index + 1}`} width="120%" height="120%" style={{ alignSelf: 'flex-start', marginLeft: '-40px' }} />
            )}

            {index !== 0 && index !== 1 && index !== 2 && (

              <img src={`${process.env.PUBLIC_URL}/${index + 1}.png`} alt={`Icon ${index}`} width="120%" height="120%" style={{ alignSelf: 'flex-start', marginLeft: '-35px' }} />

            )}

          </div>
        </div>

        {/* yarısmacı bilgileri*/}
        <div style={{ marginLeft: "0.5%", flex: "0.7", fontWeight: 'bold', fontSize: "230%", color: "white", fontStyle: 'italic', fontFamily: 'New Times Roman', display: 'flex', alignItems: 'start' }}>{competitor.city.toUpperCase()}</div>
        <div style={{ flex: "4", fontWeight: 'bold', fontSize: "250%", color: "white", fontStyle: 'italic', fontFamily: 'New Times Roman', display: 'flex', alignItems: 'start'}}>{competitor.name.toUpperCase()}</div>
        <div style={{ flex: "0.5", fontWeight: 'bold', fontSize: "260%", color: "white", fontStyle: 'italic', fontFamily: 'New Times Roman' }}>

          {competitor.eliminated ? <img src={`${process.env.PUBLIC_URL}/eliminated.png`} alt="Icon" width="36%" height="40%" /> : competitor.duration}

        </div>

        <div style={{ flex: "0.5", display: 'flex', flexDirection: 'row', justifyContent: 'center', width: "100%", height: "100%" }}>

          <div onClick={() => handleIconUpdateClick(competitor.id)} style={{ cursor: 'pointer', marginRight: '5px' }}>
            <img src={`${process.env.PUBLIC_URL}/updateIcon.png`} alt="Icon update" width="100%" height="100%" />
          </div>
          <div onClick={() => handleIconDeleteClick(competitor.id)} style={{ cursor: 'pointer', marginLeft: '5px' }}>
            <img src={`${process.env.PUBLIC_URL}/deleteIcon.png`} alt="Icon delete" width="100%" height="100%" />
          </div>
        </div>
      </div>
    );
  });



  return (
    <div style={{
      width: screenWidth, height: screenHeight,
      backgroundImage: 'url(/homeBG3.png)',
      backgroundSize: '100% 100%', // Yatay boyutu otomatik, dikey boyutu %100 olacak şekilde ayarla
      backgroundRepeat: 'no-repeat', // Arka plan resmini yalnızca bir kez göster  style={{ width: '4vw', height: '4vh', position: 'fixed', top: '4.9%', right: '32.5%' }}
      backgroundPosition: 'center', // Resmi ekranda merkeze hizala
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>

      <div style={{ display: 'flex', justifyContent: 'center' }}>

        <img src={`${process.env.PUBLIC_URL}/homeLogo.png`} alt="sunnyTeknolojiLogo" style={{ width: '16%', height: '13vh', position: 'fixed', top: '0.5%', left: '4%' }} />


        <div onClick={() => getReadyCode()} style={{ cursor: 'pointer' }}>
          <img src={`${process.env.PUBLIC_URL}/button_ready.png`} alt="ready" style={{ ...readyImageSize }} />
        </div>

        <div onClick={() => getStartCodeAndStartTimer()} style={{ cursor: 'pointer' }}>
          <img src={`${process.env.PUBLIC_URL}/button_start.png`} alt="start" style={{ ...startImageSize }} />
        </div>


        {/* <div style={{ position: 'fixed', top: '9%', left: '19%', color: "#ffff" }}> screenWidth : {screenWidth}  screenHeight : {screenHeight}</div> */}

        <div onClick={() => setShowLog(true)} style={{ cursor: 'pointer' }}>
          <img src={`${process.env.PUBLIC_URL}/button_log.png`} alt="log" style={{ width: '4vw', height: '3.5vh', position: 'fixed', top: '5.3%', right: '22.5%' }} />
        </div>

        <div onClick={handleShowAddOpen} style={{ cursor: 'pointer' }}>
          <img src={`${process.env.PUBLIC_URL}/addCompetitor.png`} alt="add competitor" style={{ width: '10%', height: '8vh', position: 'fixed', top: '3%', right: '12%' }} />
        </div>


        <div onClick={() => logOutClick()} style={{ cursor: 'pointer' }}>
          <img src={`${process.env.PUBLIC_URL}/logout.png`} alt="logout" style={{ width: '6%', height: '7vh', position: 'fixed', top: '4%', right: '6%' }} />
        </div>

      </div>


      <div style={{ width: "95%", height: "88%", display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', marginTop: "6%" }}>

        {/* tablo başlıkları  */}
        {/* <div style={{ width: "95%", height: "3%", display: 'flex', alignItems: 'center', marginBottom: "0.5%", color: '#fff', fontWeight: 'bold', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.8)', fontSize: "125%", fontFamily: 'New Times Roman' }}>
          <div style={{ flex: "0.1" }}></div>
          <div style={{ flex: "0.4" }}>ŞEHİR </div>
          <div style={{ flex: "4" }}> YARIŞMACI </div>
          <div style={{ flex: "0.5" }}> SÜRE </div>
          <div style={{ flex: "0.5" }}> </div>
        </div> */}

        <div style={{ width: "95%", height: "100%" }}>
          {/* tablonun gövdesi */}
          {sections}

        </div>

      </div>

      {/* <div onClick={() => nextPageClick()} style={{ cursor: 'pointer' }}>
        <img src={`${process.env.PUBLIC_URL}/firstPage.png`} alt="first page" style={{ width: '6%', height: '7vh', position: 'fixed', bottom: '2%', right: '7%' }} />
      </div> */}

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

                <br />

                <Form.Label>ROBOT ID</Form.Label>
                <Form.Control onChange={(e) => setRobotId(e.target.value)} value={robotId} />
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

        {/* LOG LİSTEME MODAL */}

        <Modal
          show={showLog}
          onHide={() => { setShowLog(false); setLogFileName("") }}
          size="xl"
          scrollable // Modalın kendi kaydırma çubuğunu devre dışı bırakır  

        >

          <Modal.Header closeButton>
            <Modal.Title style={{ fontFamily: 'New Times Roman' }}>
              LOG GÖRÜNTÜLE
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
          // style={{ width:"100%",height:"100vh"}} 
          >

            <Form.Select aria-label="Default select example" onChange={(e) => setLogFileName(e.target.value)} value={logFileName || ''} style={{ width: '40vw', margin: "0 auto", marginBottom: "1.5%", fontFamily: 'New Times Roman' }}>

              <option value="" disabled selected>Yarışmacı seçiniz</option>

              {logFileNameOptions !== null && logFileNameOptions.map((logFileNameOption) => (
                <option value={logFileNameOption}> {logFileNameOption.replace('.json', '')}</option>
              ))}

            </Form.Select>
            <div>

              {logData.length > 0 && (
                <div>
                  {logData.map((log, index) => (
                    <div key={index} style={{ display: "flex", fontFamily: 'New Times Roman', fontSize: 17, marginLeft: "10px" }}>

                      <p style={{ color: getMessageColor(log.messageType) }}>{log.messageType}:</p>

                      {parseDefCompetitors(log.message) ? (
                        <><p style={{ color: "black" }}>{log.date} - </p><div>
                          {parseDefCompetitors(log.message).split('\n').map((line, i) => (
                            <p key={i} style={{ fontSize: 17, color: "black" }}>{line}</p>
                          ))}
                        </div></>
                      ) :

                        (
                          <p style={{ color: "black" }}>{log.date} - {log.message}</p>
                        )}
                    </div>
                  ))}
                </div>
              )}
            </div>


          </Modal.Body>
        </Modal>


      </>



    </div>
  )
}
