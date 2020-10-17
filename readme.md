<h1>Teste Compasso.</h1>
<br>
    O teste foi feito seguindo as exigencias da equipe compasso.<br>
    É um sistema seguindo os padrões REST para:<br>
    *Cadastrar cidade -> POST /cities/register<br>
    *Cadastrar cliente -> POST /customers/register<br>
    *Consultar cidade pelo nome -> GET /?searchTerm={trechoDoNomeDaCidade}&column=city_name<br>
    *Consultar cidade pelo estado -> GET /?searchTerm={siglaEstado}&column=uf<br>
    *Consultar cliente pelo nome -> GET /customers/?searchTerm={trechoDoNome}&column=name<br>
    *Consultar cliente pelo Id -> GET /customers/id<br>
    *Remover cliente -> DELETE /customers/delete/id<br>
    *Alterar o nome do cliente -> PUT /customers/edit/id<br>

A API está configurada para ouvir a porta :3333<br>

Utilizei o Knex para facilitar a montagem das Queries, o Express para as rotas e o CORS para controle de acesso. O banco de dados utilizado foi o SQLite.<br>
<br>
As rotas para acesso à API estão discriminadas no arquivo routes.js<br>
Os controllers estão separados entre cidades e clientes dentro da pasta controllers.<br>
<br>
A estrutura para o body em JSON para cadastrar um novo cliente (ou editar) é a seguinte:<br>
{<br>
    "name": "Francisco Salomé",<br>
    "gender": "Male",<br>
    "date_of_birth": "1994-03-31",<br>
	"city_id":2<br>
}<br>
<br>
E para cadastrar uma nova cidade:<br>
{<br>
    "cityName": "São Paulo",<br>
    "uf": "SP"<br>
}<br>
