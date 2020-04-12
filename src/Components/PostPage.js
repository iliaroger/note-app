import React, {useEffect} from 'react';
import '../Components/PostPage.css';
import {Link} from 'react-router-dom';

function Post(){

    useEffect(()=>{
        // retrieve data from firebase database
    })

    function postNote(){
        // post data to firebase
    }

    return(
        <div className="row postRow">
            <div className="col-md-12 postMainWrapper">
                <ul>

                </ul>
            </div>
            <div className="col-md-12">
                <input className="postInput"></input>
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