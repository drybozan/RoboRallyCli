 for (let index = 0; index < numOfSections; index++) {
    if (index >= 0 && index <= 9) {
      if (index === 0) {

        sections.push(

          // yarışmacıları listeleyen yatay cubuk
          <div key={competitors[index].id} style={{ width: "95%", height: "8.5%", borderRadius: "50px", backgroundImage: `linear-gradient(to left, rgba(255, 227, 0, 0.8), rgba(220, 50, 5, 0.8))`, display: 'flex', alignItems: 'center', marginBottom: "0.3%", border: "2px solid white" }}>

            {/* sıralama kısmı */}
            <div style={{ flex: "0.3" }}>

              {/* sıralamanın yazıldığı yuvarlaklar*/}
              <div style={{ width: "60%", height: "100%", borderRadius: "50%" }}>
                {index === 0 && (

                  <img src={`${process.env.PUBLIC_URL}/1.png`} alt="Icon gold" width="100" height="100" style={{ alignSelf: 'flex-start', marginLeft: '-20px' }} />
                )}

              </div>

            </div>

            {/* yarısmacı bilgileri*/}
            <div style={{ flex: "0.5", fontWeight: 'bold', fontSize: "37px", color: "white", fontStyle: 'italic', fontFamily: 'New Times Roman' }}> {competitors[index].city.toUpperCase()}</div>
            <div style={{ flex: "2", fontWeight: 'bold', fontSize: "37px", color: "white", fontStyle: 'italic', fontFamily: 'New Times Roman' }}> {competitors[index].name.toUpperCase()} </div>
            <div style={{ flex: "1", fontWeight: 'bold', fontSize: "37px", color: "white", fontStyle: 'italic', fontFamily: 'New Times Roman' }}>
              {/* {competitors[index].eliminated === true ? (<img src={`${process.env.PUBLIC_URL}/eliminated.png`} alt="Icon" width="95" height="85" />) : competitors[index].duration} */}

              <button onClick={() => startTimer(index)} disabled={timer&& timer.isRunning}>
                Start Racer {index + 1}
              </button>
              <button onClick={() => stopTimer(index)} disabled={!timer || !timer.isRunning}>
                Stop Racer {index + 1}
              </button>

            </div>

            <div style={{ flex: "0.5", display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

              <div onClick={() => handleIconUpdateClick(competitors[index].id)} style={{ cursor: 'pointer', marginRight: '5px' }}>

                <img src={`${process.env.PUBLIC_URL}/updateIcon.png`} alt="Icon update" width="35" height="35" />
              </div>
              <div onClick={() => handleIconDeleteClick(competitors[index].id)} style={{ cursor: 'pointer', marginLeft: '5px' }}>
                <img src={`${process.env.PUBLIC_URL}/deleteIcon.png`} alt="Icon delete" width="35" height="35" />
              </div>

            </div>
          </div>

        );

      } else if (index === 1) {

        sections.push(

          // yarışmacıları listeleyen yatay cubuk
          <div key={competitors[index].id} style={{ width: "95%", height: "8.5%", borderRadius: "50px", backgroundImage: `linear-gradient(to left, rgba(255, 227, 0, 0.6), rgba(220, 50, 5, 0.7))`, display: 'flex', alignItems: 'center', marginBottom: "0.3%", border: "2px solid white" }}>

            {/* sıralama kısmı */}
            <div style={{ flex: "0.3" }}>

              {/* sıralamanın yazıldığı yuvarlaklar*/}
              <div style={{ width: "60%", height: "100%", borderRadius: "50%" }}>

                {index === 1 && (

                  <img src={`${process.env.PUBLIC_URL}/2.png`} alt="Icon silver" width="100" height="100" style={{ alignSelf: 'flex-start', marginLeft: '-20px' }} />

                )}

              </div>

            </div>

            <div style={{ flex: "0.5", fontWeight: 'bold', fontSize: "37px", color: "white", fontStyle: 'italic', fontFamily: 'New Times Roman' }}> {competitors[index].city.toUpperCase()} </div>
            <div style={{ flex: "2", fontWeight: 'bold', fontSize: "37px", color: "white", fontStyle: 'italic', fontFamily: 'New Times Roman' }}> {competitors[index].name.toUpperCase()} </div>
            <div style={{ flex: "1", fontWeight: 'bold', fontSize: "37px", color: "white", fontStyle: 'italic', fontFamily: 'New Times Roman' }}>
              {competitors[index].eliminated === true ? (<img src={`${process.env.PUBLIC_URL}/eliminated.png`} alt="Icon" width="95" height="85" />) : competitors[index].duration}
            </div>

            <div style={{ flex: "0.5", display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

              <div onClick={() => handleIconUpdateClick(competitors[index].id)} style={{ cursor: 'pointer', marginRight: '5px' }}>
                <img src={`${process.env.PUBLIC_URL}/updateIcon.png`} alt="Icon update" width="35" height="35" />
              </div>
              <div onClick={() => handleIconDeleteClick(competitors[index].id)} style={{ cursor: 'pointer', marginLeft: '5px' }}>
                <img src={`${process.env.PUBLIC_URL}/deleteIcon.png`} alt="Icon delete" width="35" height="35" />
              </div>

            </div>
          </div>

        );

      } else if (index === 2) {

        sections.push(

          // yarışmacıları listeleyen yatay cubuk
          <div key={competitors[index].id} style={{ width: "95%", height: "8.5%", borderRadius: "50px", backgroundImage: `linear-gradient(to left, rgba(255, 227, 0, 0.5), rgba(220, 50, 5, 0.6))`, display: 'flex', alignItems: 'center', marginBottom: "0.3%", border: "2px solid white" }}>

            {/* sıralama kısmı */}
            <div style={{ flex: "0.3" }}>

              {/* sıralamanın yazıldığı yuvarlaklar*/}
              <div style={{ width: "60%", height: "100%", borderRadius: "50%" }}>

                {index === 2 && (

                  <img src={`${process.env.PUBLIC_URL}/3.png`} alt="Icon bronz" width="100" height="100" style={{ alignSelf: 'flex-start', marginLeft: '-20px' }} />

                )}

              </div>

            </div>

            <div style={{ flex: "0.5", fontWeight: 'bold', fontSize: "37px", color: "white", fontStyle: 'italic', fontFamily: 'New Times Roman' }}> {competitors[index].city.toUpperCase()}  </div>
            <div style={{ flex: "2", fontWeight: 'bold', fontSize: "37px", color: "white", fontStyle: 'italic', fontFamily: 'New Times Roman' }}> {competitors[index].name.toUpperCase()}   </div>
            <div style={{ flex: "1", fontWeight: 'bold', fontSize: "37px", color: "white", fontStyle: 'italic', fontFamily: 'New Times Roman' }}>
              {competitors[index].eliminated === true ? (<img src={`${process.env.PUBLIC_URL}/eliminated.png`} alt="Icon" width="95" height="85" />) : competitors[index].duration}
            </div>
            <div style={{ flex: "0.5", display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

              <div onClick={() => handleIconUpdateClick(competitors[index].id)} style={{ cursor: 'pointer', marginRight: '5px' }}>
                <img src={`${process.env.PUBLIC_URL}/updateIcon.png`} alt="Icon update" width="35" height="35" />
              </div>
              <div onClick={() => handleIconDeleteClick(competitors[index].id)} style={{ cursor: 'pointer', marginLeft: '5px' }}>
                <img src={`${process.env.PUBLIC_URL}/deleteIcon.png`} alt="Icon delete" width="35" height="35" />
              </div>

            </div>
          </div>

        );

      } else {


        sections.push(

          // yarışmacıları listeleyen yatay cubuk
          <div key={competitors[index].id} style={{ width: "95%", height: "8.5%", borderRadius: "50px", backgroundImage: `linear-gradient(to left, rgba(255, 227, 0, 0.2), rgba(241, 108, 5, 0.3))`, display: 'flex', alignItems: 'center', marginBottom: "0.3%", border: "2px solid white" }}>

            {/* sıralama kısmı */}
            <div style={{ flex: "0.3" }}>

              {index !== 0 && index !== 1 && index !== 2 && (

                <img src={`${process.env.PUBLIC_URL}/${index + 1}.png`} alt={`Icon ${index}`} width="123" height="125" style={{ alignSelf: 'flex-start', marginLeft: '-58px' }} />

              )}
            </div>

            <div style={{ flex: "0.5", fontWeight: 'bold', fontSize: "37px", color: "white", fontStyle: 'italic', fontFamily: 'New Times Roman' }}>{competitors[index].city.toUpperCase()}</div>
            <div style={{ flex: "2", fontWeight: 'bold', fontSize: "37px", color: "white", fontStyle: 'italic', fontFamily: 'New Times Roman' }}> {competitors[index].name.toUpperCase()}</div>
            <div style={{ flex: "1", fontWeight: 'bold', fontSize: "37px", color: "white", fontStyle: 'italic', fontFamily: 'New Times Roman' }}>
              {competitors[index].eliminated === true ? (<img src={`${process.env.PUBLIC_URL}/eliminated.png`} alt="Icon" width="95" height="85" />) : competitors[index].duration}
            </div>
            <div style={{ flex: "0.5", display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

              <div onClick={() => handleIconUpdateClick(competitors[index].id)} style={{ cursor: 'pointer', marginRight: '5px' }}>
                <img src={`${process.env.PUBLIC_URL}/updateIcon.png`} alt="Icon update" width="35" height="35" />
              </div>
              <div onClick={() => handleIconDeleteClick(competitors[index].id)} style={{ cursor: 'pointer', marginLeft: '5px' }}>
                <img src={`${process.env.PUBLIC_URL}/deleteIcon.png`} alt="Icon delete" width="35" height="35" />
              </div>

            </div>
          </div>

        );
      }
    }
  }


  // ----------------------------------------------------main 2
  const sections = [];

  for (let index = 0; index < competitors.length; index++) {
      if (index >= 10 && index <= 19) {
          sections.push(

              <div key={competitors[index].id} style={{ width: "95%", color: '#fff', height: "8.5%", borderRadius: "50px", backgroundImage: `linear-gradient(to left, rgba(255, 227, 0, 0.2), rgba(241, 108, 5, 0.3))`, display: 'flex', alignItems: 'center', marginBottom: "0.3%", border: "2px solid white" }}>

                  {/* sıralama kısmı */}
                  <div style={{ flex: "0.3" }}>

                      {index === 12 && (
                          <img src={`${process.env.PUBLIC_URL}/${index + 1}.png`} alt={`Icon ${index}`} width="123" height="125" style={{ alignSelf: 'flex-start', marginLeft: '-58px',marginBottom: '8px'}} />
                      )}

                      {index === 14 && (
                          <img src={`${process.env.PUBLIC_URL}/${index + 1}.png`} alt={`Icon ${index}`} width="123" height="125" style={{ alignSelf: 'flex-start', marginLeft: '-58px',marginTop: '7px' }} />
                      )}

                      {index !== 12 && index !== 14 && (
                          <img src={`${process.env.PUBLIC_URL}/${index + 1}.png`} alt={`Icon ${index}`} width="123" height="125" style={{ alignSelf: 'flex-start', marginLeft: '-58px' }} />
                      )}

                  </div>

                  <div style={{ flex: "0.5", fontWeight: 'bold', fontSize: "37px", fontStyle: 'italic', fontFamily: 'New Times Roman' }}> {competitors[index].city.toUpperCase()}  </div>
                  <div style={{ flex: "2", fontWeight: 'bold', fontSize: "37px", fontStyle: 'italic', fontFamily: 'New Times Roman' }}> {competitors[index].name.toUpperCase()} </div>
                  <div style={{ flex: "1", fontWeight: 'bold', fontSize: "37px", fontStyle: 'italic', fontFamily: 'New Times Roman' }}> 
                  {competitors[index].eliminated === true ? (<img src={`${process.env.PUBLIC_URL}/eliminated.png`} alt="Icon" width="95" height="85" />) : competitors[index].duration}

                  </div>
                  <div style={{ flex: "0.5", display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

                      <div onClick={() => handleIconUpdateClick(index)} style={{ cursor: 'pointer', marginRight: '5px' }}>
                          <img src={`${process.env.PUBLIC_URL}/updateIcon.png`} alt="Icon update" width="35" height="35" />
                      </div>
                      <div onClick={() => handleIconDeleteClick(competitors[index].id)} style={{ cursor: 'pointer', marginLeft: '5px' }}>
                          <img src={`${process.env.PUBLIC_URL}/deleteIcon.png`} alt="Icon delete" width="35" height="35" />
                      </div>

                  </div>
              </div>

          );
      }
  }
