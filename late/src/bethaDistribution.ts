import { gamma } from "./gamaDistribution";

  // Function to calculate the beta function
  function betaFunc(alpha, beta) {
    return gamma(alpha) * gamma(beta) / gamma(alpha + beta);
  }
  
  // Function to calculate the PDF of the Beta distribution
  export function betaDistributionPDF(x, alpha, beta) {
    if (x < 0 || x > 1) return 0; // PDF is 0 outside the interval [0, 1]
    return Math.pow(x, alpha - 1) * Math.pow(1 - x, beta - 1) / betaFunc(alpha, beta);
  }