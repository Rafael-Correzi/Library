const lib = [];
const row = [];
const div = [];
const p = [];
const a1 = [];
const a2 = [];
const buttonR = [];
const buttonLido = [];
const span = [];
const tempP = [];

const estante = document.querySelector(".estante");
const mostrarForm = document.querySelector("#mostrar");
const form = document.querySelector("#form-livro");
const tituloInfo = document.querySelector("#titulo-info");
const autorInfo = document.querySelector("#autor-info");
const paginasInfo = document.querySelector("#paginas-info");
const lidoInfo = document.querySelector("#lido-info");

let contadorLinha = 0;
let livro;
let corR;
let corG;
let corB;

for (i = 0; i < 8; i++) {
  tempP[i] = document.createElement("p");
  tempP[i].textContent = "";
}

tituloInfo.appendChild(tempP[0]);
autorInfo.appendChild(tempP[1]);
paginasInfo.appendChild(tempP[2]);
lidoInfo.appendChild(tempP[3]);
tituloInfo.appendChild(tempP[4]);
autorInfo.appendChild(tempP[5]);
paginasInfo.appendChild(tempP[6]);
lidoInfo.appendChild(tempP[7]);

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
    adicionarLinha(i);
    div[i] = document.createElement("div");
    div[i].setAttribute("class", "livros");
    a1[i] = document.createElement("a");
    a1[i].setAttribute("alt", "Remover");
    
    a2[i] = document.createElement("a");
    a2[i].setAttribute("alt", "Leitura");
    buttonR[i] = document.createElement("img");
    buttonLido[i] = document.createElement("img");
    buttonR[i].setAttribute("src", "svgs/cross-svgrepo-com (1).svg");
    buttonR[i].setAttribute("title", "Remover");
    buttonR[i].classList.add("esconder");
    buttonLido[i].classList.add("esconder");
    row[contadorLinha - 1].appendChild(div[i]);
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
    p[i].forEach((e) => {
      if (e.textContent.length > 15) {
        e.style.fontSize = `${(1 / e.textContent.length)* 260}px`;
      }
      else e.style.fontSize = "18px";
    });
    lib[i].lido 
    ? 
    (buttonLido[i].setAttribute("src", "svgs/eye-slash-svgrepo-com.svg"), buttonLido[i].setAttribute("title", "Trocar para não lido"))
    :
    (buttonLido[i].setAttribute("src", "svgs/eye-svgrepo-com.svg"), buttonLido[i].setAttribute("title", "Trocar para lido"));
    div[i].appendChild(buttonLido[i]);
    div[i].appendChild(a1[i]);
    div[i].appendChild(a2[i]);
    a1[i].appendChild(buttonR[i]);
    a2[i].appendChild(buttonLido[i]);
    aplicarCor(i);
    trocarEstado(i);
    removerLivros(i);
    virarLivros(i);
    mostrarInfo(i);
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
const theLordOfTheRings = new Book("The Lord of the Rings", "J.R.R. Tolkien", 1077, 0);
const theSilmarillion = new Book("The Silmarillion", "J.R.R. Tolkien", 365, 0);
theHobbit.addBookToLib();
theLordOfTheRings.addBookToLib();
theSilmarillion.addBookToLib();

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
    lib[indice].lido 
    ? 
    (buttonLido[indice].setAttribute("src", "svgs/eye-slash-svgrepo-com.svg"), buttonLido[indice].setAttribute("title", "Trocar para não lido"))
    :
    (buttonLido[indice].setAttribute("src", "svgs/eye-svgrepo-com.svg"), buttonLido[indice].setAttribute("title", "Trocar para lido"));
  });
}

function adicionarCor() {
  corR = Math.floor(Math.random()* (170 - 90) + 90);
  corG = Math.floor(Math.random()* (120 - 65) + 65);
  corB = Math.floor(Math.random() * (70 - 30) + 30);
}

function aplicarCor(indice) {
  div[indice].style.backgroundColor = `rgb(${corR},${corG},${corB})`;
  console.log(`rgb(${corR},${corG},${corB})`  );
  div[indice].style.borderColor = `rgb(${corR-50},${corG-15},${corB})`;
  p[indice].forEach((e) => e.style.color = `rgb(${corR-50},${corG-15},${corB})`); 
}

function virarLivros(indice) {
  div[indice].addEventListener("mouseover", () => {
    div[indice].classList.add("aumentar");
    div[indice].classList.remove("diminuir");
    buttonR[indice].classList.remove("esconder");
    buttonR[indice].classList.add("botao");

    buttonLido[indice].classList.remove("esconder");
    buttonLido[indice].classList.add("botao-lido");
    p[indice].forEach((e) => {
      e.classList.add("info");
    })
  });  
   
  div[indice].addEventListener("mouseout", () => {
    div[indice].classList.add("diminuir");
    div[indice].classList.remove("aumentar");
    buttonR[indice].classList.remove("botao");
    buttonR[indice].classList.add("esconder");

    buttonLido[indice].classList.remove("botao-lido");
    buttonLido[indice].classList.add("esconder");
    p[indice].forEach((e) => {
      e.classList.remove("info");
    })
  });
}

function adicionarLinha(indice) {
  if (indice % 8 === 0) {
    row[contadorLinha] = document.createElement("div");
    row[contadorLinha].classList.add("row");
    estante.appendChild(row[contadorLinha]);
    adicionarCor();
    contadorLinha++;

  }
}

function mostrarInfo(indice) {
  div[indice].addEventListener("mouseover", () => {
    if (tempP[4].textContent === "")
      adicionarNodo(indice); 
  })

  div[indice].addEventListener("mouseleave", () => {
      removerNodo();
  })

  div[indice].addEventListener("click", () => {
      
    if (tempP[4].textContent === "") {
      removerNodo();
      adicionarNodo(indice, 4);
      div[indice].classList.add("outline");
      }
    else {
      removerNodo(4);
      adicionarNodo(indice);
      div.forEach((e) => e.classList.remove("outline"));
      }
    
  })

  
}

function adicionarNodo(indice, n = 0) {
    tempP[0 + n].textContent = (lib[indice].titulo);
    tempP[1 + n].textContent = (lib[indice].autor);
    tempP[2 + n].textContent = (lib[indice].paginas);
    tempP[3 + n].textContent = (lib[indice].lido ? "Lido" : "Não lido");

}

function removerNodo(n = 0) {
  tempP[0 + n].textContent = "";
  tempP[1 + n].textContent = "";
  tempP[2 + n].textContent = "";
  tempP[3 + n].textContent = "";
}

traverseLib();


