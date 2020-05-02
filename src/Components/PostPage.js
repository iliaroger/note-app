import React, {useEffect, useState, useCallback} from 'react';
import '../Components/PostPage.css';
import {Link, Redirect} from 'react-router-dom';
import firestore from './Firebase';


function Post(props){

    const [data, setData] = useState([]);
    const [userValidated, setValidation] = useState('false');

    let inputData;

    function colorPicker(){
        const colorPalette = ['0444BF', '0584F2', '0AAFF1', 'EDF259', '6465A5', '6975A6', 'F28A30', 'F3E96B', 'F05837',
        '192E5B', '1D65A6', '00743F', 'F2A104', '16235A', 'F4874B', '5C4A72', '80ADD7', 'C0334D', '0486DB', '05ACD3',
        '73C0F4', '182657', '121F40', 'D75B66', '2B193E', '8D2D56', 'D53C3C', 'F1445B', 'F2746B', 'BE302B', 'BE3B45'
        ]

        let dynamicBorderStyle = {
            borderLeft: `10px solid #${colorPalette[Math.floor(Math.random()*31)]}`
        }

        return dynamicBorderStyle;
    }

    // get month for the h1 separators that come every 10 posts. 
    function getMonth(el){
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        let epoch = new Date(0);
        let conTime = epoch.setUTCSeconds(el);
        let month = new Date(conTime).getMonth();
        
        return monthNames[month];

    }

    function hashId(){
        const characters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P',
        'Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k',
        'l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5',
        '6','7','8','9'];

        let hash = '';
        for(let i = 0; i < 20; i++){
            hash += `${characters[Math.floor(Math.random() * 62)]}`;
        }

        return `${hash}`
    }

    useEffect(()=>{

        props.location.state !== undefined ? setValidation(true) : setValidation(false);
        const firestoreData = [];
        let counter = 0;
        firestore.database.collection('notes').get().then((querySnapshot) => {
            querySnapshot.forEach((queryElement) => {
                if(queryElement != null){
                    firestoreData.push({
                        data: queryElement.data().note,
                        time: queryElement.data().time,
                        id: queryElement.id, 
                    });
                }
            })
            // sort posts by post date. switch a and b to reverse the order
            const sortedData = [...firestoreData].sort((a,b)=>{
                return a.time - b.time; 
            });
            sortedData.forEach((element)=>{
                Object.defineProperties(element, {
                    monthReminder: {
                        value: counter % 10 === 0 ? true : false,
                        writable: true
                    }
                })
                /* added this month property for every post so that the proper month can be displayed
                   in the h1 separator
                */
                Object.defineProperties(element, {
                    monthDisplay: {
                        value: getMonth(element.time.seconds),
                        writable: true
                    }
                })
                counter++;
                if (counter >= 10) counter = 0;
            })

            setData(sortedData);
            console.log('database called');
        })
    },[])

    function checkForDate(el, monthReminder, elementMonth){
        let seconds = el;
        let currentYear = new Date().getUTCFullYear(seconds);
        const h1 = React.createElement('h1', {className: "noteDate"}, `${elementMonth.monthDisplay}, ${currentYear}`);
        if(monthReminder === true){
            return h1;
        }


    }

    function convertTime(time){
        const monthNames = ["january", "february", "march", "april", "may", "june",
            "july", "august", "september", "october", "november", "december"
        ];

        if(time !== undefined || NaN){
            let epoch = new Date(0);
            let conTime = epoch.setUTCSeconds(time);

            let day = new Date(conTime).getDate();
            let month = new Date(conTime).getMonth();
            let year = new Date(conTime).getFullYear();

            return (
            `${monthNames[month]} ${day}, ${year}`
            )
        }

        else{
            return (
                `${monthNames[new Date().getMonth()]} ${new Date().getDate()}, ${new Date().getFullYear()}`
            )
        }


    }

    function postNote(){
        // post data to firebase

        if(inputData.value !== ''){
            
            let currentTime = new Date();
            firestore.database.collection('notes').add({
                note: inputData.value,
                time: currentTime
            })
            .then(()=>{
                setData([
                    ...data,
                    {
                        data: inputData.value,
                        time: currentTime
                    }
                ])
            })
            .catch(()=>{
                console.log('error adding this document');
            })
        }
    }

    return(
        userValidated ? ( 
        <div className="row postRow">
            <div className="col-md-12 postMainWrapper">
                <div>
                 {data === [] ? <p>no data received</p> : data.map(function (el){
                     if(el.data !== ''){
                         return <div key={hashId()}>
                                <div key={hashId()} id="noteDateInsert">
                                    {checkForDate(el.time.seconds, el.monthReminder, el)}
                                </div>
                                <div key={hashId()} className="noteBox" style={colorPicker()}>
                                    <p key={hashId()} className="noteBoxP">{el.data}</p>
                                    <span key={hashId()} className="noteBoxS">{convertTime(el.time.seconds)}</span>
                                </div>
                            </div>                                   
                     }
                     return null;
                 })}
                </div>
            </div>
            <div className="col-md-12">
                <input className="postInput" ref={input => inputData = input} value={inputData}></input>
            </div>
            <div className="col-md-12 buttonMargin">
                <button onClick={postNote} className="postButton">post</button>
            </div>
            <div className="col-md-12 buttonMargin">
                <Link to="/" className="backButton">go back</Link>
            </div>
        </div>
        ): <div>
                <Redirect to='/'></Redirect>
            </div>
    )
}

export default Post;