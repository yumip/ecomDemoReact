import React, { useEffect } from "react";
import Header from './components/Header';
import Home from "./pages/Home";
import Product from "./pages/Product";
import Orders from "./pages/Orders";
import Checkout from'./pages/Checkout';
import Payment from './pages/Payment';
import Login from "./pages/Login";
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useStateValue } from "./contexts/StateProvider";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
//publishable key
const promise = loadStripe('pk_test_51IUpMFEJoXpSy6CqOz8zH7bAfB1rG4sOkjmlRMAndGA7khlsONzFjnPgcYq8PMs8JCpWf9vK9AN6euKoRTVpOKCs009e9T04gD');

function App() {
  // eslint-disable-next-line no-unused-vars
  const [, dispatch] = useStateValue();

  useEffect(()=> {

      auth.onAuthStateChanged(authUser => {

      if(authUser) {
        dispatch({
          type:'SET_USER',
          user: authUser
        })
      } else {
        dispatch({
          type: "SET_USER",
          user: null
        });
      }   
    });
  },[]);

  return (
    <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/orders">
            <Header /> 
            <Orders />
          </Route>
          <Route path="/checkout">
            <Header /> 
            <Checkout />
          </Route>
          <Route path="/product/:productId" component={Product} />
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements> 
          </Route>
          <Route path="/">
            <Header /> 
            <Home />
          </Route>
        </Switch>
        <Footer />
    </Router>
  );
}

export default App;