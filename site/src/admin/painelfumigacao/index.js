import React, {Component} from 'react'
import './styles.css'

import {apiClient, apiEmployee} from '../../services/apirgfumiga'
import {api, apiLocal} from '../../services/api'
import Header from '../../components/header'
import Skeleton from '../../components/skeleton'
import {Link, useHistory, Redirect} from 'react-router-dom'
import Util from '../../classes/util'
import moment from 'moment'
import {connect} from 'react-redux'
import {PRECISA_LOGAR} from '../../config'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowAltCircleLeft, faArrowAltCircleRight, faPlayCircle, faPauseCircle} from '@fortawesome/free-regular-svg-icons'

import {primary} from '../../commonStyles'

const estadoInicial = {
    name: '',
    seaports: [],
    ships: [],
    naviosPortoAtual: [],
    loading: true,
    time: Date.now(),
    posicaoAtual: 0,
    isLogado: true,
    tempo: 10,
    isPlaying: true,
    //token: 'jioeggji4'
    //tokenClient: 'gSXh4YLQxDDGM6lja2vJB6FW4x8kPTRxRTSMtjCpMOISmzaqoM',
    //tokenEmployee: 'fR1fqCn8YNYQ0qtip7BIm50Pr6Dqit3hteepceBB1lsoM43YMd'    
}

class PainelFumigacao extends Component {
    
    state = {
        ...estadoInicial
    }

    filtro = (navios) =>  parseInt(navios.id_seaport) === parseInt(this.state.seaports[this.state.posicaoAtual].id) 

    incrementar = async () => {
        if(this.state.isPlaying){
            if(this.state.tempo > 0){
                await this.setState({tempo: this.state.tempo - 1})
                //console.log(this.state.tempo)
            }else{
                await this.timer()
                await this.setState({tempo: 10})
            }
        }
    }

    avancaPorto = async () => {
        this.state.posicaoAtual >= (this.state.seaports.length - 1) ? await this.setState({posicaoAtual: 0, tempo: 10}) : await this.setState({posicaoAtual: this.state.posicaoAtual + 1, tempo: 10})
    }

    retrocedePorto = async () => {
        this.state.posicaoAtual <= 0 ? await this.setState({posicaoAtual: this.state.seaports.length - 1, tempo: 10}) : await this.setState({posicaoAtual: this.state.posicaoAtual - 1, tempo: 10})
    }

    pausarOuContinuar = async () => {
        await this.setState({isPlaying: !this.state.isPlaying})
    }

    timer = async () => {
        if(this.state.posicaoAtual >= (this.state.seaports.length - 1)) { 
          this.setState({posicaoAtual: 0})
          window.location.reload()
        }else{
            await this.setState({posicaoAtual: this.state.posicaoAtual + 1})
            await this.setState({naviosPortoAtual: this.state.ships.filter(this.filtro)})
        }
      }

      componentDidMount = async () => {
          await this.getSeaports()
          await this.getShipsRgf()
          await this.setState({naviosPortoAtual: this.state.ships.filter(this.filtro)})
          await this.setState({loading: false})
          this.intervalId = setInterval(() => this.incrementar(), 1000)
          //clearInterval(this.intervalId)
      }
      
      componentWillUnmount() {
        clearInterval(this.intervalId);
      }
 
    /*  
    getSeaports = async () => {
        if(this.props.online){
            await api.get(`seaportspainel`, {
                headers: {
                    "Authorization": `bearer ${this.props.token}`
                }
            }).then(
                async response => { 
                    await this.setState({seaports: response.data})
                    //alert(JSON.stringify(this.state.seaports))
                },
                async response => {this.erroApi(response)}
            )
        }else{
            await apiLocal.get(`seaportspainel`, {
                headers: {
                    "Authorization": `bearer ${this.props.token}`
                }
            }).then(
                async response => { 
                    await this.setState({seaports: response.data})
                    //alert(JSON.stringify(this.state.seaports))
                },
                response => {this.erroApi(response)}
            )
        }
    }
    */

    getSeaports = async () => {
        await apiEmployee.post(`getSeaports.php`, {
            token: this.props.token
        }).then(async response => {
            await this.setState({seaports: response.data})
        },
        response => {this.erroApi(response)}
        )
        await this.setState({loading: false}) 
    }

    getShipsRgf = async () => {
        await apiEmployee.post(`getShips.php`, {
            token: this.props.token
        }).then(async response => {
            await this.setState({ships: response.data})
        },
        response => {this.erroApi(response)}
        )
        await this.setState({loading: false}) 
    }
    
