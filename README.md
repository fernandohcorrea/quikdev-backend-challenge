# Quikdev

## Documenteção da API

A documenteção da API pode ser acessada no link abaixo:

* [Documenter](https://documenter.getpostman.com/view/273446/UVJcjw4E)

Para testes, basta importar as coleções para o **Postman**. O arquivo do Postman está em :

* docs/Quikdev.postman_collection.json


---
## Instalação

### Requisitos de sistemas

* Docker(> 20.10.11)
* Docker-Compose (> 1.29)
* Node (> v14)
* Yarn (> 1.22)

### #1 Git Clone

Clone o repositório

```bash
$ git clone git@github.com:fernandohcorrea/quikdev-backend-challenge.git quikdev
$ cd quikdev
```

### #2 .Env Docker-Compose

Copie e preencha os arquivos .env .

```bash
$ cp .env_sample .env
```

Neste arquivo temos as variáveis de ambiente para o **Docker-Compose** .

```
# Docker-Composer Env
DK_PROJECT_NAME=quikdev
DK_ENV=development

# Volumes
DK_VOLUMES="${PWD}/volumes"

# $ id <USER>
# uid=1000(USER) gid=1000(USER)
DK_UID=1000
DK_GID=1000

# apiapp
APIAPP_PORT=4000

# Mongo Configs
NOSQLDB_INITDB_ROOT_USERNAME=root
NOSQLDB_INITDB_ROOT_PASSWORD=rootpass
NOSQLDB_PORT=27017
NOSQLDB_VOLUME="${DK_VOLUMES}/nosqldb"
```

No diretório **apiapp**, copie e preencha o arquivo .env 

```bach
$ cd apiapp
$ cp .env_sample .env
```

este

### #3 Dependências do Node

No diretório **apiapp**, execute o **yarn** para instalar as dependências

> **ATENÇÂO**:
>
> Em ambiente linux de desenvolvimento essa etapa é automatizada pelo script **yarn dev** no arquivo package.json 

```bach
$ cd apiapp
$ yarn install
```
---
## Execução

Na raiz do projeto execute o **docker-compose**

```bach
$ docker-compose up
```

---