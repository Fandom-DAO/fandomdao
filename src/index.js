import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MoralisProvider } from "react-moralis";
import { BrowserRouter, Link} from "react-router-dom";


const appID = 'FCtRd8v8gjhny7QjvtmxgKT24SSeibefrBfj4pYN';
const serverURL = 'https://hcwuvgegnw6z.usemoralis.com:2053/server';

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId={appID} serverUrl={serverURL}>
      <BrowserRouter>
        <App/>      
      </BrowserRouter>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
