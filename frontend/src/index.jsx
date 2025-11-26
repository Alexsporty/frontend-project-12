/* eslint-disable functional/no-expression-statement */
import ReactDOM from 'react-dom/client';
import init from './init.jsx';
import { Provider } from 'react-redux'
import App from './components/App.jsx';
import store from './app/store.js';
import { BrowserRouter } from 'react-router-dom';
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
