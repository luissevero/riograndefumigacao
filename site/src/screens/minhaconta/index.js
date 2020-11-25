import React, {Component} from 'react'
import './styles.css'
import api from '../../services/api'
import Header from '../../components/header'
import Rodape from '../../components/rodape'
import axios from 'axios'
import {server, showError} from '../../common'
import util from '../../classes/util'
import CEP from 'cep-promise'
import {Formik, Field, Form} from 'formik' 
import {connect} from 'react-redux'
import moment from 'moment'

const initialValues = {
    nome: '',
    login: '',
    senha: '',
    confirmaSenha: '',
    cnpjcpf: '',
    endereco: '',
    cep: '',
    bairro: '',
    complemento: '',
    numero: '',
    cidade: '',
    uf: '',
    fone: '',
    codigo: null
}
class MinhaConta extends Component {
    

    state = {
        ...initialValues,
        produtos: [],
        teste: 1234,
        empresa: [],
        enderecoSite: '',
        numeroSite: 0,
        cidadeSite: '',
        ufSite: '',
        foneSite: ''   
    }

    async componentDidMount(){
        window.scrollTo(0, 0)
        await this.carregaControle()
        await this.carregaCadastro()
        await this.setState({enderecoSite: this.state.empresa[0].Endereco})
        await this.setState({numeroSite: this.state.empresa[0].Numero})
        await this.setState({cidadeSite: this.state.empresa[0].Cidade})
        await this.setState({ufSite: this.state.empresa[0].UF})
        await this.setState({foneSite: this.state.empresa[0].Fone})
    }

    carregaControle = async () => {
        try{
            const res = await axios.get(`${server}/empresas`)
            await this.setState({empresa: res.data})
        }catch(e){
            showError(e)
        }
        
    }

    carregaCadastro = async () => {
        try{
            const res = await axios.get(`${server}/pessoas/1/${this.props.chave}`)
            await this.setState({nome: res.data.Nome, cnpjcpf: res.data.Cnpj_Cpf, login: res.data.login, cep: res.data.Cep, endereco: res.data.Endereco, numero: res.data.Numero, complemento: res.data.Complemento, cidade: res.data.Cidade_Descricao, bairro: res.data.bairro, uf: res.data.UF, fone: res.data.Fone})
        }catch(e){
            showError(e)
        }
    }

    teste = () => {
        const teste = 'Teste categoria'
        return teste
    }

    /*
    signup = async () => { 
        try{
           const res = await axios.get(`${server}/pessoas/${this.state.login}`)
           let cpf = res.data[0].contador
           if(cpf == 0){
            //await this.setState({codigo: proximo})
            await axios.post(`${server}/signup`, {
                Nome: this.state.nome,
                login: this.state.login,
                Cnpj_Cpf: this.state.cnpjcpf,
                senha: this.state.senha,
                confirmPassword: this.state.confirmaSenha,    
                endereco: this.state.endereco,
                numero: this.state.numero,
                complemento: this.state.complemento,
                cidade: this.state.cidade,
                uf: this.state.uf,
                bairro: this.state.bairro,
                cep: this.state.cep,
                inclusao: moment().format()
            })
            const resPes = await axios.get(`${server}/maxpessoa`)
            let proximo = resPes.data.chave
            await axios.put(`${server}/signup`, {
                codigo: proximo,
                chave: proximo
            })
            await axios.post(`${server}/email`, {
                email: this.state.login,
                usuario: this.state.login,
                senha: this.state.senha
            })
            alert('Usuário cadastrado!')
            this.setState({...initialValues})
           }else{
            alert("Falha no cadastro, já existe um cadastro com este usuário!")
           }
        }catch(e){
            showError(e)
        }
        
    }
    */
    buscarDados = async (cep) => {
        try{  
            var obj = await CEP(cep)
            var bairro = obj.neighborhood
            var endereco = obj.street
            var cidade = obj.city
            var uf = obj.state
            await this.setState({bairro, endereco, cidade, uf})
          }catch(e){
            return alert("CEP não encontrado")
          }
        
    }

    
    enviarDados = async () => {
        alert("Entrou aqui")
    }
    
