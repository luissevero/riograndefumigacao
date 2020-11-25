module.exports = app => {
	const nodemailer = require('nodemailer');
	const enviarEmail = (req, res) => {
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
	var emailDestinatario = req.body.email;
	var usuario = req.body.usuario;
	var senha = req.body.senha;
	const mailOptions = {
		from: emailRemetente,
		to: emailDestinatario,
		subject: 'Ana modas - Cadastro realizado!',
		html: '<h1>Cadastro Realizado Com sucesso!</h1><p><b>Dados Para Acesso: </b></p><p><b>Usuário: </b>'+usuario+'</p><p><b>Senha: </b>'+senha+'</p>'
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
		return res.status(400).send('Falha ao enviar o email');
	  } else {
		return res.status(200).send();
	  }
	});
		
	}
	return {enviarEmail}
}

