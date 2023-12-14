export function getQuadraticText(a: number,h: number,k: number){
    let fa=+parseFloat(""+a).toFixed(1)
    let fh=+parseFloat(""+h).toFixed(1)
    let fk=+parseFloat(""+k).toFixed(1)
    let a_part = fa == 1?"":""+fa
    let k_part = fk == 0?"":`${fk>0?' +':' -'} ${Math.abs(fk)}`
    let h_part = a_part || k_part || fh?
    `(x ${fh<0?'+':'-'} ${Math.abs(fh)})²`:
    'x²'
    return "y = "+ a_part+h_part+k_part
}

export function getFunctionText(funcName: string, a: number, b: number, h: number, k: number) {
    let fa = +parseFloat(""+a).toFixed(1);
    let fb = +parseFloat(""+b).toFixed(1);
    let fh = +parseFloat(""+h).toFixed(1);
    let fk = +parseFloat(""+k).toFixed(1);

    let amplitude = fa == 1 ? "" : ""+fa;
    let frequency = fb == 1 ? "x" : `${fb}x`;
    let phase = fh === 0 ? "" : ` ${fh < 0 ? '+' : '-'} ${Math.abs(fh)}`;
    let verticalShift = fk === 0 ? "" : ` ${fk > 0 ? '+' : '-'} ${Math.abs(fk)}`;

    if (funcName[0] === "^") {
        return `y = ${amplitude}(${frequency}${phase})^${funcName} ${verticalShift}`;
    } else {
        return `y = ${amplitude}${funcName}(${frequency}${phase})${verticalShift}`;
    }
}