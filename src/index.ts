import express, { Request, Response, Express } from 'express';

// Definindo a constante `app` com o tipo `Express`, indicando que se trata de uma instância do servidor Express.
const app: Express = express();

// Definindo o número da porta com o tipo `number`, para garantir que `port` terá sempre um valor numérico.
const port: number = 3000;

// Configurando o middleware para permitir o parsing de JSON nas requisições.
// Isso transforma automaticamente o corpo das requisições JSON em objetos JavaScript, acessíveis por `req.body`.
app.use(express.json());


// Definindo o tipo de `req` como `Request` e `res` como `Response` para assegurar tipagem forte no Express
app.get('/', (req: Request, res: Response): void => {
  // Retornando um JSON com a mensagem "Hello World!".
  res.json({ message: 'Hello World!' })
})


// Inicia o servidor na porta especificada com um callback de retorno
app.listen(port, (): void => {
  // Exibindo uma mensagem no console quando o servidor começa a escutar na porta
  console.log(`Example app listening on port ${port}`);
})