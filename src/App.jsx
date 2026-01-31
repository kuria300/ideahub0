import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import { useAuthHook } from './context/Contextdata';
import IdeaFeedPage from './components/IdeaFeedPage/IdeaFeedPage';
import Login from './components/login/Login';
import ProfilePage from './components/ProfilePage/ProfilePage'
import Addidea from './components/addIdeaForm/AddIdea';



function App() {
const {user}= useAuthHook()
  return (
     <>
     
     <Routes>
       <Route path='/' element={<IdeaFeedPage />}/>
       <Route path='/:id' element={<IdeaFeedPage />}/>
       <Route path='/login' element={<Login />}/>
       <Route path='/profile/:id' element={user ? <ProfilePage /> : <Navigate to='/' />}/>
       <Route path='/addidea/:id' element={user ? <Addidea />: <Navigate to='/' />}/>
     </Routes>

     </>
  );
}

export default App
