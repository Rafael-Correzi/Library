const table = document.querySelector(".livros");
const lib = [];
const tr = [];
const td = [];
let livro;

const form = document.querySelector("#form-livro");

function Book(titulo, autor, paginas, lido) {
  this.titulo = titulo;
  this.autor = autor;
  this.paginas = paginas;
  this.lido = lido ? "Lido" : "Não lido";
}

Book.prototype.addBookToLib = function (){
  lib.push(this);
  console.log(this);
}

function traverseLib(tamanho = 0) {
  //O parâmetro tamanho existe para quando a função for chamada no envio do formulário
  for (i = tamanho; i < lib.length; i++){
    tr[i] = document.createElement("tr");
    table.appendChild(tr[i]);
    for (j = 0; j < 4; j++) {
      //Porque cada livro tem quatro atributos
      td[j] = document.createElement("td");
      tr[i].appendChild(td[j]);
    }
    td[0].textContent = lib[i].titulo;
    td[1].textContent = lib[i].autor;
    td[2].textContent = lib[i].paginas;
    td[3].textContent = lib[i].lido;
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

traverseLib();
