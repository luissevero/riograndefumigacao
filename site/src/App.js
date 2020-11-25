import React, {useState} from 'react'
import ListaProdutos from './components/listaProdutos'
import Marcas from './components/marcas'
import Rodape from './components/rodape'
import Modal from '@material-ui/core/Modal'
import HeroSlider from './components/heroslider'
import {MOSTRA_BANNERS, MOSTRA_MARCAS} from './config'
import Header from './components/header'
import {server, showError} from './common'

import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './css/magnific-popup.css'
import './css/nice-select.css'

function App(){
   
    return (
        <div className="App">
            <Header />
            {MOSTRA_BANNERS && <HeroSlider />}
            <ListaProdutos />
            {MOSTRA_MARCAS && <Marcas />}
            <Rodape />
        </div>
    )
    
}

export default App
