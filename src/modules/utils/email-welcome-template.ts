export const emailTemplate = ({ name, email, password }) => {
  return `
  <!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Fast Order</title>
    </head>
    <body style="margin: 0; padding: 0">
      <table
        style="
          width: 340px;
          height: 530px;
          margin: 0 auto;
          background-color: #00224e;
        "
      >
        <tr>
          <td style="text-align: center">
            <img
              width="180px"
              height="180px"
              src="https://i.imgur.com/a6xLPxj.png"
              alt="Logo Fast Order"
            />
          </td>
        </tr>
        <tr>
          <td style="text-align: center">
            <h1 style="font-family: Geneva; color: #f1f7fe">Welcome ${name}</h1>
          </td>
        </tr>
        <tr>
          <td style="text-align: center">
            <p style="font-family: 'Source Sans Pro', sans-serif; color: #f1f7fe">
              Here are your credentials
            </p>
            <p
              style="
                font-family: 'Source Sans Pro', sans-serif;
                color: #dbdbdbbb;
                text-align: justify;
                margin-left: 20px;
              "
            >
              Email:
              <span style="color: #f1f7fe">${email}</span>
            </p>
            <p
              style="
                font-family: 'Source Sans Pro', sans-serif;
                color: #dbdbdbbb;
                text-align: justify;
                margin-left: 20px;
              "
            >
              Password:
              <span style="color: #f1f7fe">${password}</span>
            </p>
          </td>
        </tr>
        <tr style="margin-bottom: 15px">
          <td style="text-align: center">
            <a
              style="
                font-family: Helvetica;
                text-shadow: 1px 3px #525252;
                color: #f1f7fe;
                text-decoration: none;
              "
              href="https://www.google.com/"
              >Go to Login</a
            >
          </td>
        </tr>
      </table>
    </body>
  </html>
`;
};
