import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import './styles.css'

function Rodape(){

    return (

    <footer className="footer-section spad">
        <div className="container">
            <div className="newslatter-form">
                <div className="row">
                    <div className="col-lg-12">
                        <form action="#">
                            <input type="text" placeholder="Seu endereço de email" />
                            <button type="submit">Inscreva-se em nossa newsletter</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="footer-widget">
                <div className="row">
                    <div className="col-lg-3 col-sm-6">
                        <div className="single-footer-widget">
                            <h4>Sobre</h4>
                            <ul>
                                <li>Sobre</li>
                                <li>Comunidade</li>
                                <li>Empregos</li>
                                <li>Entregas</li>
                                <li>Contate-nos</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="single-footer-widget">
                            <h4>Consumidor</h4>
                            <ul>
                                <li>Busca</li>
                                <li>Política de Privacidade</li>
                                <li>2020 Lookbook</li>
                                <li>Envio & Entregas</li>
                                <li>Galeria</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="single-footer-widget">
                            <h4>Nossos Serviços</h4>
                            <ul>
                                <li>Entrega Grátis</li>
                                <li>Devoluções Gratuitas</li>
                                <li>Nossa Franquia</li>
                                <li>Termos e Condições</li>
                                <li>Política de Privacidade</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="single-footer-widget">
                            <h4>Informações</h4>
                            <ul>
                                <li>Métodos de Pagamento</li>
                                <li>Tempo e Custo de Envio</li>
                                <li>Devolução de Produtos</li>
                                <li>Métodos de Envio</li>
                                <li>Conformidade dos Produtos</li>
                                <Link to={{pathname: `/carrinho`}}><li>Carrinho</li></Link>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="social-links-warp">
			<div className="container">
				<div className="social-links">
					<a href="" className="instagram"><i className="fa fa-instagram"></i><span>instagram</span></a>
					<a href="" className="pinterest"><i className="fa fa-pinterest"></i><span>pinterest</span></a>
					<a href="" className="facebook"><i className="fa fa-facebook"></i><span>facebook</span></a>
					<a href="" className="twitter"><i className="fa fa-twitter"></i><span>twitter</span></a>
					<a href="" className="youtube"><i className="fa fa-youtube"></i><span>youtube</span></a>
					<a href="" className="tumblr"><i className="fa fa-tumblr-square"></i><span>tumblr</span></a>
				</div>
			</div>

            <div className="container text-center pt-5">
                <p>
                    Copyright &copy;<script>document.write(new Date().getFullYear());</script> Todos os DIreitos Reservados | Sistema produzido e distribuido por <i className="icon-heart color-danger" aria-hidden="true"></i> <a href="http://tradesystem.com.br/" target="_blank">Trade System</a>
                </p>
            </div>


		</div>
    </footer>
    )
}

export default Rodape