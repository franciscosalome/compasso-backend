Teste Compasso.
    O teste foi feito seguindo as exigencias da equipe compasso.
    É um sistema seguindo os padrões REST para:
    Cadastrar cidade -> POST /cities/register
    Cadastrar cliente -> POST /customers/register
    Consultar cidade pelo nome -> GET /?searchTerm={trechoDoNomeDaCidade}&column=city_name
    Consultar cidade pelo estado -> GET /?searchTerm={siglaEstado}&column=uf
    Consultar cliente pelo nome -> GET /customers/?searchTerm={trechoDoNome}&column=name
    Consultar cliente pelo Id -> GET /customers/id
    Remover cliente -> DELETE /customers/delete/id
    Alterar o nome do cliente -> PUT /customers/edit/id


Utilizei o Knex para facilitar a montagem das Queries, o Express para as rotas e o CORS para controle de acesso. O banco de dados utilizado foi o SQLite.

As rotas para acesso à API estão discriminadas no arquivo routes.js
Os controllers estão separados entre cidades e clientes dentro da pasta controllers.