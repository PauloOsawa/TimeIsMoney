# Time is Money

Um Projeto com <b>ÊNFASE EM CÁLCULOS DE DATA E FINANÇAS</b> em fase de <b>desenvolvimento</b>.

Basicamente, recebe os valores iniciais de datas, gastos, lucros e periodicidade, efetuando<br />
todos os cálculos de abatimento financeiro e temporal <b>PARA UMA DATA OU VALOR DESEJADO</b>.

Valores obtidos em paralelo são exibidos como curiosidades, tais como dias de vida, etc...

Para um desafio mais interessante, foram implementados abatimentos diários e juros compostos.

## Aplicação e Conteúdo

Utiliza o framework NEXT.js, para diversificação de projetos, não sendo requisito necessário.

Realiza renderização primária com uma única página, entre texto de apresentação e o formulário.

O formulário 'CpFrmTimeMoney', controlador principal, é responsável pela importação, renderização,<br />
e comunicação entre hook customizado e demais componentes, com passagem e obtenção de métodos e valores.

Suas funções tratam lógica de renderização e erros, utilizando <b>opcionalmente</b> apenas o hook useRef para isso.

O hook customizado 'useTimeMoney' é responsável pelas lógicas de cálculo, além da persistência de seus <br />
valores, utilizando <b>opcionalmente</b> apenas o hook useState para isso.

Suas funções contemplam cálculos específicos, enquanto as funções mais genéricas são desmembradas em mais <br />
arquivos e importadas, visando tanto a utilidade de reuso, como redução de código neste arquivo(+500 linhas).

Os componentes de input possuem sua própria lógica quanto a validação e submissão de dados, mas <br />
com algumas intervenções pelo formulário(pai), quando necessário.
<br />

## Desenvolvimento e Aviso

O planejamento <b>se restringe a sua proposta de cálculos</b>, com funções massivamente testadas.

O uso de apenas 2 hooks foi <b>condição opcional</b> deste 1o repositório React, e todo<br />
desenvolvimento posterior ao 'core', possui <b>caráter experimental de estudo</b> e testes.

O experimento se dá por testar e manter uma <b>lógica inversa de renderização</b>, onde <br />
o useRef se destina às renderizações, e o useState à persistência de dados.

Em prol do capricho de animações, renderizações sem estado, estudo de re-renders e etc,<br />
este experimento trouxe resultados tanto positivos como negativos, além dos conflitantes!

<b> Portanto, abstraia resultados interessantes e seu custo, sem seguir o código como um exemplo!</b>

Renderizações simples com useState, condicionais e sem animação, reduziriam código em mais da metade.
