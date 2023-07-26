export default function getClipper(min, max, step) {
  return (val) => {
    const clippedValue = Math.round(val / step) * step;
    const fixed = Math.max(Math.log10(1 / step), 0);
    const fixedValue = clippedValue.toFixed(fixed); // fix floating point errors
    return Math.min(max, Math.max(min, parseFloat(fixedValue)));
  }
}
