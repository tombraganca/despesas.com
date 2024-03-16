## Despesas.com - API REST Node.js  🚀

Este é um projeto que implementa uma API REST em Node.js para gerenciar despesas de usuários, com funcionalidades de autenticação de usuário, CRUD de despesas, validações de entrada e restrições de acesso.

### Uma breve introdução

Imaginemos que um usuário quer registrar seus gastos. Ele precisa de um aplicativo que ele possa se cadastrar, fazer login e registrae suas despesas diárias e visualiza-las. Neste contexto, o **despesa.com** seria a melhor ferramenta para ele.

🧾 - Minhas despesas diárias!

No caso, iremos criar toda a estrutura Back End para que isso ocorra.

Vamos lá!

### Tecnologias Utilizadas

- Node.js
- Express.js
- JWT (JSON Web Tokens) para autenticação
- Banco de dados (MySQL)
- Nodemailer para envio de e-mails

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seuusuario/despesas-com.git
```

2. Instale as dependências:

```bash
cd despesas-com
npm install
```

3. Configure as variáveis de ambiente:

Renomeie o arquivo .env.example para .env e configure as variáveis de ambiente necessárias, como a conexão com o banco de dados, segredo para geração de tokens JWT e credenciais para envio de e-mails.

4. Inicie o servidor:

```bash
npm run dev
```

### Rotas

GET /health: Valida a saude do serviço.  
POST /signin: Registra um novo usuário.  
POST /login: Autentica um usuário e gera um token JWT.  
POST /refresh: Obter novos tokens para um usuário.

### Testes

Para testar a API, você pode usar ferramentas como Postman ou Insomnia para enviar requisições HTTP para as rotas especificadas. Além disso, a API também deve ser testada utilizando testes automatizados, incluindo testes de unidade e testes de integração.

### Considerações Finais

Este projeto foi desenvolvido como parte de um case técnico para demonstrar habilidades em Node.js, implementando boas práticas de desenvolvimento de software, como separação de responsabilidades, tratamento de erros e segurança. Qualquer feedback é bem-vindo para a melhoria contínua deste projeto.

### Resposavel

Gleydiston Bragança - gleydiston35@gmail.com

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://br.linkedin.com/in/gleydiston-santos-7245aa196)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/tombraganca/tombraganca)
