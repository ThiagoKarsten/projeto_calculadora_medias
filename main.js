var form = document.getElementById('form-atividade'); /* Varivel */
var linhas = ''; /* Tornando essa varivael global colocando ela aqui em cima para que os valores possam ser add sem apagar o anterior"*/
var imgAprovado = '<img src="./images/aprovado.png" alt="Emoji celebrando" />'; /* Varivael da imagem do emoji aprovado */ 
var imgReprovado = '<img src="./images/reprovado.png" alt="Emoji descepcionado" />'; /* Varivael da imagem do emoji reprovado */ 
var atividades = []; /* Array vazio */
var notas = [];
var spanAprovado = '<span class="resultado aprovado">Aprovado</span>'
var spanReprovado = '<span class="resultado reprovado">Reprovado</span>'
var notaMinima = parseFloat(prompt("Digite a nota minima:")) /* Quando do usuario abrir a pagina vai aparecer essa mensagem para ele digitar a nota minima */

form.addEventListener('submit', function(e){ /* Adicionando o que irá acontecer quando clicar no botão adicionar */
    e.preventDefault(); /* Tirando a atulização da pagina após clicar no botão */

    adicionaLinha(); /* chamando as funções para que elas funcionem apos clicar no botão */
    atulizaTabela();
    atualizaMediaFinal();
});

function adicionaLinha(){
    var inputNomeAtividade = document.getElementById('nome-atividade');
    var inputNotaAtividade = document.getElementById('nota-atividade');

    if(atividades.includes(inputNomeAtividade.value)){ /* Se o nome da atividade já foi colocado, ou seja se ele for duplicado */
    alert(`A atividade ${inputNomeAtividade.value} já foi inserida`)

    }else{
        atividades.push(inputNomeAtividade.value); /* Aplicando os valor de "inputNomeAtividade" dentro do Array */
    notas.push(parseFloat(inputNotaAtividade.value)); /* Aplicando valor de "inputNotaAtividade" no Array e o parseFloat para mudar o valor de String para float para calcular*/

    var linha = '<tr>'; /* Adicionando as notas nas linhas da coluna (corpo da tabela) */
    linha = linha + `<td> ${inputNomeAtividade.value} </td>`;
    linha = linha + `<td> ${inputNotaAtividade.value} </td>`;
    linha = linha + `<td> ${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado} </td>`; /* Aplicando o if com "?" e else com ":" */
    linha = linha + `</tr>`; /* Fechando a tag tr */

    linhas += linha /* Mesma coisa que "linhas = linhas + linha" */
    }

    form.reset();
}

function atulizaTabela(){
    var corpoTabela = document.querySelector('tbody'); /* Adicionando o conteúdo de "<tr>" dentro do corpo da tabela */
    corpoTabela.innerHTML = linhas; /* Inserindo conteudo dentro de uma tag */
}

function atualizaMediaFinal(){
    var mediaFinal = calculaMediaFinal(); /* Chamando a função  "calculaMediaFinal" */

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2);/* toFixed limita as casas decimais apos a virgula */
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado; /* Aplicando o if com "?" e else com ":", puxando as variveis span la do scopo global */
    
}

function calculaMediaFinal(){
    var somaDasNotas = 0;

    for(var i = 0; i < notas.length; i++){
        somaDasNotas += notas[i]; /* Somando as notas para tirar a media final */
    }

    return somaDasNotas / notas.length /* Fazendo a media as notas  */
}