import React, { useState, useEffect } from 'react';
import { Switch, Route, Link, useHistory, Redirect } from 'react-router-dom';
// import { Box, Text, Image, Center, Heading, Badge } from '@chakra-ui/react';
// import Navbar from './Navbar';
// import NavbarL from './NavbarL';
// import NavbarC from './NavbarC';
// import SignUp from './SignUp';
import Login from './Login';
// import Markets from './Markets';
import Navigation from './Navigation';
import Farm from './Farm';
import Farms from './Farms';
import FarmerDashboard from './FarmerDashboard';
import UserContext from './UserContext';

const App = (props) => {
  const [authenticated, changeAuthenticated] = useState(false);
  const [accountType, changeAccountType] = useState('customer');
  const history = useHistory();
  const [context, setContext] = useState(null);

  // useEffect(() => {
  //   validateUser();
  // }, []);

  function validateUser() {
    console.log('User is validated.');
    changeAuthenticated(true);
  }

  function invalidateUser() {
    console.log('User is invalidated.');
    changeAuthenticated(false);
  }

  // let redirect = <Redirect to="/login"></Redirect>;
  return (
    <UserContext.Provider value={[context, setContext]}>
      <div>
        {/* {redirect} */}
        <Navigation
          authenticated={authenticated}
          invalidateUser={invalidateUser}
        />

        <Switch>
          <Route path="/login">
            <Login validateUser={validateUser} />
          </Route>
          <Route path="/farm/:id">
            <Farm />
          </Route>
          <Route path="/dashboard">
            <FarmerDashboard />
          </Route>
          <Route exact path="/">
            <Farms />
          </Route>
        </Switch>
      </div>
    </UserContext.Provider>
  );
};

export default App;
