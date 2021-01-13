import React, {Component} from 'react'
import {apiClient} from '../../services/apirgfumiga'
import {connect} from 'react-redux'
import {primary} from '../../commonStyles'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPhotoVideo, faUserCircle, faWindowClose} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

import HeaderClient from '../../components/headerclient'
import Picture from '../../components/picture'
import ModalFumigator from '../../components/modalfumigator'
import ProgressBar from 'react-bootstrap/ProgressBar'
import './styles.css'

let fotos = []

class ShipStatus extends Component {

    state = {
        token: null,
        id: null,
        id_employee: 4,
        feeds: [],
        ship: [],
        screen: 2,
        modal: false,
        employee: [],
        photosModal: []
    }

    componentDidMount = async () => {
        await this.setState({token: this.props.token})
        var id = await this.props.match.params.id
        this.setState({ship: this.props.location.query})
        await this.setState({id})
        await this.carregaStatus(id)
        await this.carregaEmployee(this.state.id_employee)
    }

    carregaStatus = async (id) => {
        await apiClient.post('shipstatus.php', {
            token: this.state.token,
            id_ship: id
        }).then(
            async res => {
                if(res.data == 'false'){
                    alert('Não logado!')
                }else{
                    await this.setState({feeds: res.data})
                    this.state.feeds.map(async feed => {
                        feed.pictures && feed.pictures.map(async picture => {                        
                            await fotos.push(picture)
                        })
                    })
                }
            },
            async res => {
                alert(res.data)
            }
        )
    }

    carregaEmployee = async (id) => {
        await apiClient.post('contact.php', {
            token: this.state.token,
            id_employee: id
        }).then(
            async res => {
                if(res.data == 'false'){
                    alert('Não logado!')
                }else{
                    await this.setState({employee: res.data})
                }
            },
            async res => {
                alert(res.data)
            }
        )
    }

    openModal = async () => {
        await this.setState({modal: true})
    }

    abreFoto = async (pictures) => {
        await this.setState({photosModal: []})
        await this.setState({photosModal: pictures})
        await this.setState({screen: 4})
    }

