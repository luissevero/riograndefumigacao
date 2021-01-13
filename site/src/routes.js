import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import ListaProdutos from './components/listaProdutos'
import Login from './admin/login'
import Inicio from './admin/inicio'
import PainelFumigacao from './admin/painelfumigacao'
import Feeds from './admin/feeds'
import Seaports from './admin/seaports'
import Ships from './admin/ships'
import Employees from './admin/employees'
import Clients from './admin/clients'
import Storage from './admin/storage'
import FumigationReport from './admin/fumigationreport'
import AddShip from './admin/addship'
import AddFeed from './admin/addfeed'
import AddSeaport from './admin/addseaport'
import AddEmployee from './admin/addemployee'
import AddClient from './admin/addclient'
import AddStorage from './admin/addstorage'
import ProdutoDetalhe from './components/produtoDetalhe'
import Cadastro from './components/cadastro'
import Carrinho from './components/carrinho'
import MinhaConta from './screens/minhaconta'
import Feed from './screens/feed'
import Upload from './components/upload'
import ClientSignin from './client/login'
import ClientInicio from './client/inicio'
import ShipStatus from './client/shipstatus'

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/admin" exact component={Login} />
                <Route path="/admin/inicio" component={Inicio} />
                <Route path="/admin/feeds" component={Feeds} />
                <Route path="/admin/painelfumigacao" component={PainelFumigacao} />
                <Route path="/admin/seaports" component={Seaports} />
                <Route path="/admin/ships" component={Ships} />
                <Route path="/admin/employees" component={Employees} />
                <Route path="/admin/clients" component={Clients} />
                <Route path="/admin/storage" component={Storage} />
                <Route path="/admin/fumigationreport/:id" component={FumigationReport} />
                <Route path="/admin/addship/:id" component={AddShip} />
                <Route path="/admin/addfeed/:id" component={AddFeed} />
                <Route path="/admin/addseaport/:id" component={AddSeaport} />
                <Route path="/admin/addemployee/:id" component={AddEmployee} />
                <Route path="/admin/addclient/:id" component={AddClient} />
                <Route path="/admin/addstorage/:id" component={AddStorage} />
                <Route path="/detalhes/:id" component={ProdutoDetalhe} />
                <Route path="/listaProdutos" component={ListaProdutos} />
                <Route path="/cadastro" component={Cadastro} />
                <Route path="/carrinho" component={Carrinho} />
                <Route path="/minhaconta" component={MinhaConta} />
                <Route path="/file/upload" component={Upload} />
                <Route path="/feed" component={Feed} />
                <Route path="/client/login" component={ClientSignin} />
                <Route path="/client/inicio" component={ClientInicio} />
                <Route path="/client/shipstatus/:id" component={ShipStatus} />                
            </Switch>
        </BrowserRouter>
    )
}