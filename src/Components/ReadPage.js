import React, {useEffect, useState} from 'react';
import '../Components/ReadPage.css';
import {Link} from 'react-router-dom';
import firestore from './Firebase';

function Read(){

    const [data, setData] = useState([]);

    function colorPicker() {
        const colorPalette = ['0444BF', '0584F2', '0AAFF1', 'EDF259', '6465A5', '6975A6', 'F28A30', 'F3E96B', 'F05837',
            '192E5B', '1D65A6', '00743F', 'F2A104', '16235A', 'F4874B', '5C4A72', '80ADD7', 'C0334D', '0486DB', '05ACD3',
            '73C0F4', '182657', '121F40', 'D75B66', '2B193E', '8D2D56', 'D53C3C', 'F1445B', 'F2746B', 'BE302B', 'BE3B45'
        ]

        let dynamicBorderStyle = {
            borderLeft: `10px solid #${colorPalette[Math.floor(Math.random()*31)]}`
        }

        return dynamicBorderStyle;
    }

    useEffect(()=>{
        checkForDate();
        const firestoreData = [];
        let counter = 0;
        firestore.database.collection('notes').get().then((querySnapshot) => {
            querySnapshot.forEach((queryElement) => {
                if(queryElement != null){
                    firestoreData.push({
                        data: queryElement.data().note,
                        time: queryElement.data().time,
                        id: queryElement.id,
                        monthReminder: counter %10 === 0 ? true : false
                    });
                    counter++;
                    if(counter >= 10) counter = 0;
                }
            })
            setData(firestoreData);
            console.log('data called');
        })
    },[])

    function checkForDate(el, monthReminder){
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let seconds = el;
        let currentMonth = new Date().getUTCMonth(seconds);
        let currentYear = new Date().getUTCFullYear(seconds);
        const h1 = React.createElement('h1', {className: "noteDate"}, `${monthNames[currentMonth]}, ${currentYear}`);

        if(monthReminder === true){
            return h1;
        }


    }

    function convertTime(time){
        const monthNames = ["january", "february", "march", "april", "may", "june",
            "july", "august", "september", "october", "november", "december"
        ];

        let conYear = new Date().getUTCFullYear(time);
        let conMonths = new Date().getUTCMonth(time);
        let conDay = new Date().getUTCDate(time);

        return (
            `${monthNames[conMonths]} ${conDay}, ${conYear}`
        )

    }

    return(
        <div className="row postRow">
            <div className="col-md-12 postMainWrapper">
                <div>
                 {data === [] ? <p>no data received</p> : data.map(function (el){
                     if(el.data !== ''){
                     return <div key={Math.floor(Math.random()*50000)}>
                                <div id="noteDateInsert" key={Math.floor(Math.random()*50000)}>
                                    {checkForDate(el.time.seconds, el.monthReminder)}
                                </div>
                                <div key={Math.floor(Math.random()*50000)} className="noteBox" style={colorPicker()}>
                                    <p key={Math.floor(Math.random()*50000)} className="noteBoxP">{el.data}</p>
                                    <span key={Math.floor(Math.random()*50000)} className="noteBoxS">{convertTime(el.time.seconds)}</span>
                                </div>
                            </div>                                   
                     }
                     return null;
                 })}
                </div>
            </div>
            <div className="col-md-12 readButtonMargin">
                <Link to="/" className="readBackButton">go back</Link>
            </div>
        </div>
    )
}

export default Read;