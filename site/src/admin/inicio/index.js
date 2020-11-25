import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Header from '../../components/header'
import Skeleton from '../../components/skeleton'
import './styles.css'
import {CLIENTES, EMPLOYEES, NAVIOS} from '../../config'
import {api, apiLocal, localUrl, onlineUrl} from '../../services/api'
import {apiEmployee} from '../../services/apirgfumiga'
import {connect} from 'react-redux'

class Inicio extends Component {

    state = {
        isLogado: true,
        loading: true
    }

    componentDidMount(){
        this.verificaLogado()
        if(this.props.online){
            alert(onlineUrl)
        }else{
            alert(localUrl)
        }
    }

    verificaLogado = async () => {
        await apiEmployee.get(`app.php`, {
            token: this.props.token
        }).then(
            async response => {
                if(response.data == 'true'){
                    this.erroApi(response)
                }else{
                    await this.setState({loading: false})
                }
            },
            async response => { this.erroApi(response)}
        )
        await this.setState({loading: false}) 
    }

    erroApi = async (res) => {
        await this.setState({isLogado: false})
        alert('Você precisa estar logado para poder acessar esta página!')
        this.setState({redirect: true})
    }
    
    render(){
        
        return(
            <div>
                {!this.state.isLogado && 
                    <Redirect to={'/admin'} />                
                }
                {this.state.loading &&
                    <Skeleton />
                }
                <Header />
                {!this.state.loading &&
                <div className="product-filter">
                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="section-title">
                                <h3 className="titulo">Rio Grande Fumigação - Administrador</h3>
                            </div>
                            <ul className="product-controls row">
                            <Link className="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-6 text-center" to={{pathname: `/admin/ships`}}><li id="itemMenu">{NAVIOS}</li></Link>
                            <Link className="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-6 text-center" to={{pathname: `/admin/feeds`}}><li id="itemMenu">Feeds</li></Link>
                            <Link className="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-6 text-center" to={{pathname: `/admin/seaports`}}><li id="itemMenu">Seaports</li></Link>
                            <Link className="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-6 text-center" to={{pathname: `/admin/employees`}}><li id="itemMenu">{EMPLOYEES}</li></Link>
                            <Link className="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-6 text-center" to={{pathname: `/admin/clients`}}><li id="itemMenu">{CLIENTES}</li></Link>
                            <Link className="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-6 text-center" to={{pathname: `/admin/painelfumigacao`}}><li id="itemMenu">Painel Fumigação</li></Link>
                            </ul>
                        </div>
                    </div>
                </div>
                }
            </div>
        )
    }
    
}

const mapStateToProps = ({user, servidor}) => {
    return{
        token: user.token,
        online: servidor.online
    }
}

export default connect(mapStateToProps, null)(Inicio)