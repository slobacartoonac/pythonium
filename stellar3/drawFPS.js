const drawFPS = ((ctx)=>{
    var time = (new Date()).getTime()
    var i=0
    var fps=0
    return ()=>{
      i++
      var newTime = (new Date()).getTime()
      var deltaT = newTime - time
      time = newTime
      ctx.font = "14px Verdana";
      ctx.fillStyle = "red";
      if(!(i%30)) fps=(Math.round(10000/deltaT)/10) + " fps"
      ctx.fillText(fps, 10, 24);
    }
  })

export default drawFPS