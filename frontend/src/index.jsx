import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App.jsx';
import store from './app/store.js';
import './init.jsx'; // импортируем наш i18next
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
//bcdcfec33720485984824a4f3a03afd9
const rollbarConfig = {
  accessToken:
    'bcdcfec33720485984824a4f3a03afd9',
  environment: 'production',
};

const app = () => {
  const root = ReactDOM.createRoot(document.querySelector('#chat'));
  root.render(
    <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </RollbarProvider>
  );
};

app();
