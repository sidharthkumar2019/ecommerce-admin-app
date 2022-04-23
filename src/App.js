import './App.css';
import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialData, isUserLoggedIn } from './actions';
import { Products } from './containers/Products';
import { Orders } from './containers/Orders';
import { Category } from './containers/Category';
import {getAllCategories} from './actions/category';
import { NewPage } from './containers/NewPage';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (!auth.authenticate)
      dispatch(isUserLoggedIn());
    dispatch(getInitialData());
  }, []);

  return (
    <div className="App">
      
      <Routes>
        <Route exact path='/' element={ <PrivateRoute>
            <Home />
          </PrivateRoute> }
        />
        <Route path='/category' element={ <PrivateRoute>
            <Category />
          </PrivateRoute> }
        />
        <Route path='/products' element={ <PrivateRoute>
            <Products />
          </PrivateRoute> }
        />
        <Route path='/orders' element={ <PrivateRoute>
            <Orders />
          </PrivateRoute> }
        />
        <Route path='/signin' element={ <Signin /> } />
        <Route path='/signup' element={ <Signup /> } />
        <Route path='/page' element={ <NewPage /> } />
      </Routes>

    </div>
  );
}

export default App;