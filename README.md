# DG Solutions Teste de Capacidade Técnica

## Desenvolvimento

1. Clone o repositório e acesse-o

    * Por `HTTPS`

        ```bash
        git clone https://github.com/LucasVmigotto/dg-solutions-test.git
        cd dg-solutions-test
        ```

    * Por `ssh`

        ```bash
        git clone git@github.com:LucasVmigotto/dg-solutions-test.git
        cd dg-solutions-test
        ```

2. Renomeie os arquivos
    * `.env.exmaple` => `.env`
    * `packages/api/.env.exmaple` => `packages/api/.env`
    * `packages/app/.env.exmaple` => `packages/app/.env`
    > Caso necessário, customize as variáveis internas

3. Instale as dependências

    ```bash
    yarn
    ```

4. Utilize os serviços

    * **_pgcli_**:

        ```bash
        docker-compose run --rm pgcli
        ```

    * **_API_**:

        * Subir o serviço:

            ```bash
            docker-compose up api
            ```

        * Utilizar a `CLI`:

            ```bash
            docker-compose run --rm --service-ports api bash
            ```

    * **_APP_**:

        * Subir o serviço:

            ```bash
            docker-compose up app
            ```

        * Utilizar a `CLI`:

            ```bash
            docker-compose run --rm --service-ports app bash
            ```
