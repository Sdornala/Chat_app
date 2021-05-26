import { useState } from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';


const projectID = 'cce48a03-41d8-4330-8908-81c77b304a0b';

const LoginForm = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const loadChat = async () => {
        const authObject = { 'Project-ID': projectID, 'User-Name': username, 'User-Secret': password };
        await axios.get('https://api.chatengine.io/chats', { headers: authObject });
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await loadChat();

            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            window.location.reload();
            setError('');
        } catch (err) {
            setError('Oops, incorrect credentials.');
        }
    };

    const onSignIn = async (googleuser) => {
        var profile = googleuser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        const username = profile.getName();

        var id_token = googleuser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);

        if(profile) {
            await loadChat(username);

            window.location.reload();
        }
    }
   


    // const refreshTokenSetup = res => {
    //     // Timing to renew access token
    //     let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

    //     const refreshToken = async () => {
    //         const newAuthRes = await res.reloadAuthResponse();
    //         refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;

    //         // saveUserToken(newAuthRes.access_token);  <-- save new token

    //         // Setup the other timer after the first one
    //         setTimeout(refreshToken, refreshTiming);
    //     };

    //     // Setup first refresh timer
    //     setTimeout(refreshToken, refreshTiming);
    // };


    // const successResponse = (res) => {
    //     console.log('[Login Suceess] currentUser:', res.profileObj);
    //     refreshTokenSetup(res);
    // };

    const failureResponse = (res) => {
        console.log('[Login failed] res:', res);
    };

    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">Chat Application</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
                    <div align="center">
                        <button type="submit" className="button">
                            <span>Start chatting</span>
                        </button>
                    </div>
                    <div className="login">

                        <GoogleLogin
                            clientId={'987871101716-6m5m2hje57vjbnc8ql62mi3k4l4tdt40.apps.googleusercontent.com'}
                            onSuccess={onSignIn}
                            onFailure={failureResponse}
                            onSubmit={handleSubmit}
                        >
                            <span> Login with Google</span>
                        </GoogleLogin>
                    </div>
                </form>
                <h1>{error}</h1>
            </div>
        </div>

    );
};

export default LoginForm;