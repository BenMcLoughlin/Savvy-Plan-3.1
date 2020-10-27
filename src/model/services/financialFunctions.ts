export const payment  = function(rate, nperiod, pv, fv, type) {
  if (!fv) fv = 0;
  if (!type) type = 0;

  if (rate === 0) return -(pv + fv)/nperiod;

  var pvif = Math.pow(1 + rate, nperiod);
  var pmt = rate / (pvif - 1) * -(pv * pvif + fv);

  if (type === 1) {
      pmt /= (1 + rate);
  };

  return Math.round(pmt)
}