/* eslint-disable functional/no-expression-statement */
import ReactDOM from 'react-dom/client';
import init from './init.jsx';
import App from './components/App.jsx';
import { BrowserRouter } from 'react-router-dom';

const app = () => {
  const root = ReactDOM.createRoot(document.querySelector('#chat'));
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

app();
