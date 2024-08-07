// Function to calculate the gamma function using the Lanczos approximation
export function gamma(z) {
    const p = [
      676.5203681218851,
      -1259.1392167224028,
      771.32342877765313,
      -176.61502916214059,
      12.507343278686905,
      -0.13857109526572012,
      9.9843695780195716e-6,
      1.5056327351493116e-7
    ];
    const g = 7;
    if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
    
    z -= 1;
    let x = 0.99999999999980993;
    for (let i = 0; i < p.length; i++) {
      x += p[i] / (z + i + 1);
    }
    const t = z + g + 0.5;
    return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
  }
  
  // Function to calculate the PDF of the Gamma distribution
export function gammaDistributionPDF(x, k, theta) {
    if (x < 0) return 0; // PDF is 0 for x < 0
    return Math.pow(x, k - 1) * Math.exp(-x / theta) / (Math.pow(theta, k) * gamma(k));
  }