    /*
    getShips = async () => {
        if(this.props.online){
            await api.get(`shipspainel`, {
                headers: {
                    "Authorization": `bearer ${this.props.token}`
                }
            })
            .then(
                async response => {await this.setState({ships: response.data})},
                async response => { await this.erroApi(response)}
            )
        }else{
            await apiLocal.get(`shipspainel`, {
                headers: {
                    "Authorization": `bearer ${this.props.token}`
                }
            })
            .then(
                async response => {await this.setState({ships: response.data})},
                async response => { await this.erroApi(response)}
            )
        }
        await this.setState({loading: false}) 
    }
    */

    erroApi = async (res) => {
        await this.setState({isLogado: false})
        alert(PRECISA_LOGAR)
    }

    renderSeaports(){
        return(
            <div className="shopping-method">
                
                {!this.state.loading &&
                <div>
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center">
                            <h1>Porto: {this.state.seaports[this.state.posicaoAtual].name}</h1>
                        </div>
                        <div className="col-1"></div>
                        <div className="col-2 text-left">
                        <FontAwesomeIcon size="2x" color={primary} icon={faArrowAltCircleLeft} onClick={() => this.retrocedePorto()}/>
                        </div>
                        <div className="col-5"></div>
                        <div className="col-2 text-right">
                            <FontAwesomeIcon 
                                size="2x" 
                                color={primary} 
                                icon={this.state.isPlaying ? faPauseCircle : faPlayCircle} 
                                onClick={() => this.pausarOuContinuar()}/>
                        </div>
                        <div className="col-1 text-right">
                            <FontAwesomeIcon size="2x" color={primary} icon={faArrowAltCircleRight} onClick={() => this.avancaPorto()}/>
                        </div>
                        <div className="col-1"></div>
                        <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1"></div>
                        <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10">
                            <div className="total-info">
                                <div className="total-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className="total-cart text-left">Navio</th>
                                                <th className="total-cart text-left">Terminal</th>
                                                <th>ETB</th>       
                                                <th className="total-cart text-left">ETS</th>      
                                                <th className="total-cart text-left">Agência</th>
                                                <th className="total-cart text-left">Carga</th>
                                                <th className="total-cart text-left">Total</th>
                                                <th className="total-cart text-left">Destino</th>
                                                <th className="total-cart text-left">Rec.</th>
                                                <th className="total-cart text-left">DSG</th>
                                                <th className="total-cart text-left">Método</th>
                                                <th className="total-cart text-left">Cliente</th>
                                                <th className="total-cart text-left">L</th>
                                                <th className="total-cart text-left">M</th>
                                                <th className="total-cart text-left">D</th>     
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.ships.filter(this.filtro).map(navio => (
                                            <tr key={navio.id}>
                                                <td className="sub-total text-left">{navio.name}</td>
                                                <td className="sub-total text-left">{navio.terminal}</td>
                                                <td className="sub-total text-left">{Util.completarZerosEsquerda(moment(navio.ETB).format('D'), 2)+'-'+Util.completarZerosEsquerda(moment(navio.ETB).format('M'), 2)}</td>
                                                <td className="sub-total text-left">{Util.completarZerosEsquerda(moment(navio.ETS).format('D'), 2)+'-'+Util.completarZerosEsquerda(moment(navio.ETS).format('M'), 2)}</td>
                                                <td className="sub-total text-left">{navio.agent}</td>
                                                <td className="sub-total text-left">{navio.cargo}</td>
                                                <td className="sub-total text-left">{navio.full_shipment}</td>
                                                <td className="sub-total text-left">{navio.seaport_dest}</td>
                                                <td className="sub-total text-left">{navio.recirculation == 1 ? 'V' : 'X' }</td>
                                                <td className="sub-total text-left">{navio.dosage}</td>
                                                <td className="sub-total text-left">{navio.type}</td>
                                                <td className="sub-total text-left">{navio.clientname}</td>
                                                <td className="sub-total text-left">{navio.liberation == 1 ? 'V' : 'X'}</td> 
                                                <td className="sub-total text-left">{navio.map == null ? 'X' : navio.map}</td> 
                                                <td className="sub-total text-left">{navio.documents}</td>      
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1"></div>                    
                    </div>
                </div>
                }
            </div>
        )
    }

    render(){
        
        return (


            <div>
                {this.state.loading &&
                    <Skeleton />
                }

                {!this.state.isLogado &&
                    <Redirect to={'/admin'} />
                }

                {!this.state.loading &&
                    <div>
                    <section className="page-add">
                        <Header voltar/>
                        {this.renderSeaports()}
                    </section>

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

export default connect(mapStateToProps, null)(PainelFumigacao)
