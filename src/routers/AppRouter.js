import React from 'react';
import {BrowserRouter,Route,Switch, Link,NavLink} from 'react-router-dom';
import Header from '../components/Header';
import Flexbox from '../components/Flexbox';
import Footer from '../components/Footer'

const AppRouter = ()=>(
        <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path= "/" component = {Flexbox} exact={true} />
            </Switch>
            <Footer />
        </div>
    </BrowserRouter>
    )
    


export default AppRouter;

