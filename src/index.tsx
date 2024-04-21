import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/mdc-light-indigo/theme.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import { register } from 'swiper/element/bundle';
import App from './App';
import './index.css';
import { store } from './redux/store';
register();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PrimeReactProvider>
          <App />
        </PrimeReactProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
