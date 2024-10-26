import express, { Request, Response, Express } from 'express';
import fs from 'fs';
import path from 'path';

// Inicializa o aplicativo Express e define a porta
const app: Express = express();
const port: number = 3000;

// Middleware para analisar JSON no corpo das requisições
app.use(express.json());

// Caminho do "arquivo de banco de dados" JSON
const dbPath = path.join(__dirname, 'database.json');

// Função para carregar o conteúdo do arquivo JSON
const loadDatabase = (): any[] => {
  if (fs.existsSync(dbPath)) {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  }
  return [];
}

// Função para salvar dados no arquivo JSON
const saveToDatabase = (data: any[]): void => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
};




// Rota GET para buscar dados por ID, nome ou sobrenome
app.get('/user', (req: Request, res: Response): void => {
  // Desestrutura os parâmetros `id`, `nome` e `sobrenome` da query string da requisição
  const { id, nome, sobrenome } = req.query;

  // Chama a função `loadDatabase()` para carregar todos os dados salvos no arquivo `database.json`
  const data = loadDatabase();

  // Filtra os dados com base nos parâmetros fornecidos (id, nome, sobrenome)
  const result = data.filter((item) =>
    // Verifica se:
    // - `id` não foi passado ou o `item.id` é igual ao `id` fornecido (convertido para número)
    (!id || item.id === Number(id)) &&
    // - `nome` não foi passado ou o `item.nome` é igual ao `nome` fornecido
    (!nome || item.nome === nome) &&
    // - `sobrenome` não foi passado ou o `item.sobrenome` é igual ao `sobrenome` fornecido
    (!sobrenome || item.sobrenome === sobrenome)
  );

  // Retorna o resultado do filtro:
  // - Se `result` contiver dados, retorna o array de objetos correspondentes.
  // - Se `result` estiver vazio, retorna a mensagem `{ message: 'Nenhum dado encontrado.' }`.
  res.json(result.length > 0 ? result : { message: 'Nenhum dado encontrado.' });
});


// ===========================================================


// Rota POST para adicionar um novo registro
app.post('/user', (req: Request, res: Response): void => {
  // Extrai `id`, `nome`, e `sobrenome` do corpo da requisição (`req.body`)
  const { id, nome, sobrenome } = req.body;

  // Carrega todos os dados existentes no "banco de dados" (o arquivo `database.json`)
  const data = loadDatabase();

  // Middleware para verificar se o usuário já existe (mesmo `id` ou `nome`)
  const userExists = data.some((user) => user.id === id || user.nome === nome);
  if (userExists) {
    // Retorna um erro 409 (Conflict) caso o `id` ou `nome` já exista no banco de dados
    res.status(409).json({ message: 'Usuário já existe com este ID ou Nome.' });
  }

  // Cria um novo objeto `newUser` com os dados fornecidos
  const newUser = { id, nome, sobrenome };

  // Adiciona `newUser` ao array `data`, que contém os dados carregados do arquivo
  data.push(newUser);

  // Salva o array atualizado `data` no arquivo JSON, persistindo a adição do novo usuário
  saveToDatabase(data);

  // Retorna uma resposta JSON com status 201 (Created), incluindo uma mensagem de sucesso
  // e os dados do `newUser` recém-adicionado
  res.status(201).json({ message: 'Usuário adicionado com sucesso!', user: newUser });
});





// =============================================================


// Rota GET para retornar todos os dados salvos
app.get('/', (req: Request, res: Response): void => {
  const data = loadDatabase();
  res.json(data.length > 0 ? data : { message: 'Nenhum dado encontrado.' });
})





// Inicia o servidor na porta especificada com um callback de retorno
app.listen(port, (): void => {
  // Exibindo uma mensagem no console quando o servidor começa a escutar na porta
  console.log(`Example app listening on port ${port}`);
})