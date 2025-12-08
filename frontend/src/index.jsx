import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App.jsx';
import store from './app/store.js';
import './init.jsx'; // импортируем наш i18next
import 'bootstrap/dist/css/bootstrap.min.css';

const app = () => {
  const root = ReactDOM.createRoot(document.querySelector('#chat'));
  root.render(
    <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </Provider>
  );
};

app();

