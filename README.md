# Time is Money

Um Projeto <b>EM FASE DE DESENVOLVIMENTO</b> com <b>ênfase em cálculos de data e finanças</b>.

Basicamente, recebe valores de input de datas e finanças sazonais de gastos e lucros.

Efetuará todos os cálculos de abatimento financeiro e temporal para uma data ou valor desejado.

Aproveitará para exibir valores obtidos em paralelo como curiosidades, tais como dias de vida, etc...
<br /><br />

## Aplicação e Conteúdo

Utiliza o framework NEXT.js, buscando se diferenciar de projetos anteriores, com implementações
básicas e uma evolução gradual e progressiva, porém, maior que a desejada por ser o 1o projeto NEXT.

Com uma única página, realiza renderização primária e condicional entre texto de apresentação, e o formulário.
<br /><br />

O formulário CpFrmTimeMoney é o controlador principal, responsável pelas renderizações de seus fieldsets,
importação tanto de componentes respectivos, como de um hook personalizado e a passagem e obtenção de valores e métodos.

Este hook é responsável pela lógica de cálculo, métodos e persistência de valores, independente das renderizações.

Os componentes de input possuem sua própria lógica quanto a validação e submissão de dados.
<br /><br />

## Aviso:

As implementações e commits não são de caráter final, funcional, e nem visam build para produção no momento.

Muitos testes estão sendo realizados, e a versão limpa e funcional do código será indicada em tag.
<br /><br />

## Observações Adicionais aos Iniciantes

O uso do hook useRef é opcionalmente exacerbado e de caráter experimental quanto aos Re-renders (inicialmente satisfatório).

A alteração do arquivo app.js, e implementação de componentes de layout persistidos são apenas um padrão de uso.

Não são necessários em projetos single page, e serão modificados em breve devido a novos recursos (Server Components).
<br /><br />

Vale ressaltar que o uso do NEXT serve ao propósito de diversificação e evolução dos projetos, mas no mundo real
seria totalmente desnecessário, pesado, e incompatível com a simples proposta deste projeto.

Um projeto mais simples e enxuto será criado como antecessor deste, por exemplo uma versão React/Next do projeto
Light Game, mais alinhado a um 1o projeto React, idêntico quanto a funcionalidade e visual, servindo como comparativo.

Destinado e indicado a possíveis estudantes como eu no passado, com implementações mais básicas e compreensíveis.
