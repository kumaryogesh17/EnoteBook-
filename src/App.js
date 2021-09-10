import Navbar from './components/Navbar';
import './App.css';
import { About } from './components/About';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { Home } from './components/Home';
import NoteState from './context/notes/NoteState';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/SignUp">
                <SignUp />
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}


export default App;
