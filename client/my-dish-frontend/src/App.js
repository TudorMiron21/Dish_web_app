import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, RouteProps, Route, Routes} from 'react-router-dom'
import { Home } from './pages/home';
import { CreateRecipe } from './pages/create-recipe';
import { SavedRecipe } from './pages/saved-recipes';
import { Register } from './pages/register';
import {Login} from './pages/login'
import {NavBar} from './components/navbar'
import Footer from './components/footer';
import { DeleteRecipe } from './pages/delete-recipe';
import { ChangeCredentials } from './pages/change-credentials';
import { MainListing } from './pages/main-listing';
import { SeeMore } from './pages/see-more';
import { AdminControl } from './pages/admin-control';
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
          <Route path="/delete-recipes" element ={<DeleteRecipe/>}></Route>
          <Route path="/change-credentials" element ={<ChangeCredentials/>}></Route>
          <Route path="/main-listing" element ={<MainListing/>}></Route>
          <Route path="/see-more" element ={<SeeMore/>}></Route>
          <Route path="/admin-control" element ={<AdminControl/>}></Route>

        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
