export default function getScale(domain, range) {
  const slope = (range[1] - range[0]) / (domain[1] - domain[0]);
  const intercept = range[0] - slope * domain[0];

  function scale(val) {
    return slope * val + intercept;
  }

  scale.invert = function(val) {
    return (val - intercept) / slope;
  }

  return scale;
}
