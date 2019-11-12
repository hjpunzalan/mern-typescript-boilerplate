import nodemailer from "nodemailer";
import pug from "pug";
import htmlToText from "html-to-text";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { IUser } from "../interfaces/User";

export class Email {
  to: string;
  firstName: string;
  url: string;
  password?: string;
  from: string;

  constructor(user: IUser, url: string) {
    this.to = user.email;
    this.firstName = user.firstName;
    this.url = url;
    this.password = user.password;
    this.from = `Jonathan Punzalan <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      // Sendgrid
      return nodemailer.createTransport({
        service: "SendGrid", //predefined by nodemailer
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      });
    }
    // nodemailer doesnt have the correct options types
    // Use mailtrap
    else
      return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        }
      } as SMTPTransport.Options);
  }

  private async send(template: string, subject: string, props?: any) {
    //Template is an html template to be sent
    // Send the actual email
    // 1) Render HTML using pug
    const html = pug.renderFile(`${__dirname}/templates/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
      ...props
    });

    // 3) Define mail options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html)
    };

    // 3) create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome new member!");
  }

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Forgotten password reset link (valid for only 10 minutes)"
    );
  }
}
