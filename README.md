<div align="center">
<h1> Pokédex Ionic + Angular </h1>
<br>
<p>
  Aplicativo de Pokédex multiplataforma desenvolvido em Ionic e Angular utilizando os serviços RESTful da API pública PokéAPI.
</p>
<img src="docs/pokedex-ionic-angular.gif">
<br>
<a href="https://pokedex-ionic-angular.netlify.app/">Live Demo</a>
</div>

## Índice

- [Páginas](#páginas)
- [Boas Práticas](#boas-práticas)
- [Responsividade](#responsividade)
- [Deploy](#deploy)
- [Melhorias Planejadas](#melhorias-planejadas)

## Páginas

### Tela Principal

`/inicio/`

- Lista todos os Pokémons, exibindo Imagem, Nome e Id.
- Permite pesquisar por nome.
- Permite filtrar por tipo.
- Ignora variações, exibindo apenas os 1025 Pokémons em sua forma original.

> e.g. "#448 Lucario" é exibido, "#10059 mega-lucario" não.

### Tela de Detalhes

`/detalhes/:id`

Exibe detalhes de um Pokémon específico e permite adicionar/remover dos favoritos.

> - Id
> - Nome
> - Imagem
> - Tipo
> - Altura
> - Peso
> - Habilidades
> - Estatísticas

### Tela de Favoritos

`/favoritos/`

- Exibe os Pokémons que o usuário adicionou à sua lista de favoritos.
- Utiliza o Ionic Storage ([@ionic/storage](https://github.com/ionic-team/ionic-storage)) para armazenar os dados no IndexedDB.

## Boas Práticas

### Estrutura de Arquivos

#### /components/

Componentes utilizados no projeto.

`Lista`

Utilizado nas páginas `Início` e `Favoritos` para exibir uma lista de Pokémons utilizando componente `CardPokemon`.

`CardPokemon`

Exibe Nome, Imagem e Id de um Pokémon e permite adicionar/remover dos favoritos.

#### /pages/

Páginas do projeto.

> e.g. `Início`, `Detalhes` e `Favoritos`.

#### /services/

Serviços do projeto.

`PokeAPI`

Obtém dados da API pública [PokéAPI](https://pokeapi.co/).

> getPokemons() obtém uma lista de Pokémons.

> getPokemon() obtém detalhes de um Pokémon específico.

> getPokemonsDoTipo() obtém uma lista de Pokémons de um determinado tipo.

`Favoritos`

Gerencia os favoritos.

> getFavoritos() obtém a lista de favoritos.

> toggleFavorito() adiciona/remove um Pokémon da lista de favoritos.

> isFavorito() verifica se um Pokémon está na lista de favoritos.

`Busca`

Realiza busca por Nome e/ou Tipo do Pokémon.

`Storage`

Gerencia o [@ionic/storage](https://github.com/ionic-team/ionic-storage).

`Theme`

Gerencia a preferência do usuário entre modo claro e modo escuro.

`TabEvents`

Utilizado para realizar a funcionalidade de ScrollToTop utilizando os botões das tabs.

#### /tabs/

Navegação por tabs, garantindo um botão de fácil acesso para `Início` e `Favoritos` em todas as páginas.

> O projeto foi incializado utilizando o template de tabs fornecido pelo Ionic, utilizando o comando<br>`ionic start pokedex-ionic-angular tabs --type=angular`

### Controle de Versão

- Padrão de Commits: `Conventional Commits`
- Fluxo de Trabalho: `GitHub Flow`

## Responsividade

A interface foi adaptada para funcionar em diferentes dispositivos.

<div align="center">
<img src="docs/responsivo.png">
</div>

## Deploy

O aplicativo foi hospedado na plataforma Netlify e pode ser acessado em:

https://pokedex-ionic-angular.netlify.app/

## Melhorias Planejadas

- [ ] Criar testes unitários
- [x] Filtos
  - [x] Implementar busca por nome do Pokémon
  - [x] Implementar busca por tipo do Pokémon
- [x] Interface
  - [x] Criar cards para a lista Pokémons
  - [x] Adicionar cores relativas aos tipos
  - [x] Adicionar animações
  - [x] Formatar nomes de Pokémons e habilidades
  - [x] Implementar botão em detalhes para navegar entre Pokémons

<br><br><br>

_<p align="center">Projeto desenvolvido como teste prático para uma vaga de Desenvolvedor Full-Stack Jr.</p>_
