import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import MainPage from "./components/MainPage";
import MyFavorites from "./components/MyFavorites";
import { loadUserFavorites } from "./store/favorites";
import { getImages } from "./store/images";
import SearchBar from "./components/Navigation/SearchBar";


function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    if (user) dispatch(loadUserFavorites(user?.id))
  }, [dispatch, user]);


  useEffect(() => {
    dispatch(getImages())
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
          <Route path='/myfavorites' exact={true}>
            <Navigation isLoaded={isLoaded} />
            <MyFavorites />
          </Route>
          <Route path='/search/:searchQuery'>
            <SearchBar />
          </Route>
          <Route>
            <h1>Page Not Found</h1>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
