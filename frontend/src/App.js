import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import MainPage from "./components/MainPage";
import MyFavorites from "./components/MyFavorites";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>

      {isLoaded && (
        <Switch>
          <Route path='/' exact={true}>
            <Navigation isLoaded={isLoaded} />
            <MainPage />
          </Route>
          <Route path='/my-favorites' exact={true}>
            <MyFavorites />
          </Route>
          {/* <Route path='/search/:searchQuery'>
            <Search />
          </Route> */}
          <Route>
            <h1>Page Not Found</h1>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
