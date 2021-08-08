import {
  BrowserRouter as Router,
  Switch} from "react-router-dom";
import './App.css';
import SignIn from "./components/SignIn/SignIn";
import Login from "./components/Login/Login";
import Profile from "./components/Profile";
import Timeline from "./components/Timeline";
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

function App() {
  return (
    <Router>
      <div>

      <Switch>
        <PublicRoute exact restricted={false} path="/" component={SignIn}/>
        <PublicRoute exact restricted={false} path="/login" component={Login}/>
        <PrivateRoute component={Profile} path="/profile" exact />
        <PrivateRoute component={Timeline} path="/timeline" exact />
      </Switch>
      </div>
    </Router>
  );
}

export default App;
