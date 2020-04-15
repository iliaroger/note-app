import React, {useEffect, useState} from 'react';
import '../Components/PostPage.css';
import {Link} from 'react-router-dom';
import db from './Firebase';

function Post(){

    const [data, setData] = useState([]);
    const [input, setInput] = useState('');
    const purpleColor = "#4300FF";

    const dynamicBorderStyle = {
        borderLeft: "10px solid " + purpleColor
    }

    useEffect(()=>{
        checkForDate();
        const firestoreData = [];
        db.collection('notes').get().then((querySnapshot) => {
            querySnapshot.forEach((queryElement) => {
                if(queryElement != null){
                    firestoreData.push({
                        data: queryElement.data().note,
                        time: queryElement.data().time,
                        id: queryElement.id
                    });
                }
            })
            setData(firestoreData);
        })
    },[])

    function changeInput(e){
        setInput(e.target.value);
    }

    function checkForDate(){
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let currentDate = new Date();
        const h1 = React.createElement('h1', {className: "noteDate"}, `${monthNames[currentDate.getMonth()]}, ${currentDate.getFullYear()}`)

        if(currentDate.getDate() === 15){
            return h1;
        }
    }

    function postNote(){
        // post data to firebase

        if(input !== ''){
            
            let currentTime = new Date();
            db.collection('notes').add({
                note: input,
                time: currentTime
            })
            .then(()=>{
                setData([
                    ...data,
                    {
                        data: input,
                        time: currentTime
                    }
                ])
            })
            .catch(()=>{
                console.log('error adding this document');
            })
        }
        setInput('');
    }

    return(
        <div className="row postRow">
            <div className="col-md-12 postMainWrapper">
                <div>
                 {data === [] ? <p>no data received</p> : data.map(function (el){
                     if(el.data !== ''){
                     return <div>
                                <div id="noteDateInsert">
                                    {checkForDate()}
                                </div>
                                <div className="noteBox" style={dynamicBorderStyle}>
                                    <p key={el.id} className="noteBoxP">{el.data}</p>
                                    <span className="noteBoxS">march 31, 2020</span>
                                </div>
                            </div>                                   
                     }
                     return null;
                 })}
                </div>
            </div>
            <div className="col-md-12">
                <input className="postInput" onChange={changeInput} value={input}></input>
            </div>
            <div className="col-md-12 buttonMargin">
                <button onClick={postNote} className="postButton">post</button>
            </div>
            <div className="col-md-12 buttonMargin">
                <Link to="/" className="backButton">go back</Link>
            </div>
        </div>
    )
}

export default Post;