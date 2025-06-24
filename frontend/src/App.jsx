import './App.css'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import RoleSelection from './components/RoleSelection'
import UserDetails from './components/UserDetails'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route element={<ProtectedRoute/>}>
            <Route path='/home' element={<Home/>}/>
            <Route path='/user-role' element={<RoleSelection/>}/>
            <Route path='/user-details' element={<UserDetails/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
