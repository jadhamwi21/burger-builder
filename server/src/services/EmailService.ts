//@ts-ignore
import nodeoutlook from "nodejs-nodemailer-outlook";

export class EmailService {
	private UserEmail: string = "jad.hamwi8@hotmail.com";
	private Password: string = "jad3125474";
	private Receiver: string = "";
	private Subject: string = "";
	private HTML: string = "";

	public setReceiver(receiver: string) {
		this.Receiver = receiver;
		return this;
	}
	public setSubject(subject: string) {
		this.Subject = subject;
		return this;
	}
	public setHTML(html: string) {
		this.HTML = html;
		return this;
	}
	public Send() {
		nodeoutlook.sendEmail({
			auth: {
				user: this.UserEmail,
				pass: this.Password,
			},
			from: this.UserEmail,
			to: this.Receiver,
			subject: this.Subject,
			html: this.HTML,
		});
	}
}
