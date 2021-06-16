import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link} from "react-router-dom";
import './App.css';
import SignIn from "./SignIn";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signIn">Sign In</Link>
            </li>

          </ul>
        </nav>

      <Switch>
        <Route path="/signIn">
          <SignIn />
        </Route>
        <Route path="/">
          
        </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
