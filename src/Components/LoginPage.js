import React, {useState} from 'react';
import '../Components/LoginPage.css'
import {Link, Redirect} from 'react-router-dom';
import firestore from './Firebase';

function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userAuth, setUserAuth] = useState(false);
    
    function loginUser(){

        const authPromise = firestore.authentication.signInWithEmailAndPassword(email, password);

        authPromise.then((data)=>{
            if(data != null){
                console.log('user authenticated');
                setUserAuth(true);
            }
        }).catch((err)=>{
            console.log(err);
            setUserAuth(false);
        })
    }

    function onEmailChange(e){
        setEmail(e.target.value);
    }

    function onPasswordChange(e){
        setPassword(e.target.value);
    }

    return(
        <div className="row innerRow">
            <div className="col-md-12">
                <p className="col-md-12 mainText">my notebook (ilia roger). <br></br> have fun reading my notes and thoughts. <br></br> what is privacy anyway? </p>
                <p className="ifText">if you are ilia then:</p>
            </div>
            <div className="col-md-12 inputGroup">
                <form>
                    <input className="loginInput" id="loginEmail" onChange={onEmailChange} type="email" placeholder="email"></input>
                    <input className="loginInput" id="loginPassword" type="password" onChange={onPasswordChange} placeholder="password"></input>
                </form>
            </div>
            <div className="col-md-12 centerButton">
                <button onClick={loginUser} className="linkWrapper loginButton">
                login
                </button>
                {userAuth ? <Redirect to={{
                pathname: '/post',
                state: {validated: true}
                }} /> : null}
            </div>
            
            <div className="col-md-12">
                <p className="elseText">else:</p>
            </div>
            <div className="col-md-12 centerButton">
                <Link to="/read" className="linkWrapper readButton">
                    read notes     
                </Link>
            </div>
        </div>
        
    )
}

export default Login;