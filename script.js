const estante = document.querySelector(".estante");
const lib = [];
const div = [];
const p = [];
const buttonR = [];
const buttonLido = [];


let livro;
let corR;
let corG;
let corB;

const mostrarForm = document.querySelector("#mostrar");
const form = document.querySelector("#form-livro");

form.style.display = "none";
 
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
    div[i] = document.createElement("div");
    div[i].setAttribute("class", "livros");
    buttonR[i] = document.createElement("button");
    buttonLido[i] = document.createElement("button");
    buttonR[i].setAttribute("type", "button");
    buttonLido[i].setAttribute("type", "button");
    buttonR[i].textContent = "Remover";
    estante.appendChild(div[i]);
    p[i] = [];
    for (j = 0; j < 4; j++) {
      //Porque cada livro tem quatro atributos
      p[i][j] = document.createElement("p");
      console.log(div[i]);
      console.log(p[i][j]);
      div[i].appendChild((p[i][j]));
    }
    p[i][0].textContent = lib[i].titulo;
    p[i][1].textContent = lib[i].autor;
    p[i][2].textContent = lib[i].paginas + " páginas";
    p[i][3].textContent = lib[i].lido ? "Lido" : "Não lido";
    buttonLido[i].textContent = lib[i].lido ? "Trocar para não lido" : "Trocar para lido";
    div[i].appendChild(buttonLido[i]);
    div[i].appendChild(buttonR[i]);
    removerLivros(i);
    trocarEstado(i);
    adicionarCor(i);
  }
}

mostrarForm.addEventListener("click", () => {
  form.style.display == "none" ? (form.style.display = "block", mostrarForm.innerText = "Esconder formulário") : (form.style.display = "none", mostrarForm.innerText = "Adicionar livros");
})

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
    p.splice(indice, 1);
    div[indice].remove();
    div.splice(indice, 1);
  })
}

function trocarEstado(indice) {
  buttonLido[indice].addEventListener("click", () => {
    lib[indice].lido = lib[indice].lido ? 0 : 1;
    p[indice][3].textContent = lib[indice].lido ? "Lido" : "Não lido";
  })
}

function adicionarCor(indice) {
  corR = Math.floor(Math.random()*256 + 120);
  corG = Math.floor(Math.random()*256 + 120);
  corB = Math.floor(Math.random()*256 + 120);
  div[indice].style.backgroundColor = `rgb(${corR},${corG},${corB})`;
  console.log(`rgb(${corR},${corG},${corB})`  );
  div[indice].style.borderColor = `rgb(${255-corR},${255-corG},${255-corB})`;
  div[indice].style.color = `rgb(${255-corR},${255-corG},${255-corB})`;
}





traverseLib();


