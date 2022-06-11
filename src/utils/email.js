import { createTransport } from "nodemailer";

const transporter = createTransport({
  service: "",
  auth: {
    user: "",
    pass: "",
  },
});
export const sendMail = async (to, subject, html) => {
  await transporter.sendMail({
    to,
    subject,
    html,
  });
};
const createHtml = ({ firstName, link }) => `
<html>
<body>
Dear ${firstName},
to finish the required action please click the following link:&nbsp;
<a href=${link} target="_blank" rel="noreferrer noopener">Action</a>
or use the following link: ${link}
</body>
</html>
`;

export const sendForgotPasswordEmail = async ({
  to,
  jwt,
  firstName,
  origin,
}) => {
  await sendMail(
    to,
    "Forgot password",
    createHtml({
      link: `${origin}/verify-reset?token=${jwt}`,
      firstName,
    })
  );
};
export const sendRegistrationEmail = async ({ to, jwt, firstName, origin }) => {
  await sendMail(
    to,
    "Successful registration",
    createHtml({
      link: `${origin}/verify-account?token=${jwt}`,
      firstName,
    })
  );
};
export const sendChangeEmailEmail = async ({ to, jwt, firstName, origin }) => {
  await sendMail(
    to,
    "Email change request",
    createHtml({
      link: `${origin}/verify-email?token=${jwt}`,
      firstName,
    })
  );
};

await sendForgotPasswordEmail({
  to: user.email,
  firstName: user.firstName || user.email,
  jwt: jwt.sign({ email: user.email }, TOKEN_SECRET, {
    expiresIn: "1h",
  }),
  origin: ctx.request.headers.origin,
});
