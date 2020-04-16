import React, {useEffect, useState} from 'react';
import '../Components/ReadPage.css';
import {Link} from 'react-router-dom';
import db from './Firebase';

function Read(){

    const [data, setData] = useState([]);
    const purpleColor = "#4300FF";

    const dynamicBorderStyle = {
        borderLeft: "10px solid " + purpleColor
    }

    useEffect(()=>{
        checkForDate();
        const firestoreData = [];
        let counter = 0;
        db.collection('notes').get().then((querySnapshot) => {
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
                     return <div key={el.id + 22}>
                                <div id="noteDateInsert" key={el.id + 20}>
                                    {checkForDate(el.time.seconds, el.monthReminder)}
                                </div>
                                <div key={el.id + 18} className="noteBox" style={dynamicBorderStyle}>
                                    <p key={el.id} className="noteBoxP">{el.data}</p>
                                    <span key={el.id + 24} className="noteBoxS">{convertTime(el.time.seconds)}</span>
                                </div>
                            </div>                                   
                     }
                     return null;
                 })}
                </div>
            </div>
            <div className="col-md-12 buttonMargin">
                <Link to="/" className="readBackButton">go back</Link>
            </div>
        </div>
    )
}

export default Read;