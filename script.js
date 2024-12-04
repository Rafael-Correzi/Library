const table = document.querySelector(".livros");
const lib = [];
const tr = [];
const td = [];

function Book(titulo, autor, paginas, lido) {
  this.titulo = titulo;
  this.autor = autor;
  this.paginas = paginas;
  this.lido = lido ? "Lido" : "Ainda não";
}

Book.prototype.addBookToLib = function (){
  lib.push(this);
}

function traverseLib() {
  for (i = 0; i < lib.length; i++){
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

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, 0);
theHobbit.addBookToLib();

traverseLib();
