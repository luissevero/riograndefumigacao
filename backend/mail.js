/*var nodemailer = require('nodemailer')

var remetente = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	service: 'smtp.tradesystem.com.br',
	port: 465,
	secure: true,
	auth:{
		user: 'no-reply@tradesystem.com.br',
		pass: 'Trade@6760@no-reply' 
	}
})

var emailASerEnviado = {
from: 'no-reply@tradesystem.com.br',
to: 'dev@tradeystem.com.br',
subject: 'Enviando Email com Node.js',
text: 'Estou te enviando este email com node.js',
}

remetente.sendMail(emailASerEnviado, function(error){
	if (error) {
		console.log(error);
	} else {
		console.log('Email enviado com sucesso.')
	}
})
*/
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.tradesystem.com.br",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
  	user: "no-reply@tradesystem.com.br",
  	pass: "Trade@6760@no-reply"
  },
  tls: { rejectUnauthorized: false }
});

var emailRemetente = 'no-reply@tradesystem.com.br';
var emailDestinatario = 'dev@tradesystem.com.br';
var usuario = 'Teste trade';
var senha = 'p3t3r3t3';
const mailOptions = {
	from: emailRemetente,
	to: emailDestinatario,
	subject: 'Espaço acervo - Cadastro realizado!',
	html: '<h1>Cadastro Realizado Com sucesso!</h1><p><b>Dados Para Acesso: </b></p><p><b>Usuário: </b>'+usuario+'</p><p><b>Senha: </b>'+senha+'</p>'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email enviado: ' + info.response);
  }
});

