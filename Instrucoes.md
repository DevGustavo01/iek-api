Entendido! Vamos ajustar a documentação para refletir essa estrutura, onde a rota espera os campos `nome` e `sobrenome` no corpo da requisição. 

---

## Documentação: Rota de Cadastro de Usuário (POST /api/users/register)

### 1. Descrição

Essa rota é usada para cadastrar um novo usuário no sistema. Ela recebe o nome e o sobrenome do usuário e retorna uma mensagem de sucesso e um objeto com os dados do usuário cadastrado.

### 2. URL

`POST /api/users/register`

### 3. Requisição

#### 3.1. Cabeçalhos (Headers)

- **Content-Type**: `application/json`

#### 3.2. Corpo (Body)

A requisição precisa de um JSON com os seguintes campos:

| Campo     | Tipo   | Obrigatório | Descrição                  |
| --------- | ------ | ----------- | -------------------------- |
| nome      | string | Sim         | Nome do usuário            |
| sobrenome | string | Sim         | Sobrenome do usuário       |

#### Exemplo de Corpo da Requisição

```json
{
  "nome": "João",
  "sobrenome": "Silva"
}
```

### 4. Resposta

#### 4.1. Código de Status

- **201 Created**: Cadastro bem-sucedido
- **400 Bad Request**: Dados inválidos ou ausentes

#### 4.2. Corpo da Resposta

Se o cadastro for bem-sucedido, a resposta incluirá um JSON com uma mensagem de sucesso e os dados do usuário cadastrado:

| Campo         | Tipo   | Descrição                       |
| ------------- | ------ | ------------------------------- |
| message       | string | Mensagem de confirmação         |
| user          | object | Objeto contendo os dados do usuário cadastrado |

#### Exemplo de Corpo da Resposta (Sucesso)

```json
{
  "message": "Usuário cadastrado com sucesso.",
  "user": {
    "nome": "João",
    "sobrenome": "Silva"
  }
}
```

### 5. Exemplo de Implementação com `fetch`

Para usar essa rota em uma aplicação JavaScript, utilize a função `fetch` da seguinte forma:

```javascript
// URL da API
const url = 'https://exemplo.com/api/users/register';

// Dados de cadastro do usuário
const data = {
  nome: 'João',
  sobrenome: 'Silva'
};

// Função para cadastrar o usuário
async function registerUser() {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    const result = await response.json();
    console.log('Resposta da API:', result.message);
    console.log('Dados do usuário:', result.user);

  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
  }
}

// Chamar a função para cadastrar
registerUser();
```

### 6. Explicação do Código

- **URL da API**: Definimos a URL do endpoint de cadastro.
- **Dados do Usuário**: Criamos um objeto `data` contendo `nome` e `sobrenome`.
- **Chamada `fetch`**:
  - Utilizamos o método `POST` e configuramos o cabeçalho `Content-Type` para `application/json`.
  - Transformamos `data` em uma string JSON com `JSON.stringify` e enviamos no corpo da requisição.
  - Se a resposta não for `201 Created`, lançamos um erro com `throw new Error`.
- **Tratamento da Resposta**: Após obter a resposta, exibimos a mensagem de sucesso e os dados do usuário cadastrado.

### 7. Boas Práticas

- **Tratar Erros**: Sempre trate possíveis erros com `try-catch`.
- **Usar HTTPS**: Verifique se a URL está usando `https` para segurança.
- **Validação do Token**: Certifique-se de que apenas usuários autorizados possam acessar as rotas de cadastro.

---

Essa documentação foi ajustada para atender à estrutura de `nome` e `sobrenome` no corpo da requisição.