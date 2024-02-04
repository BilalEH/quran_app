import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import { SuwarSlice } from './store/suwar';
import {ReciterSlice} from './store/reciters';
import {RadioSlice} from './store/radio';
import { ReadsSlice } from './store/API';
import { PhotoSlice } from './store/quranPhoto';



  const store=configureStore({
    reducer:{
      suwar:SuwarSlice.reducer,
      reciters:ReciterSlice.reducer,
      radio:RadioSlice.reducer,
      globalApi:ReadsSlice.reducer,
      photo:PhotoSlice.reducer,
    }
  })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
