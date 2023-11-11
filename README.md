<h1 align="center">Case DNC - Plataforma Educacional</h1>
<p align="center">Criação de uma plataforma de aprendizado online que visa fornecer recursos educacionais.</p>

<p align="center">✔️ dnc-case: Finalizado ✔️</p>

<p align="center">
 <a href="#Sobre">Sobre</a> • 
 <a href="#Estrutura-de-Dados">Estrutura de Dados</a> • 
 <a href="#Páginas">Páginas</a> •
 <a href="#Rodando-o-projeto">Rodando o Projeto</a> • 
 <a href="#Autor">Autor</a>
</p>

<p align="center">
  <img src="https://img.shields.io/static/v1?label=Node&message=v18.17.1&color=2d81c1&style=for-the-badge&logo=ghost"/>
  <img src="https://img.shields.io/static/v1?label=React&message=v18^&color=2d81c1&style=for-the-badge&logo=ghost"/>

  <img src="https://img.shields.io/static/v1?label=Next&message=v14.0.1&color=2d81c1&style=for-the-badge&logo=ghost"/>
</p>


<p align="center">
  <img alt="Imagem com informações do post selecionado" title="Post view page" src="https://i.imgur.com/WOqe3Y7.png" />
</p>

---

### Sobre

Este projeto tem como objetivo desenvolver um case para a DNC de uma plataforma de estudos online, com objetivo de disponibilizar recursos educacionais para os usuários.

### About

### 📄 Estrutura de Dados

Os dados estão estruturados em json, no arquivo db.json

```
{
  "courses": [
    {
      "id": number,
      "name": string,
      "resume": description,
      "imageUrl": string,
      "requirements": [
        {
          "id": number,
          "content": string
        }
      ],
      "students": [
        {
          "id": string,
          "name": string,
        }
      ],
      "contents": [
        {
          "id": string,
          "title": string,
           "leasons": [
            {
              "title": string
              "duration": number,
              "videoUrl": string,
              "description": string,
              "complementary_materials": [
                {
                  "name": string,
                  "url": string
                }
              ]
            }
          ],
          "quizzes": [
            {
              "title": string,
              "questions": [
                {
                  "title": string,
                  "content": string,
                }
              ]
            }
          ]
        }
      ],
      "ratings": [
        {
          "id": number,
          "value": number,
          "rated_by": {
            "id": number,
            "name": string,
            "role": string,
            "photo": string,
          },
          "description": string
        }
      ],
      "instructor": {
        "id": number,
        "name": string,
        "about": string,
        "photo": string
      }
    }
  ],
  "users": [
    {
      "id": number,
      "name": string,
      "email": string,
      "role": string,
      "password": string,
      "photo": string
    }
  ]
}
```

Os dados foram estruturados para simular relacionamentos de entidades de um banco que se integram ao curso.

Há duas principais entidades declaradas no arquivo, "courses" e "users".

A separação é devido a necessidade de simular o login de um usuário na plataforma.

## 💻 Páginas

### Home

<p align="center">
  <img alt="Imagem com informações do post selecionado" title="Post view page" src="https://i.imgur.com/0FcbK1A.png" />
</p>

A página inicial, utiliza os dados dos cursos cadastrados para visualização.

Para visualização dos cursos em destaque, é feita uma validação dentro dos cursos ("courses") e retornado os 3 com melhor avaliação dos usuários (calculada média de avaliações para cálculo).

Mais abaixo, são utilizados todos os cursos para listagem, com opção de busca por nome e paginação.

### Curso

<p align="center">
  <img alt="Imagem com informações do post selecionado" title="Post view page" src="https://i.imgur.com/IPs0b7g.png" />
</p>

Na página do curso, é feita uma requisição fetch para o fake json server pelo id do curso selecionado. Com base nos dados retornados, os componentes da página são montados e renderizados dinamicamente.

