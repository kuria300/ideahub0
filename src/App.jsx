import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar';
import Login from './components/login/Login';
import IdeaFeedPge from './components/IdeaFeedPage/IdeaFeedPge';

function App() {

  return (
     <div>
      <Routes>
        <Route path= '/' element={<IdeaFeedPge />}/>
      </Routes>
    </div>
  );
}

export default App