    renderFeed(){
        return (
            <div>
                <div className="col-12 text-right">
                    <FontAwesomeIcon style={{cursor: 'pointer'}} onClick={() => this.openModal()} className="bordaCircular" icon={faUserCircle} size="3x" color='white' /> 
                </div>
                {this.state.modal &&
                    <ModalFumigator fumigator={this.state.employee} fecharModal={() => this.setState({modal: false})}/>
                }
                <h2 id="title">Feed {this.state.ship ? `${this.state.ship.name}` : ''}</h2>
                {this.state.feeds.map(feed => (
                    <div key={feed.id} className="row feed">
                        <div className="col-1"></div>
                        <div className="col-10">
                            <div className="row">
                                <div className="col-2 text-center">
                                    <p>{feed.month}/{feed.day}</p>
                                </div>
                                <div className="col-8 text-center">
                                    <p className="textNavio">{feed.text}</p>
                                </div>
                                <div className="col-2 text-center">
                                    {feed.pictures &&
                                        <FontAwesomeIcon
                                            style={{cursor: 'pointer'}} 
                                            onClick={() => { this.abreFoto(feed.pictures)}}
                                            icon={faPhotoVideo} size="2x" color={primary}
                                         />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-1"></div>
                    </div> 
                ))}
            </div>
        )
    }

    renderAbout(){
        return (
            <div>
                <h2 id="title">About {this.state.ship ? `${this.state.ship.name}` : ''}</h2>
                
                <section className="updated">
                    <h4>Updated: {moment(`${this.state.ship.year}-${this.state.ship.month}-${this.state.ship.day}`).format("MMM")}/{this.state.ship.day} {this.state.ship.time}</h4>
                </section>

                <section className="loadingProcess">
                    <h4>Loading Process</h4>
                    <ProgressBar 
                        className="barraProgresso" 
                        now={this.state.ship.shipment / this.state.ship.full_shipment * 100} 
                        label={`${this.state.ship.shipment / this.state.ship.full_shipment * 100}%`}
                        variant={this.state.ship.shipment / this.state.ship.full_shipment * 100 < 100 ? "warning" : "primary"} 
                        animated={this.state.ship.shipment / this.state.ship.full_shipment * 100 < 100 ? true : false} 
                    />
                    <p className="sectionItem"><b className="negrito">Cargo: </b> {this.state.ship.cargo}</p>
                    <p className="sectionItem"><b className="negrito">Quantity: </b> {this.state.ship.shipment} / {this.state.ship.full_shipment} Ton.</p> 
                </section>

                <section className="information">
                    <h4>Information</h4>
                    <p className="sectionItem"><b className="negrito">Origin: </b> {this.state.ship.seaport_orig}</p>
                    <p className="sectionItem"><b className="negrito">Destination: </b> {this.state.ship.seaport_dest}</p>
                    <p className="sectionItem"><b className="negrito">Terminal: </b> {this.state.ship.terminal}</p>
                    <p className="sectionItem"><b className="negrito">Agent: </b> {this.state.ship.agent}</p>
                    <p className="sectionItem"><b className="negrito">E.T.A.: </b> {this.state.ship.ETA}</p>
                    <p className="sectionItem"><b className="negrito">E.T.B.: </b> {this.state.ship.ETB}</p>
                    <p className="sectionItem"><b className="negrito">E.T.S.: </b> {this.state.ship.ETS}</p>
                    <p className="sectionItem"><b className="negrito">Condemned Cargo: </b> {this.state.ship.doomed == 1 ? 'Yes' : 'No'}</p>
                </section>

                <section className="fumigation">
                    <h4>Fumigation</h4>
                    <p className="sectionItem"><b className="negrito">Method: </b> {this.state.ship.type}</p>
                    <p className="sectionItem"><b className="negrito">Dosage: </b> {this.state.ship.dosage} g/m³</p>
                </section>
            </div>
        )
    }

    renderPictures(){
        return (
          
            <Picture fotos={fotos} /> 
            
        )
    }

    renderPicture(){
        return (
            <div className="row">
                <div className="col-12 text-right">
                    <FontAwesomeIcon onClick={async () => await this.setState({screen: 1})} icon={faWindowClose} size="3x" color={primary} />
                </div>
                <div className="col-12 text-center">
                    <Picture fotos={this.state.photosModal} />
                </div>
            </div>  
        )
    }

    render(){
        return (
            <div>
                <HeaderClient voltar/>
                <div className="row">
                    <div className="col-3"><button onClick={async () => await this.setState({screen: 1})} className="btn btn-success w-100">Feed</button></div>
                    <div className="col-3"><button onClick={async () => await this.setState({screen: 2})} className="btn btn-primary w-100">About</button></div>
                    <div className="col-3"><button onClick={async () => await this.setState({screen: 3})} className="btn btn-secondary w-100">Pictures</button></div>
                    <div className="col-3"><button className="btn btn-light w-100">Documents</button></div>
                </div>
                {this.state.screen == 1 &&
                    this.renderFeed()
                }
                {this.state.screen == 2 &&
                    <div className="row">
                         <div className="col-4"></div>
                         <div className="col-4">
                            {this.renderAbout()}
                         </div>
                         <div className="col-4"></div>
                    </div> 
                }
                {this.state.screen == 3 &&
                    this.renderPictures()
                }
                {this.state.screen == 4 &&
                    this.renderPicture()
                }
            </div>
        )
    }
}

const mapStateToProps = ({user}) => {
    return{
        token: user.token
    }
}

export default connect(mapStateToProps, null)(ShipStatus)

/* <div>
                <h2 id="title">Pictures {this.state.ship ? `${this.state.ship.name}` : ''}</h2>
                {fotos.map((foto, index) => (
                    <Picture picture={foto} />
                ))}
            </div>*/
