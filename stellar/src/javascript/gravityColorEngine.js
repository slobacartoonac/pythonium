import { Renderer } from 'my_lib/drawers/render.js'
import { ShapeCircle } from 'my_lib/shapes/circle.js'
import { Physics} from 'my_lib/physics/physics.js'

function GravityColorEngine(manager){
	this.manager = manager
}

GravityColorEngine.prototype.compute=function(view)
{
	const points = this.manager.getEnities(Renderer).map(
		(elem)=>{
			var renderers = this.manager.get(Renderer, elem)[0]
            var mass = this.manager.get(Physics, elem)[0].mass
			var volume = Math.pow(this.manager.get(ShapeCircle, elem)[0].radius, 3) * Math.PI
            var dencity = mass / volume * 10 * Math.PI
            if(dencity < 1){
                renderers.color = '##00fffb'
            }
            else if( dencity < 2){
                renderers.color = '#001eff'
            }
            else if( dencity < 3){
                renderers.color = '#995500'
            }
            else if( dencity < 4){
                renderers.color = '#ff8c00'
            }
            else {
                renderers.color = '#fffb00'
            }
		}
	)

}
export { GravityColorEngine }
