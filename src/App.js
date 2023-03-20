import React from 'react';
import Header from './Header';
import Footer from './Footer';

import { withAuth0 } from '@auth0/auth0-react';
import Welcome from './Welcome';
import Profile from './Profile';

import BestBooks from './BestBooks';
import About from './About';

import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn : false,
    }
  }

  render() {
    console.log(this.props.auth0.isAuthenticated);

    return (
      <>
      <Router>
      {this.props.auth0.isAuthenticated 
       ?
       <Profile /> 
       : <Welcome />}
            {/* allowed b/c the export method was with functions */ },
        <Header />
        <Routes>

          {this.props.auth0.isAuthenticated
          ?
            <Route
              exact path="/"
              element={<BestBooks />}
            ></Route>
            :
            <Route
            exact path="/"
            element={<Welcome />}>
          </Route>
          }
            <Route
              exact path="/about"
              element={<About />}
            ></Route>
          </Routes>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;
