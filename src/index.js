import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from "./redux/store";
import {ApolloProvider} from 'react-apollo';
import {client} from './graphql/config';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';


ReactDOM.render(
    <Provider store={store}>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <PersistGate persistor={persistor}>
                    <App/>
                </PersistGate>   
            </BrowserRouter>
        </ApolloProvider>
    </Provider>
, document.getElementById('root'));

if (module.hot) module.hot.accept();