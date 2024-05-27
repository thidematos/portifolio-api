const nodeMailer = require('nodemailer');
const pug = require('pug');
const { htmlToText } = require('html-to-text');

class SendMail {
  constructor(data, subject, content) {
    this.data = data;
    this.name = data.name?.split(' ')[0];
    this.to = data.email;
    this.subject = subject;
    this.content = content;
    this.from = process.env.EMAIL_FROM;
  }

  injectDataToTemplate(data, template) {
    data.phone = process.env.PHONE;
    data.subject = this.subject;
    data.content = this.content;
    data.myHost = 'http://127.0.0.1:3001';

    return pug.renderFile(`${__dirname}/../views/${template}.pug`, {
      basedir: `${__dirname}/../views/`,
      firstName: this.name,
      data: data,
    });
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return nodeMailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.EMAIL_GRID_USER,
          pass: process.env.EMAIL_GRID_PASSWORD,
        },
      });
    }

    return nodeMailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    const html = this.injectDataToTemplate(this.data, template);

    const mailOptions = {
      from:
        process.env.NODE_ENV === 'production'
          ? process.env.EMAIL_GRID_FROM
          : this.from,
      to: this.to,
      subject: subject,
      html: html,
      text: htmlToText(html),
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendPasswordReset() {
    await this.send('passwordReset', this.subject);
  }

  async sendProjectRequestConfirmation() {
    await this.send('projectRequest', 'Projeto enviado com sucesso!');
  }

  async sendAnswer(subject) {
    await this.send('contactEmail', subject);
  }
}

module.exports = SendMail;
