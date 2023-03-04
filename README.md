# Time is Money

Um Projeto com <b>ÊNFASE EM CÁLCULOS DE DATA E FINANÇAS</b> em fase de <b>desenvolvimento</b>.

Basicamente, recebe os valores iniciais de datas, gastos, lucros e periodicidade, efetuando<br />
todos os cálculos de abatimento financeiro e temporal <b>PARA UMA DATA OU VALOR DESEJADO</b>.

Valores obtidos em paralelo são exibidos como curiosidades, tais como dias de vida, etc...

Para um desafio mais interessante, foram implementados abatimentos diários e juros compostos.

Interessante até demais, isso quadruplicou código, tempo, e testes, além de facilmente gerar<br />
resultados e erros com anos de diferença, às vezes por um simples ano bissexto não calculado.

Obs.: Autônomos que ganham por dia, e pagam pensão alimentícia irão concordar!!! rs


## Aplicação e Conteúdo

Utiliza o framework NEXT.js, para diversificação de projetos, não sendo requisito necessário.

Realiza renderização primária com uma única página, entre texto de apresentação e o formulário.

O formulário 'CpFrmTimeMoney', controlador principal, é responsável pela importação, renderização,<br />
e comunicação entre hook customizado e demais componentes, com passagem e obtenção de métodos e valores.

Suas funções tratam lógica de renderização e erros, utilizando prioritariamente o hook useRef para isso.

O hook customizado 'useTimeMoney' é responsável pelas lógicas de cálculo, além da persistência <br />
de seus valores, utilizando apenas o hook useState para isso.

Suas funções contemplam cálculos específicos, enquanto as funções mais genéricas são desmembradas em mais <br />
arquivos e importadas, visando tanto a utilidade de reuso, como redução de código neste arquivo(+500 linhas).

Os componentes de input possuem sua própria lógica quanto a validação e submissão de dados, mas <br />
com algumas intervenções pelo formulário(pai), quando necessário.
<br />

## Desenvolvimento e Aviso

O planejamento <b>se restringe a sua proposta de cálculos</b>, com funções massivamente testadas.

O uso de somente 2 hooks busca evolução progressiva, mas já trilha um caminho opcional e livre.

Todo o resto, principalmente as renderizações, possuem caráter experimental, de estudo e testes.

### Não tome o projeto como exemplo, e sim um estudo, de explorações peculiares e incomuns.

O <b>experimento</b> se dá por testar e manter uma <b>lógica inversa de renderização</b>, onde <br />
o useRef se destina às renderizações, e o useState à persistência de dados.

As motivações foram o capricho de animações, e telas renderizadas sem alterações de estado ou Re-renders.

Resultados interessantes e até satisfatórios de início, mas impossíveis de manter com useState.

Renderizações condicionais, sem animação, possivelmente reduziriam tempo e código em mais da metade.
