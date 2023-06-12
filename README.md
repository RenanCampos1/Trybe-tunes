# Projeto Trybe Tunes 🎧

Bem vindo ao repositório do projeto **TrybeTunes**.

TrybeTunes é um APP online, onde é possível pesquisar por músicas através de álbuns, artistas ou bandas, você pode ouvir um preview das músicas e favorita-las.

Recebi esse desafio enquanto aluno da [Trybe](https://www.betrybe.com/) para colocar em prática todos os conceitos e conhecimentos adquiridos em **React**, **React-Router**, **Lifecycle Methods**, eu apliquei muito carinho, esforço, um pouco de CSS e testes com a biblioteca **React-Testing-Library**, com algumas dosagens de lógica, sempre buscando manter um código bem organizado.

###### Nessa aplicação temos 6 rotas que constituem a sua construção:
- `/TrybeTunes`;
- `/search`;
- `/favorites`;
- `/profile`;
- `/profile/edit`;
- `/album/:id`;

Nessa aplicação é possível pesquisar e listar álbuns e músicas de várias bandas e artistas é possível até mesmo ouvir o preview de cada música,além disso, você também poderá favoritar suas músicas preferidas. ❤️

## Algumas especificações 📋

1. Temos validações no campo de digitar o nome, onde ele precisa ter no mínimo 3 caracteres para que o botão de **Entrar** seja habilitado.
2. Na pesquisa dos álbuns temos requisição a uma API pública caso a sua busca não retorne algum resultado, por favor, tenha paciência, pois por ser pública ela pode não estar funcionando no momento, é um serviço de terceiro.
3. Usuários e músicas favoritas são salvas no próprio navegador, não se preocupe, pois assim que o navegador é fechado as informações são apagadas.
4. Essa aplicação foi desenvolvida com o princípio de mobile-first, a versão de desktop ainda não está pronta.
5. Existem testes automatizados que garantem a saúde do app desenvolvidos nas páginas de **Login** e **Buscas**, testes para as outras páginas serão desenvolvidos futuramente.

## Instalando Dependências
> Frontend
```bash
cd src/
npm install
``` 
## Executando aplicação
* Para rodar o front-end:

  ```
    cd src/ && npm start
  ```

## Executando Testes

* Para rodar todos os testes:

  ```
    npm test
