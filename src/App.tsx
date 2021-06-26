import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import './App.css';
import {MainPage} from "./components/main_page/main_page";
import {SplashHOC} from './components/splash_hoc/splash_hoc';
import {Provider as ReduxProvider} from "react-redux";
import store from "./store/store";
import Repository from "./components/repository/repository";
import { positions, Provider} from "react-alert";
import AOS from 'aos';
import 'aos/dist/aos.css';
// @ts-ignore
import AlertTemplate from "react-alert-template-basic";

const options = {
    timeout: 5000,
    position: positions.TOP_RIGHT
  };

export const settings = {
    'data-aos': "fade-up",
    'data-aos-delay': "0",
    'data-aos-duration': "1000",
    'data-aos-offset': '60'
};

AOS.init();

function App() {
    return (
        <BrowserRouter>
        <Provider template={AlertTemplate} {...options}>
            <ReduxProvider store={store}>
                <Switch>
                    <Route path={'/repo/:id'} render={SplashHOC(Repository)}/>
                    <Route path={'/'} render={SplashHOC(MainPage)}/>
                </Switch>
            </ReduxProvider>
            </Provider>
        </BrowserRouter>
    );
}

export default App;
