# Time is Money

Um Projeto <b>EM FASE DE DESENVOLVIMENTO</b> com <b>ênfase em cálculos de data e finanças</b>.

Basicamente, recebe valores de input de datas e finanças sazonais de gastos e lucros.

Efetua todos os cálculos de abatimento financeiro e temporal para uma data ou valor desejado.

Aproveita para exibir valores obtidos em paralelo como curiosidades, tais como dias de vida, etc...
<br />

## Aplicação e Conteúdo

Utiliza o framework NEXT.js para se diferenciar de projetos anteriores, não sendo requisito necessário.

Realiza renderização primária entre texto de apresentação, e o formulário, com uma única página.
<br />

O formulário CpFrmTimeMoney é o controlador principal sendo responsável pela importação, renderização,

e comunicação de/entre demais componentes e hook customizado, com passagem/obtenção de métodos e valores.

Suas funções tratam erros e lógica de renderização, utilizando apenas o hook useRef para isso.
<br />

O hook customizado 'useTimeMoney' é responsável pelas lógicas de cálculo, além da persistência de

seus valores, utilizando apenas o hook useState para isso(experimental).

Suas funções contemplam cálculos específicos, enquanto as funções mais genéricas são desmembradas em mais

arquivos e importadas, visando tanto a utilidade de reuso, como redução de código neste arquivo(+500 linhas).


Os componentes de input possuem sua própria lógica quanto a validação e submissão de dados.
<br />

## Desenvolvimento e Aviso

O <b>planejamento prévio se restringiu a sua proposta de cálculos</b>, com funções massivamente testadas.

Todo o resto, principalmente renderizações, possuem caráter experimental, de testes e estudo, apenas com a

premissa incondicional ao uso de somente 2 hooks, buscando 'simplicidade' e evolução progressiva de projetos.


O <b>experimento</b> se dá por testar e manter uma <b>lógica inversa de renderização</b>, onde o useRef se

destina às renderizações, e o useState à persistência de dados. Isso em prol do capricho de animações e da

mágica em renderizar telas sem alterações de estado, ou disparo de Re-renders.


### Conclusão do experimento

Com resultados satisfatórios de início, mas inversamente proporcionais ao aumento de renders/efeitos, cabe

dizer que isso SEMPRE aumentará a verbosidade do código, por manipular diretamente o DOM com JS puro.


Mesmo que ciente disto, da indicação para fins contrários ao uso, e de fugir um pouco aos princípios do React,

é um experimento possível, com algumas vantagens, em certos cenários, mas com desvantagens não tão previsíveis.


A conclusão mais sensata, é de que não se deve utilizar esta técnica de forma repetida, suscetiva, persistida,

e/ou principalmente conjunta com useState, pela previsível verbosidade e dependência de renderização ao State.


Renderizações condicionais, sem animação/temporização (por vezes inevitáveis), além de compor os princípios de

componentização, possivelmente reduziriam o código, tempo e prevenções de erro em mais da metade.
