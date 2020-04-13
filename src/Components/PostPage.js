import React, {useEffect, useState} from 'react';
import '../Components/PostPage.css';
import {Link} from 'react-router-dom';
import db from './Firebase';

function Post(){

    const [input, setInput] = useState('');

    useEffect(()=>{
        // retrieve data from firebase database
        console.log('input has changed, ' + input);
    }, [input])

    function changeInput(e){
        setInput(e.target.value);
    }

    function postNote(){
        // post data to firebase

        if(input != null){
            db.collection('notes').add({
                note: input
            })
            .then(()=>{
                console.log('note saved');
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
                <ul>

                </ul>
            </div>
            <div className="col-md-12">
                <input className="postInput" onChange={changeInput} value={input}></input>
            </div>
            <div className="col-md-12 buttonMargin">
                <Link onClick={postNote} className="postButton">post</Link>
            </div>
            <div className="col-md-12 buttonMargin">
                <Link to="/" className="backButton">go back</Link>
            </div>
        </div>
    )
}

export default Post;