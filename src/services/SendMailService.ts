import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const options:SMTPTransport.Options = {
    host: "smtp.sendgrid.net",
    port: 25,
    secure: false,
    auth: {
        user: "apikey",
        pass: process.env.PASS_SENDGRID
    }
}   


class SendMailService {
    private client: Transporter
    constructor() {
        const transporter = nodemailer.createTransport(options);
        this.client = transporter;
    }

    async execute(to: string, subject: string, variables: object, path: string) {

        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        const templateFileContent = fs.readFileSync(path).toString("utf-8");
        const mailTemplateParse = handlebars.compile(templateFileContent);

        const html = mailTemplateParse(variables)

        const message = await this.client.sendMail({
            to,
            subject,
            html,
            from: "luanstaner.apps@gmail.com"
        })
        console.log("Message sent: %s", message.messageId);


    }
}

export default new SendMailService();