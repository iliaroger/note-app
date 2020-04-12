import React from 'react';
import '../Components/LoginPage.css'
import {Link} from 'react-router-dom';

function Login(){
    return(
        <div className="outerWrapper">
        <div className="row innerRow">
            <p className="col-md-12 mainText">my notebook (ilia roger). <br></br> have fun reading my notes and thoughts. <br></br> what is privacy anyway? </p>
            <div className="col-md-12">
                <p className="ifText">if you are ilia then:</p>
            </div>
            <Link to="/post" className="linkWrapper loginButton">
                login
            </Link>
            <div className="col-md-12">
                <p className="elseText">else:</p>
            </div>
            <Link to="/read" className="linkWrapper readButton">
                read notes     
            </Link>
        </div>
        </div>
        
    )
}

export default Login;