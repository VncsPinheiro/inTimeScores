import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
	host: 'sandbox.smtp.mailtrap.io',
	port: 2525,
	auth: {
		user: '39b0aab97d41ab',
		pass: 'd4fc161b29a463',
	},
})

export class Nodemailer {
	async sendEmail(destination: string) {
		// 2. Definir as opções do e-mail
		const mailOptions = {
			from: '"Meu App 🚀" <noreply@meuapp.com>', // Nome e e-mail de quem envia
			to: destination, // E-mail do usuário
			subject: 'Confirme seu e-mail', // Assunto
			text: `Olá! Confirme seu e-mail clicando aqui: `, // Versão apenas texto
			html: `
      <div style="font-family: sans-serif; color: #333;">
        <h2>Bem-vindo ao Meu App!</h2>
        <p>Clique no botão abaixo para verificar sua conta:</p>
        <a href="$#" 
           style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
           Verificar minha conta
        </a>
        <p style="font-size: 12px; color: #777; margin-top: 20px;">
          Se você não criou esta conta, ignore este e-mail.
        </p>
      </div>
    `,
		}

		try {
			const info = await transporter.sendMail(mailOptions)
			console.log('Mensagem enviada com sucesso: %s', info.messageId)
			return info
		} catch (err: any) {
			console.error('Erro ao enviar e-mail:', err.message)
			throw err
		}
	}
}
