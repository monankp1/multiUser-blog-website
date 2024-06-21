import logo from './logo.svg';
import './App.css';
import Home from './pages/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from './store/store';


function App() {
  return (
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Router>
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
            </Routes>
          </Router>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