    render(){

        const validations = []
        validations.push(this.state.login && this.state.login.includes('@'))
        validations.push(this.state.senha && this.state.senha.length >= 6)
        validations.push(this.state.nome && this.state.nome.trim().length >= 3)
        validations.push(this.state.senha === this.state.confirmaSenha)
        validations.push(this.state.cnpjcpf && toString(this.state.cnpjcpf).trim().length >= 11)
        validations.push(this.state.cep && this.state.cep.trim().length == 8)
        validations.push(this.state.cidade && this.state.cidade.trim().length >= 3)
        validations.push(this.state.endereco && this.state.endereco.trim().length >= 4)
        validations.push(this.state.uf && this.state.uf.trim().length === 2)
        validations.push(this.state.bairro && this.state.bairro.trim().length >= 2)
        validations.push(this.state.numero && toString(this.state.numero).trim().length >= 1)

        //o formulário só será válido se todas as validações forem verdadeiras, com este reduce implementado
        const validForm = validations.reduce((t, a) => t && a)

        return(
            <div>
                <Header />
                <section className="page-add">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="page-breadcrumb">
                                    <h2>Minha Conta<span>.</span></h2>
                                    <a href="#">Início</a>
                                    <a href="#">Minha Conta</a>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <img src="img/add.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </section>
                <div className="contact-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <Formik 
                                initialValues={{
                                    nome: '',
                                    login: '',
                                    senha: '',
                                    confirmaSenha: '',
                                    cnpjcpf: '',
                                    endereco: '',
                                    cep: '',
                                    bairro: '',
                                    complemento: '',
                                    numero: '',
                                    cidade: '',
                                    uf: ''

                                }}
                                onSubmit={async values => {
                                    await new Promise(r => setTimeout(r, 500))
                                    this.signup()
                                }}
                                >
                                    <Form className="contact-form">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <Field disabled value={this.state.nome} onChange={e => { this.setState({nome: e.currentTarget.value})}} id="nome" name="nome" type="text" placeholder="Nome" />
                                        </div>
                                        <div className="col-lg-6">
                                            <Field disabled value={this.state.cnpjcpf} onChange={e => { this.setState({cnpjcpf: e.currentTarget.value})}} id="cnpjcpf" name="cnpjcpf" type="text" placeholder="CPF/CNPJ" />
                                        </div>
                                        <div className="col-lg-6">
                                            <Field disabled value={this.state.senha} onChange={e => { this.setState({senha: e.currentTarget.value})}} id="senha" name="senha" type="password" placeholder="Senha" />
                                        </div>
                                        <div className="col-lg-6">
                                            <Field disabled value={this.state.confirmaSenha} onChange={e => { this.setState({confirmaSenha: e.currentTarget.value})}} id="confirmasenha" name="confirmasenha" type="password" placeholder="Confirma senha" />
                                        </div>
                                        <div className="col-lg-12">
                                            <Field disabled value={this.state.login} name="login" id="login" type="email" placeholder="E-mail" onChange={e => { this.setState({login: e.currentTarget.value})}}/>
                                            <Field disabled value={this.state.cep} onChange={e => {this.setState({cep: e.currentTarget.value})}} name="cep" id="cep" type="text" placeholder="CEP" onBlur={e => {
                                                this.buscarDados(e.currentTarget.value)
                                                }
                                            }/>
                                            <Field disabled value={this.state.endereco} onChange={e => { this.setState({endereco: e.currentTarget.value})}} name="endereco" id="endereco" type="text" placeholder="Logradouro" />
                                            <Field disabled value={this.state.numero} name="numero" id="numero" type="number" placeholder="Nº" onChange={e => { this.setState({numero: e.currentTarget.value})}}/>
                                            <Field disabled value={this.state.complemento} name="complemento" id="complemento" type="text" placeholder="Complemento" onChange={e => { this.setState({numero: e.currentTarget.value})}}/>
                                            <Field value={this.state.bairro} name="bairro" id="bairro" type="text" placeholder="Bairro" onChange={e => { this.setState({bairro: e.currentTarget.value})}}/>
                                            <Field disabled value={this.state.cidade} name="cidade" id="cidade" type="text" placeholder="Cidade" onChange={e => { this.setState({cidade: e.currentTarget.value})}}/>
                                            <Field disabled value={this.state.uf} name="uf" id="uf" type="text" placeholder="UF" onChange={e => { this.setState({uf: e.currentTarget.value})}}/>
                                            <Field disabled value={this.state.fone} name="fone" id="fone" type="text" placeholder="Telefone" onChange={e => { this.setState({fone: e.currentTarget.value})}}/>
                                            
                                        </div>
                                        <div className="col-lg-12 text-right">
                                        </div>
                                    </div>
                                    </Form>
                                </Formik>
                            </div>
                            <div className="col-lg-3 offset-lg-1">
                                <div className="contact-widget">
                                    <div className="cw-item">
                                        <h5>Localização</h5>
                                        <ul>
                                            <li>{this.props.nome}</li>
                                            <li>{this.state.enderecoSite}, {this.state.numeroSite}</li>
                                            <li>{this.state.cidadeSite}, {this.state.ufSite}</li>
                                        </ul>
                                    </div>
                                    <div className="cw-item">
                                        <h5>Telefone</h5>
                                        <ul>
                                            <li>{this.state.foneSite}</li>
                                            <li>+55 53 98125-7786</li>
                                        </ul>
                                    </div>
                                    <div className="cw-item">
                                        <h5>E-mail</h5>
                                        <ul>
                                            <li>annamodas@bol.com.br</li>
                                            <li>www.anamodas.com.br</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Rodape />
            </div>
            )
        }
}

const mapStateToProps = ({user}) => {
    return{
        nome: user.name,
        chave: user.chave
    }
}
export default connect(mapStateToProps, null)(MinhaConta)

//<textarea placeholder="Menssagem"></textarea>
