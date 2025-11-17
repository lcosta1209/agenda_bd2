# agenda_bd2

Contexto do Projeto:

aplicação  "Agenda_BD2", com a seguinte estrutura:

backend/
    venv/ (ambiente virtual ativo)
    requirements.txt (gerado via pip freeze)
    app.py (Flask, importando Blueprints)
    mongo.py (conexão com MongoDB Atlas)
    routes/
        compromissos.py (rotas básicas já criadas)
frontend/
    (ainda vazio)

Dependências já instaladas no backend:
- flask
- flask-cors
- pymongo
- dnspython
- python-dotenv

O backend já foi iniciado, porém a conexão com o MongoDB está falhando.
Erro atual:
"The DNS query name does not exist: _mongodb._tcp.cluster0.xxxxx.mongodb.net"

O que isso significa:
- O MONGO_URI no .env ainda está incorreto.
- O cluster do MongoDB Atlas não foi configurado corretamente OU o hostname foi digitado errado.
- Pode faltar liberar o IP em "Network Access".

Objetivo:
Quero corrigir a conexão do backend com o MongoDB Atlas, configurar corretamente o .env, ajustar o mongo.py se necessário e garantir que o servidor Flask funcione sem erros.

Depois disso, quero completar as rotas CRUD (GET/POST/PUT/DELETE) para compromissos.

Tarefas pendentes:
1. Configurar corretamente o arquivo .env com a string do Atlas.
2. Ajustar o mongo.py para ler o .env sem falhas.
3. Garantir que o cluster e o hostname estão corretos.
4. Garantir que o IP está liberado no Atlas.
5. Testar a conexão.
6. Criar todo o CRUD de compromissos.
