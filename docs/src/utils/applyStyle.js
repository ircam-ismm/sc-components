const $style = document.createElement('style');
$style.type = 'text/css';
document.head.appendChild($style);

export default function applyStyle(value) {
  $style.innerText = value;
}
