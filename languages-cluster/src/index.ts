import { createGame } from "./enterry"
const canvas = document.getElementById('phy_canvas') as  HTMLCanvasElement

let ginit = ()=>{}
function resolveResult(timeLeft: number){
	setTimeout(ginit, 3000)
	//alert(timeLeft)
}

let {work, adjustWindowSize} = createGame(canvas, resolveResult)
window.addEventListener('resize',()=>{
	canvas.width = window.innerWidth - 10;
	canvas.height = window.innerHeight - 10;
	adjustWindowSize()
} );
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;
adjustWindowSize();
let render = ()=>{
	work()
	setTimeout(render, 0)
}
render()

