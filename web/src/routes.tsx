import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { CreateOrphanage, Landing, OrphanagesMap } from "./pages";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={OrphanagesMap} />

                <Route path="/orphanage/create" component={CreateOrphanage} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
