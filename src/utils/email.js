import nodeMailer from "nodemailer";
import nodemailerHandlebars from "nodemailer-express-handlebars";

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

const handlebarOptions = {
  viewEngine: {
    extName: ".html",
    partialsDir: "./src/utils/templates/",
    layoutsDir: "src/utils/templates/",
    defaultLayout: ""
  },
  viewPath: "./src/utils/templates/",
  extName: ".html"
};

transporter.use("compile", nodemailerHandlebars(handlebarOptions));

export const sendEmail = async (user, subject, url, template) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject,
      template,
      context: {
        verificationLink: url,
        username: user.name,
        companyName: user.companyName,
        generatedPassword: user.generatedPassword
      }
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

export const sendVerificationEmail = async (email, token) => {};
