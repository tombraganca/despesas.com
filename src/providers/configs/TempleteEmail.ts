interface ITransactionTempleteDTO {
  name: string;
  amount: number;
  title: string;
  details: string;
  date: Date
}

export const TEMPLATE_EMAIL = (name: string) => `<!doctype html>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bem-vindo ao Despesas.com!</title>
    <style>
        /* Estilos para garantir uma boa aparência em diferentes clientes de email */
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
        }
        p {
            color: #666;
        }
        .btn {
            display: inline-block;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            margin-top: 20px;
        }
        .btn:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Bem-vindo ao Despesas.com!</h1>
        <img alt="Inspect with Tabs" src="https://assets-examples.mailtrap.io/integration-examples/welcome.png" style="width: 100%;">
        <p>Oi ${name},</p>
        <p>Obrigado por se juntar ao Despesas.com! Estamos felizes em tê-lo como parte da nossa comunidade.</p>
        <p>Agora você pode começar a gerenciar suas despesas de forma mais eficiente, acompanhando seus gastos, definindo metas e muito mais.</p>
        <p>Se você tiver alguma dúvida ou precisar de ajuda, não hesite em nos contatar.</p>
        <p>Divirta-se e boas economias!</p>
        <a href="https://github.com/tombraganca" class="btn">Comece Agora</a>
        <p>Atenciosamente,<br/>Equipe Despesas.com</p>
    </div>
</body>
</html>

`;

export const TEMPLATE_EMAIL_ESPENSE = ({ name, amount, title, details, date }: ITransactionTempleteDTO) => `<p>Olá, ${name}!</p>
<p>Acabou de lançar uma despesa no valor de R$${amount} na data de ${date.getDay}/${date.getMonth}/${date.getFullYear}.</p>
<p>Título: ${title}</p>
<p>Detalhes: ${details}</p>
<p>Att, Equipe do despesa.com.</p>`
