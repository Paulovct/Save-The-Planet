let diryJ,dirxJ,jog,velj,pjx,pjy
let velt
let tamTelaW,tamTelaH
let jogo,vidaPlaneta
let frames
let contBombas,painelContBombas,velBomba,tmpCriaBombas
let bombasTotal
let ie,isom



const teclaDw=()=>{
	let tecla=event.keyCode;
	if(tecla==38){//cima
		diryj=-1
	}else if(tecla==40){//baix
		diryj=1
	}
	if(tecla==37){//esquerda
		dirxj=-1
	}else if(tecla==39){//direita
		dirxj=1
	}
	if(tecla==32){//espaço
		atira(pjx +17,pjy)
	}
}

const teclaUp=()=>{
	let tecla=event.keyCode;
	if((tecla==38)||(tecla==40)){//cima
		diryj=0
	}
	if((tecla==37)||(tecla==39)){//esquerda
		dirxj=0
	}
}

const criaBombas=()=>{
	if(jogo){
		let y=-80
		let x=Math.random()*tamTelaW
		let bomba=document.createElement("div")
		bomba.setAttribute("class","bomba")
		bomba.setAttribute("style",`top:${y}px;left:${x}px;`)
		document.body.appendChild(bomba)
		contBombas-=1
	}
}

const controlaBomba=()=>{
	bombasTotal=[...document.getElementsByClassName("bomba")]
	bombasTotal.map((e)=>{
		let posBomba=e.offsetTop
		posBomba+=velBomba
		e.style.top=posBomba+"px"
		if(posBomba>=tamTelaH +40){
			vidaPlaneta-=30
			criaExplosao(2,e.offsetLeft,e.offsetTop)
			e.remove()
		}
	})
}


const atira=(x,y)=>{
	const t=document.createElement("div")
	t.setAttribute("class","tiroJog" )
	t.setAttribute("style",`top:${y}px;left:${x}px;` )
	document.body.appendChild(t)
}


const controleTiros=()=>{
	const tiro=[...document.getElementsByClassName('tiroJog')]
	tiro.map((e)=>{
		let pt=e.offsetTop
		pt-=velt
		e.style.top=pt+"px"
		colisaoTiroBomba(e)
		if (pt<=0)e.remove()
})
}
const colisaoTiroBomba=(tiro)=>{
	let tam=bombasTotal.length;
	for(var i=0;i<tam;i++){
		if(bombasTotal[i]){
			if(
				(
					(tiro.offsetTop<=(bombasTotal[i].offsetTop+40))&&//parte de cime do tiro e baixo da bomba
					((tiro.offsetTop+6)>=(bombasTotal[i].offsetTop))//paate de cima do tiro
				)
				&&
				(
					(tiro.offsetLeft<=(bombasTotal[i].offsetLeft+24))&&
					((tiro.offsetLeft+6)>=(bombasTotal[i].offsetLeft))
				)
	        ){
	        	criaExplosao(1,bombasTotal[i].offsetLeft-115,bombasTotal[i].offsetTop-80)

				bombasTotal[i].remove()
			    tiro.remove()
			}
		}
	}
}


const criaExplosao=(tipo,x,y)=>{
	if(document.getElementById("explosao"+(ie-1)))  {
		
		document.getElementById("explosao"+(ie-1)).remove()
	}


	let explosao=document.createElement("div")
	let img=document.createElement("img")
	let audio=document.createElement("audio")

	//atributos div
	let att1=document.createAttribute("class")
	let att2=document.createAttribute("style")
	let att3=document.createAttribute("id")
	//atrubuto imagem
	let att4=document.createAttribute("src")
	//atributo audio
	let att5=document.createAttribute("src")
	let att6=document.createAttribute("id")


	att3.value="explosao"+ie

	if(tipo==1){
		att1.value="explosaoAr"
		att2.value=`top:${y}px;left:${x}px;`
		att4.value="./img/bomb-nuksan.gif?"+new Date()
	}else{
		att1.value="explosaoChao"
		att2.value=`top:${(tamTelaH-80)}px;left:${(x-70)}px;`
		att4.value="./img/vyond-vyond-effect.gif?"+new Date()
	}
	//att5.value="som"
	//att6.value="som"+isom

	explosao.setAttributeNode(att1)
	explosao.setAttributeNode(att2)
	explosao.setAttributeNode(att3)
	img.setAttributeNode(att4)
	explosao.setAttributeNode(att1)

	explosao.appendChild(img)

	document.body.appendChild(explosao)
	

	ie++;
	//isom++;
}


const controlaJogador=()=>{
	pjy+=diryj*velj
	pjx+=dirxj*velj
	jog.style.top=pjy+"px"
	jog.style.left=pjx+"px"

}

const gerenciaGame=()=>{
	
	barraPlaneta.style.width=vidaPlaneta+"px"

	if(contBombas<=0){
		jogo=false
		clearInterval(tmpCriaBombas)
		document.getElementById("btnJogar").style.display = 'block'
	}else if(vidaPlaneta<=0){
		jogo=false
		clearInterval(tmpCriaBombas)
		document.getElementById("telaMsg").style.display = 'block'
	}
}

const gameLoop=()=>{
	if(jogo){
		//funcçoes de controle
	controlaJogador()
	controleTiros()
	controlaBomba()
	}
	gerenciaGame()

	frames=requestAnimationFrame(gameLoop)
}





const inicia=()=>{
	bombasTotal=[...document.getElementsByClassName("bomba")]
	let chao=[...document.getElementsByClassName("explosaoChao")]
	let ar=[...document.getElementsByClassName("explosaoAr")]
	bombasTotal.map((e)=>{
		e.remove()
	})
	chao.map((e)=>{
		e.remove()
	})
	ar.map((e)=>{
		e.remove()
	})
	cancelAnimationFrame(frames)
	jogo=true
	document.getElementById("telaMsg").style.display = 'none'
	document.getElementById("inicia").style.display = 'none'
	document.getElementById("btnJogar").style.display = 'none'
	//tela
	tamTelaH=window.innerHeight
	tamTelaW=window.innerWidth

	//resetar as velocidades
	velBomba=3
	velt=5
	velj=5


	//init jogador
	dirxj=diryj=0
	pjx=tamTelaW/2
	pjy=tamTelaH/2

	jog=document.getElementById('naveJog')

	jog.style.top=pjy+"px"
	jog.style.left=pjx+"px"


	//controle de I
	clearInterval(tmpCriaBombas)
	contBombas=150
	tmpCriaBombas=setInterval(criaBombas,1700)

	//planeta
	vidaPlaneta=300
	const barraPlaneta=document.getElementById("barraPlaneta")
	barraPlaneta.style.width=vidaPlaneta+"px"


	//controleExplosao
	ie=0
	isom=0


	gameLoop()
	
}


document.addEventListener("keydown",teclaDw)
document.addEventListener("keyup",teclaUp)
