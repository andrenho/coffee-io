import React, { Suspense, Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import NavBar from './general/NavBar';
import BottomMessage from './general/BottomMessage';
import { BrowserRouter } from 'react-router-dom';

import Home from './Home';
import Cart from './cart/Cart';
import NewItem from './cart/NewItem';
import Custom from './cart/Custom';
import Checkout from './cart/Checkout';
import Finalized from './cart/Finalized';
import Admin from './admin/Admin';

import currentArch from './state/arch';
const Architecture = React.lazy(() => import('./architecture/' + currentArch().architecturePage));

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <NavBar />
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/cart' component={Cart}/>
                        <Route exact path='/cart/newitem' component={NewItem}/>
                        <Route exact path='/cart/custom' component={Custom}/>
                        <Route exact path='/cart/checkout' component={Checkout}/>
                        <Route exact path='/cart/finalized' component={Finalized}/>
                        <Route exact path='/admin' component={Admin}/>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Route exact path='/architecture' component={Architecture}/>
                        </Suspense>
                    </Switch>
                    <BottomMessage />
                </div>
            </BrowserRouter>
        );
    }

}

export default App;

// vim:st=4:sts=4:sw=4:expandtab
