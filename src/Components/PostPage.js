import React, {useEffect, useState} from 'react';
import '../Components/PostPage.css';
import {Link} from 'react-router-dom';
import db from './Firebase';

function Post(){

    const [id, setId] = useState(['']);
    const [data, setData] = useState(['']);
    const [input, setInput] = useState('');
    const purpleColor = "#4300FF";

    const dynamicBorderStyle = {
        borderLeft: "10px solid " + purpleColor
    }

    useEffect(()=>{
        const firestoreData = [''];
        const firestoreId = [''];
        db.collection('notes').get().then((querySnapshot) => {
            querySnapshot.forEach((queryElement) => {
                if(queryElement != null){
                    firestoreData.push(queryElement.data().note)
                    firestoreId.push(queryElement.id);
                }
            })
            setData(firestoreData);
            setId(firestoreId);
        })
        console.log("function called")
    },[])

    function changeInput(e){
        setInput(e.target.value);
    }

    function postNote(){
        // post data to firebase

        if(input !== ''){
            db.collection('notes').add({
                note: input
            })
            .then(()=>{
                setData([
                    ...data,
                    input
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
                 {data === [''] ? <p>no data received</p> : data.map(function (el){
                     if(el !== ''){
                     return <div className="noteBox" style={dynamicBorderStyle}>
                                <p key={id} className="noteBoxP">{el}</p> 
                                <span className="noteBoxS">march 31, 2020</span>
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