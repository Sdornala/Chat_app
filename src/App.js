import { ChatEngine } from 'react-chat-engine';
import LoginForm from './Components/LoginForm';
import ChatFeed from './Components/ChatFeed';


import './App.css';

const projectID = 'cce48a03-41d8-4330-8908-81c77b304a0b';

const App = () => {
    if (!localStorage.getItem('username')) return <LoginForm />;
    
    return (
        <ChatEngine
            height="100vh"
            projectID={projectID}
            userName={localStorage.getItem('username')}
            userSecret={localStorage.getItem('password')}
            renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
        />
        
    )

};

export default App;