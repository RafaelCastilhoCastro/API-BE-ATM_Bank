
# API Backend ATM Bank :atm:


Essa é uma API para um projeto ***POC*** desenvolvido visando simular um sistema bancário, a fim viabilizar alguns fluxos de movimentação financeira em contas de clientes.
O projeto conta com um mock de banco de bados nomeado ***data.ts***. O projeto permite ao usuário consumir dados do banco de dados e modifica-los.

O arquivo ***request.rest*** incluso nos arquivos do repositório permite o teste e exame dos resultados dos endpoints.
</br>


* Dependências:
	* ts-node-dev
	* Express
	* Cors
	* Typescript
</br>


Lista de endpoints disponíveis:


* Get all accounts
	- Método: **GET**
	- Url: __{BASEURL}__***/accounts***
	- Retorna todas as contas existentes.
	- Não é necessário informar nenhum parâmetro.
</br>
	
	
* Get account balance
 	- Método: **GET**
	- Url: __{BASEURL}__***/account/balance***
	- Retorna o saldo da conta informada.
	- Necessário informar no body da requisição o **cpf** (em formato número), sem pontuação.
	
	
	
* Add new account
	- Método: **POST**
	- Url: __{BASEURL}__***/accounts***
	- Adiciona nova conta e retorna lista de contas existentes.
	- Necessário informar no body da requisição **name** (nome), **cpf** e **birtheDate** (data de nascimento do usuário).
</br>
	
	
* Add deposit to transactions history
	- Método: **PUT**
	- Url: __{BASEURL}__***/account***
	- Adiciona o registro de um depósito ao histórico de transações de uma conta e retorna lista de contas existentes.
	- Necessário informar no body da requisição o **accountName** (nome), **cpf** e **amount** (valor do depósito).
	- Esse endpoint não atualiza o saldo da conta, essa função será feita por um endpoint próprio.
</br>
	
	
* Add debt to transactions history
	- Método: **PUT**
	- Url: __{BASEURL}__***/account/pay***
	- Adiciona o registro de um débito ao histórico de transações de uma conta e retorna lista de contas existentes.
	- Necessário informar no body da requisição a **dueDate** (data de vencimento), **description** (descrição do débito), **amount** (o valor do débito) e o **cpf**.
	- Esse endpoint não atualiza o saldo da conta, essa função será feita por um endpoint próprio.
</br>


* Add transfer between accounts to transactions history
	- Método: **POST**
	- Url: __{BASEURL}__***/transfer***
	- Adiciona o registro de uma transferência entre contas ao histórico de transações de ambas as contas informadas e retorna lista de contas existentes.
	- Necessário informar no body da requisição o **senderName** (nome da conta que envia), **senderCpf** (cpf da conta que envia), **recipientName** (nome da conta que recebe), **recipientCpf** (cpf da conta que recebe) e **amount** (valor da transferência).
	- Esse endpoint não atualiza o saldo da conta, essa função será feita por um endpoint próprio.
</br>


* Update account balance according to transactions history
	- Método: **PUT**
	- Url: __{BASEURL}__***/account/update-balance***
	- Atualiza o saldo da conta informada de acordo com os registros de transações da conta e retorna lista de contas existentes.
	- Necessário informar no body da requisição o **cpf**.
</br>

  ---
  :computer: Desenvolvido por: Rafael Castro
