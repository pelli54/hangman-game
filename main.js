//colleccion de palabras 
let words = [
  "avion","barco","zanahoria","martillo","hormiga","raton","amanecer","pajaro","guitarra","tiburon","armadillo","tijera","burbuja","pintura","flores","linterna","fotografia","edificio"
]

//GLOBAL VARIABLES
let letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",]
let lettersDisable=letters.map(a => (true))
let parts = ["soga","head", "body", "arm1", "arm2", "leg1", "leg2"]
let adivinadas =[]
let word = []
let countFails = 0

function genWord(){
  word = words.sort(() => 0.5-Math.random())[0].toUpperCase().split("")
  adivinadas=Array(word.length).fill(" ")
}
genWord()

//DOM ELEMENTS
let draw = document.querySelector("#draw")
let tileCont = document.querySelector("#tileCont")
let lettesCont = document.querySelector("#letterCont")
let end = document.querySelector(".endModal")

end.onclick= () =>{
  end.classList.toggle("d-none")
  lettersDisable=letters.map(a => (true))
  countFails=0
  cleanDraw()
  genWord()
  main()
}

function handleClick(e){
  //element clicked
  let ele = e.srcElement

  //turn disable the letter clicked
  letters.forEach((el,i)=>{
    if(ele.id==lettesCont.children[i].id){
      lettersDisable[i]=false
    }
  })
  renderLetters()

  //evalua si la letra pulsada esta en word
  if(isInWord(ele.id)){
    word.forEach((el,i)=>{
      if(el==ele.id){
        adivinadas[i]=el
      }
    })
    renderTile(adivinadas)
  }else {
    countFails++
    renderDraw()
  }

  if(isWin()){
    end.classList.toggle("d-none")
    end.children[0].innerText="You Win"
  }else if(isLose()){
    end.classList.toggle("d-none")
    end.children[0].innerText="You Lose"
  }
}

function isInWord(str){
  return word.includes(str)
}

function isWin(){
  return !adivinadas.includes(" ")
}


function isLose(){
  return countFails==7
}

//give the draw in the initial state
function cleanDraw(){
  draw.innerHTML=`
    <div class="base"></div>
    <div class="palo1"></div>
    <div class="palo2"></div>
    <div class="palo3"></div>
    <div class="suport1"></div>
    <div class="suport2"></div>
    `
}

//RENDERS
function renderTile(){
  tileCont.innerHTML=""
  adivinadas.forEach(el => {
    let tile = document.createElement("div")
    tile.className="letterTile"
    tile.innerText=el
    tileCont.append(tile)
  });
}

function renderLetters(){
  lettesCont.innerHTML=""
  letters.forEach((el,i) => {
    let lett = document.createElement("div")
    lett.className=lettersDisable[i]?"letter":"letter disable"
    lett.innerText=el
    lett.id=el
    lett.onclick=lettersDisable[i]?handleClick:null
    lettesCont.append(lett)
  });
}

function renderDraw(){
  cleanDraw()
  for (let i = 0; i < countFails; i++) {
    let part = document.createElement("div")
    part.className=parts[i]
    draw.append(part)   
  }
}

//START GAME
function main(){
  renderTile(adivinadas)
  renderLetters()
  renderDraw()
}

main()