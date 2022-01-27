# CI/CD React
CI/CD em um projeto padrao criado pela lib do Facebook


## Motivacao 
Praticar CI/CD com git hub actions

## Feature
- Criei workflow de trabalho usando o arquivo CODEOWNERS
- CODEOWNERS consigo redirecionar as fluxo para as branchs responsáveis
- Para funcionar corretamente o ideal e bloquear as branch vitalicias como develop e master
- No arquivo CI usei bastante do recurso de contexto do github usando if e variáveis de ambiente
- Github assim que inicia o repositorio injeto um token em seu repositório local dessa forma consegue captuurar por ${{ github.token }}, mas a intenção era enviar para slack mensagem de release e insue, então na aba de profile em setings, cliquei em develop e fiz meu próprio token
- Para criar as releases de forma automático usei [semantic-release](https://github.com/semantic-release/npm#readme)
- Bom dos caches que não precisei ficar constantemente baixando as dependências para o projeto, ideal estrategia quando precisa em cada etapa do job inicia o ciclo novamente
- Exemplo de uso do cache,fiz o pull do projeto automático pelo yml, apliquei os testes e salvei o cache das depenicas, quando eu precisar fazer o build, ja esta salvo no cache.
- No github acions e ideal seguir a recomendação de cada actions para evitar problemas, [cache](https://github.com/actions/cache)
- Dificuldade foi no momento de setar o node, motivo foi que usei de forma incorreta solicitado pela [actions/node](https://github.com/actions/setup-node)
- Para estender um comando do packjson pode usar a flag --
- Para fazer o deploy da aplicação foi usado o surge
- Dicas para o [surge](https://gitlab.com/kenjimaeda54/static-website)



``` yml

- name: Create release
        if: github.event_name == 'push' && github.ref == 'refs/heads/master'
        run: npx semantic-release
        env:
          # github fornece um token assim que inicia aplicação, consigo acessar direto por secrets.GITHUB.TOKEN
          # mas criei um novo token,porque o evento de release precisa ser meu usuário e nao criado pelo github
          # para criar seu token,no seu perfil de usuário do github,procura por settings, Developer settings e gera o token
          GITHUB_TOKEN: ${{ secrets.PROFILE_TOKEN }}
          
- name: Run tests react and styles
        uses: actions/setup-node@v2
        with:
          node-version: '16.*'
      - run: node --version
      - run: npm ci
      - run: npm run format:check
      - run: npm test -- --coverage # esse -- e para adicionar mais uma flag importante no pack.json so tem npm run test
        env:
          CI: true          



```
