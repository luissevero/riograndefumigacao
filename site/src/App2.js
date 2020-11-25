import React, {useState} from 'react'
import ListaProdutos from './components/listaProdutos'
import Rodape from './components/rodape'
import Modal from '@material-ui/core/Modal'

import Routes from './routes'
import {server, showError} from './common'

import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './css/magnific-popup.css'
import './css/nice-select.css'

function App2(){
   
    return (
        <div>
            <Routes />
        </div>
       
    )
}

export default App2
