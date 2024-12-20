const table = document.querySelector(".livros");
const lib = [];
const tr = [];
const td = [];
const buttonR = [];
const buttonLido = [];


let livro;

const form = document.querySelector("#form-livro");

function Book(titulo, autor, paginas, lido) {
  this.titulo = titulo;
  this.autor = autor;
  this.paginas = paginas;
  this.lido = lido;
}

Book.prototype.addBookToLib = function (){
  lib.push(this);
  console.log(this);
}

function traverseLib(tamanho = 0) {
  //O parâmetro tamanho existe para quando a função for chamada no envio do formulário
  for (i = tamanho; i < lib.length; i++){
    tr[i] = document.createElement("tr");
    buttonR[i] = document.createElement("button");
    buttonLido[i] = document.createElement("button");
    buttonR[i].setAttribute("type", "button");
    buttonLido[i].setAttribute("type", "button");
    buttonR[i].textContent = "Remover";
    table.appendChild(tr[i]);
    td[i] = [];
    for (j = 0; j < 4; j++) {
      //Porque cada livro tem quatro atributos
      td[i][j] = document.createElement("td");
      console.log(tr[i]);
      console.log(td[i][j]);
      tr[i].appendChild((td[i][j]));
    }
    td[i][0].textContent = lib[i].titulo;
    td[i][1].textContent = lib[i].autor;
    td[i][2].textContent = lib[i].paginas;
    td[i][3].textContent = lib[i].lido ? "Lido" : "Não lido";
    buttonLido[i].textContent = lib[i].lido ? "Trocar para não lido" : "Trocar para lido";
    tr[i].appendChild(buttonLido[i]);
    tr[i].appendChild(buttonR[i]);
    removerLivros(i);
    trocarEstado(i);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  livro = new Book(titulo.value,
                   autor.value,
                   paginas.value,
                   +document.querySelector('input[name="estado"]:checked').value);
  livro.addBookToLib();
  traverseLib(lib.length-1)
  //Porque só precisamos que a função traverseLib adicione uma única nova linha à tabela;
} )

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, 0);
theHobbit.addBookToLib();

function removerLivros(indice) {
  buttonR[indice].addEventListener("click", () => {
    lib.splice(indice, 1);
    buttonR.splice(indice, 1);
    td.splice(indice, 1);
    tr[indice].remove();
    tr.splice(indice, 1);
  })
}

function trocarEstado(indice) {
  buttonLido[indice].addEventListener("click", () => {
    lib[indice].lido = lib[indice].lido ? 0 : 1;
    td[indice][3].textContent = lib[indice].lido ? "Lido" : "Não lido";
  })
}


traverseLib();


