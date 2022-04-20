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
        <Route exact path='/category' element={ <PrivateRoute>
            <Category />
          </PrivateRoute> }
        />
        <Route path='/products' element={ <PrivateRoute>
            <Products />
          </PrivateRoute> }
        />
        <Route exact path='/orders' element={ <PrivateRoute>
            <Orders />
          </PrivateRoute> }
        />
        <Route exact path='/signin' element={ <Signin /> } />
        <Route exact path='/signup' element={ <Signup /> } />
      </Routes>

    </div>
  );
}

export default App;