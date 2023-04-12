import './App.css';
import {BrowserRouter as Router, RouteProps, Route, Routes} from 'react-router-dom'
import { Home } from './pages/home';
import { CreateRecipe } from './pages/create-recipe';
import { SavedRecipe } from './pages/saved-recipes';
import { Register } from './pages/register';
import {Login} from './pages/login'
import {NavBar} from './components/navbar'
import Footer from './components/footer';
function App() {
  return (
    <div className="App">
      <Router>
    <NavBar/>
        <Routes>
          <Route path="/" element ={<Home/>}></Route>
          <Route path="/register" element ={<Register/>}></Route>
          <Route path="/login" element ={<Login/>}></Route>
          <Route path="/create-recipe" element ={<CreateRecipe/>}></Route>
          <Route path="/saved-recipes" element ={<SavedRecipe/>}></Route>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