Nesta página, foram criados dois componentes específicos: 
- <strong>CourseActions.tsx</strong> 
- <strong>RatingCarousel.tsx</strong>

O component CourseActions utiliza de informações do usuário logado para mudar sua visualização e funcionalidade. Quando há um usuário logado, a visualização muda e é alterada para a imagem abaixo.

<p align="center">
  <img alt="Imagem das ações do curso quando logado" title="Post view page" src="https://i.imgur.com/IixyRJn.png" />
</p>

Já o componente de RatingCarousel, utiliza dos dados dentro de "ratings" que está dentro de "courses" para retornar as avaliações relacionadas ao curso.

<p align="center">
  <img alt="Imagem das ações do curso quando logado" title="Post view page" src="https://i.imgur.com/00dgixx.png" />
</p>

### Conteúdo do Curso

<p align="center">
  <img alt="Imagem das ações do curso quando logado" title="Post view page" src="https://i.imgur.com/Pa3hzB2.png" />
</p>

Na página de conteúdo do curso, são mostrados os conteúdos do curso separados por aulas.

Essa página possui um compartilhamento de contexto para que as informações da aula "leason" selecionada sejam compartilhadas entre os componentes do vídeo, informações (nome da aula, descrição, materiais).

Esses componentes utilizam as informações dentro de "contents" na <a href="#Estrutura-de-Dados">estrutura de dados</a> já apresentada

Os componentes dessa página são
- <strong>ContentAccordion.tsx</strong> 
- <strong>LeasonInformation.tsx</strong>
- <strong>LeasonVideo.tsx</strong>
- <strong>RatingCourse.tsx</strong>

O componente de ContentAccordion possui as informações do conteúdo em geral. É ele quem mostra as aulas e quizzes (caso possua do conteúdo em geral) e ele quem é o "ator principal" na página, pois o conteúdo mostrado na página é derivado do que for selecionado nele.

O componente de LeasonInformation, mostra as informações gerais da aula selecionada. Ele quem mostra o título da aula, a descrição e os materiais complementares.

O componente de LeasonVideo é para mostrar o vídeo da aula selecionada.

E por fim, o componente de RatingCourse é o que irá abordar a avaliação do curso. Nele, está contido o formulário para adicionar uma avaliação ao curso, de modo que essa seja atrelada às outras avaliações já existentes do curso.

### Meus Cursos

<p align="center">
  <img alt="Imagem das ações do curso quando logado" title="Post view page" src="https://i.imgur.com/LBzFbA8.png" />
</p>

Essa simples página, reaproveita o componente utilizado para pesquisa de cursos da Home. A diferença é que ela busca inicialmente somente os cursos aos quais o usuário está inscrito, facilitando com que ele encontre somente algum curso dentro dos quais ele já está inscrito.

---

### Rodando o projeto

Antes de rodar essa aplicação, você precisará ter no seu computador: [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). É recomendável que você tenha algum editor de texto instalado, como o [VSCode](https://code.visualstudio.com/).

```
# Clone o repositório com o comando
$ git clone <https://github.com/cainamagoncalves/dnc-case.git>

# Acesse o cmd e navegue até a pasta
$ cd dnc-case

# Instale as dependências do projeto
$ npm install

# Rode o json server fake com
$ npm run start:server

# Rode o frontend
$ npm run dev

# O json server vai startar na porta:3333

# O frontend server vai startar na porta:3000 - acesse<http://localhost:3000>
```
___

 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/60739925?v=4" width="100px;" alt=""/>
 <br />

Feito com ❤️ por Cainã Gonçalves 👋🏽 fale comigo!

[![Linkedin Badge](https://img.shields.io/badge/-Cainã-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/cainã-gonçalves/)](https://www.linkedin.com/in/cainã-gonçalves/) 
[![Gmail Badge](https://img.shields.io/badge/-moaraadrean@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:moaraadrean@gmail.com)](mailto:moaraadrean@gmail.com)
