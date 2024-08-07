export function gauss(x, mu = 0, sigma = 1) {
    const factor = 1 / (sigma * Math.sqrt(2 * Math.PI));
    const exponent = -((x - mu) ** 2) / (2 * sigma ** 2);
    return factor * Math.exp(exponent);
}