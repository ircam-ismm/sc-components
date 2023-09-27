import { html } from 'lit';
// cf. https://www.svgrepo.com/
const icons = {};

icons.question = html`
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
  <g>
    <path fill="white" d="M500,9.9c270.1,0,490.5,220.6,490,490.3c-0.5,270.7-220.6,490.6-490.3,489.9C229.2,989.4,10.4,770.5,10,500.1C9.6,230.3,229.9,9.9,500,9.9z M943.7,499.9c0-244.4-198-443-443.5-443.5C255.5,55.9,56.6,254.5,56.3,499.9c-0.3,244.4,198.3,442.9,443.4,443.6C743.8,944.2,943.8,744.5,943.7,499.9z M527.3,658.3c-20.9,0-41.3,0-62.2,0c0-12.4-0.7-24.6,0.1-36.7c1.6-24.4,7.3-47.9,20-69.2c9.9-16.6,22.6-30.9,36.7-44c17.5-16.3,35.1-32.4,52.3-49.1c10.1-9.8,19-20.8,23.7-34.4c11.2-32.7,4-61.8-17.7-87.8c-36.1-43.1-96.4-44.6-133.4-23c-23.3,13.6-37.3,34.4-45.4,59.5c-3.7,11.2-6.2,22.8-9.5,35.1c-21.5-2.5-43.5-5.2-66.3-7.9c0.9-5.7,1.5-11,2.5-16.3c5.7-29.6,15.9-57.2,35.3-80.8c23.5-28.8,54.2-45.6,90.3-52.5c37.7-7.2,75.3-6.5,112,5.5c46.9,15.2,81.6,45,97.4,92.4c15.1,45.5,7.7,88.5-22.1,127c-18.9,24.4-42.4,44.2-64.5,65.4c-9.7,9.3-19.6,18.7-28,29.2c-12.5,15.5-17.3,34.3-18.8,53.9C528.6,635.5,528.1,646.6,527.3,658.3z M461,790c0-24.6,0-48.9,0-73.7c24.6,0,49,0,73.7,0c0,24.5,0,48.9,0,73.7C510.3,790,485.8,790,461,790z" />
  </g>
</svg>`
;

icons.info = html`
<svg viewbox="0 0 23.7 23.7" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"
>
  <path fill="#fff" d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm.5 17h-1v-9h1v9zm-.5-12c.466 0 .845.378.845.845 0 .466-.379.844-.845.844-.466 0-.845-.378-.845-.844 0-.467.379-.845.845-.845z"/>
</svg>
`;

icons.github = html`
<svg viewbox="0 0 98 98" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#fff"/>
</svg>
`;

icons.burger = html`
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g>
<path d="M3 6H21M3 12H21M3 18H21" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</svg>
`;

icons.gear = html`
<svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"  xml:space="preserve">
  <style type="text/css">
    .st0{fill:#ffffff;}
  </style>
  <g>
    <path class="st0" d="M499.139,318.571l-37.178-5.407c-2.329-0.178-4.336-1.642-5.228-3.8l-12.054-29.086
      c-0.901-2.15-0.526-4.613,1-6.379l22.243-29.88c3.533-4.141,3.301-10.314-0.554-14.168l-17.602-17.594
      c-3.846-3.854-10.029-4.104-14.159-0.553l-29.889,22.233c-1.758,1.518-4.238,1.91-6.38,1.018l-29.094-12.062
      c-2.151-0.883-3.622-2.926-3.81-5.228l-5.389-37.169c-0.428-5.442-4.96-9.635-10.402-9.635h-24.893
      c-5.45,0-9.983,4.193-10.402,9.635l-5.407,37.169c-0.17,2.32-1.642,4.345-3.792,5.228l-29.103,12.062
      c-2.151,0.892-4.613,0.5-6.388-1.018l-29.872-22.233c-4.13-3.542-10.304-3.302-14.167,0.553l-17.594,17.594
      c-3.854,3.854-4.086,10.028-0.554,14.168l22.234,29.888c1.508,1.758,1.91,4.229,1.009,6.371l-12.054,29.086
      c-0.874,2.159-2.908,3.622-5.219,3.81l-37.195,5.398c-5.425,0.429-9.618,4.961-9.618,10.412v24.883
      c0,5.442,4.194,9.993,9.618,10.403l37.195,5.398c2.311,0.188,4.345,1.659,5.219,3.81l12.054,29.086
      c0.901,2.159,0.5,4.63-1.009,6.388l-22.234,29.889c-3.533,4.14-3.301,10.295,0.554,14.168l17.594,17.594
      c3.863,3.854,10.037,4.086,14.167,0.544l29.872-22.243c1.775-1.498,4.237-1.9,6.388-0.998l29.103,12.044
      c2.151,0.902,3.622,2.918,3.802,5.246l5.398,37.169c0.428,5.433,4.952,9.636,10.402,9.636h24.893c5.451,0,9.974-4.203,10.402-9.636
      l5.389-37.169c0.188-2.328,1.659-4.344,3.81-5.246l29.103-12.044c2.142-0.902,4.622-0.5,6.379,0.998l29.881,22.243
      c4.13,3.542,10.314,3.31,14.159-0.544l17.602-17.594c3.864-3.873,4.087-10.028,0.554-14.168l-22.243-29.889
      c-1.499-1.758-1.9-4.229-1-6.388l12.054-29.086c0.892-2.151,2.899-3.622,5.228-3.81l37.178-5.398
      c5.434-0.41,9.627-4.961,9.627-10.403v-24.883C508.766,323.532,504.573,319,499.139,318.571z M379.093,382.328
      c-10.93,10.912-25.445,16.926-40.898,16.926c-15.444,0-29.978-6.014-40.898-16.926c-10.92-10.938-16.943-25.454-16.943-40.907
      c0-15.444,6.022-29.969,16.943-40.89c10.92-10.939,25.454-16.934,40.898-16.934c15.454,0,29.969,5.995,40.898,16.934
      c10.92,10.92,16.934,25.446,16.934,40.89C396.027,356.874,390.014,371.39,379.093,382.328z"/>
    <path class="st0" d="M187.351,252.156c4.032-1.445,6.254-5.746,5.122-9.868l-5.898-28.854c-0.472-1.767,0.072-3.649,1.419-4.88
      l18.263-16.621c1.338-1.222,3.284-1.588,4.97-0.946l27.961,8.466c3.989,1.508,8.485-0.294,10.306-4.166l8.297-17.656
      c1.837-3.881,0.366-8.485-3.346-10.591l-24.339-16.14c-1.58-0.91-2.535-2.632-2.436-4.452l1.16-24.66
      c0.098-1.829,1.186-3.444,2.838-4.194l26.008-13.874c3.898-1.74,5.781-6.218,4.336-10.215l-6.603-18.371
      c-1.454-4.024-5.755-6.254-9.876-5.121l-28.863,5.879c-1.767,0.5-3.632-0.053-4.871-1.41L195.185,56.23
      c-1.24-1.357-1.614-3.265-0.955-4.978l8.468-27.944c1.507-4.006-0.294-8.494-4.175-10.306l-17.648-8.306
      c-3.872-1.821-8.494-0.366-10.608,3.354l-16.131,24.34c-0.902,1.58-2.623,2.533-4.444,2.445l-24.66-1.169
      c-1.82-0.08-3.462-1.205-4.202-2.847L106.974,4.821c-1.758-3.898-6.219-5.782-10.234-4.336L78.379,7.096
      c-4.024,1.446-6.254,5.738-5.112,9.859l5.888,28.872c0.482,1.748-0.062,3.64-1.418,4.862l-18.264,16.63
      c-1.356,1.222-3.274,1.597-4.987,0.955l-27.944-8.476c-3.988-1.516-8.476,0.304-10.305,4.175L7.939,81.622
      c-1.82,3.872-0.366,8.494,3.346,10.599l24.339,16.14c1.588,0.902,2.534,2.615,2.436,4.435l-1.16,24.66
      c-0.071,1.838-1.187,3.444-2.837,4.193L8.055,155.522c-3.9,1.749-5.782,6.219-4.336,10.216l6.611,18.37
      c1.445,4.024,5.746,6.254,9.859,5.131l28.881-5.906c1.749-0.482,3.64,0.071,4.862,1.427l16.612,18.255
      c1.24,1.356,1.598,3.283,0.954,4.987l-8.466,27.944c-1.499,3.997,0.304,8.485,4.175,10.305l17.648,8.297
      c3.881,1.829,8.493,0.357,10.608-3.346l16.122-24.348c0.91-1.57,2.623-2.534,4.452-2.428l24.661,1.16
      c1.829,0.09,3.453,1.178,4.211,2.846l13.847,25.989c1.767,3.9,6.219,5.8,10.233,4.354L187.351,252.156z M148.229,172.296
      c-11.394,4.095-23.714,3.524-34.68-1.633c-10.965-5.157-19.245-14.275-23.358-25.678c-4.095-11.402-3.524-23.714,1.634-34.67
      c5.156-10.974,14.283-19.254,25.677-23.357c11.402-4.105,23.714-3.534,34.67,1.641c10.956,5.139,19.254,14.258,23.366,25.66
      c4.096,11.403,3.516,23.706-1.632,34.672C168.731,159.886,159.621,168.183,148.229,172.296z"/>
  </g>
</svg>
`;

icons.save = html`
<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path id="Combined Shape" fill-rule="evenodd" clip-rule="evenodd" d="M35.2822 4.88487C34.7186 4.31826 33.9535 4 33.1551 4H6.99915C5.34286 4 3.99915 5.34372 3.99915 7V41C3.99915 42.6563 5.34286 44 6.99915 44H40.9991C42.6569 44 43.9991 42.6568 43.9991 41V14.888C43.9991 14.095 43.6861 13.3357 43.1261 12.7728L35.2822 4.88487ZM6.99915 6H12.9999V15.9508C12.9999 17.0831 13.9197 18.0028 15.0519 18.0028H32.9479C34.0802 18.0028 34.9999 17.0831 34.9999 15.9508V11.2048C34.9999 10.6525 34.5522 10.2048 33.9999 10.2048C33.4477 10.2048 32.9999 10.6525 32.9999 11.2048V15.9508C32.9999 15.9785 32.9757 16.0028 32.9479 16.0028H15.0519C15.0242 16.0028 14.9999 15.9785 14.9999 15.9508V6H33.1551C33.4211 6 33.6759 6.10599 33.8642 6.29523L41.7081 14.1831C41.8952 14.3712 41.9991 14.6234 41.9991 14.888V41C41.9991 41.5526 41.552 42 40.9991 42H6.99915C6.44743 42 5.99915 41.5517 5.99915 41V7C5.99915 6.44828 6.44743 6 6.99915 6ZM27.9999 30.0206C27.9999 27.8121 26.2089 26.0206 23.9999 26.0206C23.4477 26.0206 22.9999 25.5729 22.9999 25.0206C22.9999 24.4683 23.4477 24.0206 23.9999 24.0206C27.3136 24.0206 29.9999 26.7077 29.9999 30.0206C29.9999 33.3349 27.3142 36.0206 23.9999 36.0206C20.6857 36.0206 17.9999 33.3349 17.9999 30.0206C17.9999 29.4683 18.4477 29.0206 18.9999 29.0206C19.5522 29.0206 19.9999 29.4683 19.9999 30.0206C19.9999 32.2303 21.7902 34.0206 23.9999 34.0206C26.2097 34.0206 27.9999 32.2303 27.9999 30.0206Z" fill="#ffffff"/>
</svg>
`;

icons.close = html`
<svg viewBox="100 80 820 820" fill="#ffffff" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <path d="M512 897.6c-108 0-209.6-42.4-285.6-118.4-76-76-118.4-177.6-118.4-285.6 0-108 42.4-209.6 118.4-285.6 76-76 177.6-118.4 285.6-118.4 108 0 209.6 42.4 285.6 118.4 157.6 157.6 157.6 413.6 0 571.2-76 76-177.6 118.4-285.6 118.4z m0-760c-95.2 0-184.8 36.8-252 104-67.2 67.2-104 156.8-104 252s36.8 184.8 104 252c67.2 67.2 156.8 104 252 104 95.2 0 184.8-36.8 252-104 139.2-139.2 139.2-364.8 0-504-67.2-67.2-156.8-104-252-104z" />
  <path d="M707.872 329.392L348.096 689.16l-31.68-31.68 359.776-359.768z" />
  <path d="M328 340.8l32-31.2 348 348-32 32z" />
</svg>
`

icons.delete = html`
<svg viewBox="1 5 20 13" stroke="#ffffff" xmlns="http://www.w3.org/2000/svg">
<path d="M16 9L13.0001 11.9999M13.0001 11.9999L10 15M13.0001 11.9999L10.0002 9M13.0001 11.9999L16.0002 15M8 6H19C19.5523 6 20 6.44772 20 7V17C20 17.5523 19.5523 18 19 18H8L2 12L8 6Z" stroke-width="1" stroke-linecap="round"/>
</svg>
`

icons.midi = html`
  <svg viewBox="1 1 22 22" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" version="1.1" >
    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M20.18,12C20.18,8.18 17.55,4.96 14,4.07V6H10V4.07C6.45,4.96 3.82,8.18 3.82,12A8.18,8.18 0 0,0 12,20.18A8.18,8.18 0 0,0 20.18,12M7,10.64A1.36,1.36 0 0,1 8.36,12A1.36,1.36 0 0,1 7,13.36C6.25,13.36 5.64,12.75 5.64,12C5.64,11.25 6.25,10.64 7,10.64M17,10.64A1.36,1.36 0 0,1 18.36,12A1.36,1.36 0 0,1 17,13.36A1.36,1.36 0 0,1 15.64,12A1.36,1.36 0 0,1 17,10.64M8.36,14.27A1.37,1.37 0 0,1 9.73,15.64C9.73,16.39 9.12,17 8.36,17A1.36,1.36 0 0,1 7,15.64C7,14.88 7.61,14.27 8.36,14.27M15.64,14.27C16.39,14.27 17,14.88 17,15.64A1.36,1.36 0 0,1 15.64,17C14.88,17 14.27,16.39 14.27,15.64A1.37,1.37 0 0,1 15.64,14.27M12,15.64A1.36,1.36 0 0,1 13.36,17A1.36,1.36 0 0,1 12,18.36A1.36,1.36 0 0,1 10.64,17A1.36,1.36 0 0,1 12,15.64Z" />
  </svg>
`

icons.network = html`
<svg fill="#ffffff" viewBox="0 -2 34 34" xmlns="http://www.w3.org/2000/svg" version="1.1">
<path d="M27 21.75c-0.795 0.004-1.538 0.229-2.169 0.616l0.018-0.010-2.694-2.449c0.724-1.105 1.154-2.459 1.154-3.913 0-1.572-0.503-3.027-1.358-4.212l0.015 0.021 3.062-3.062c0.57 0.316 1.249 0.503 1.971 0.508h0.002c2.347 0 4.25-1.903 4.25-4.25s-1.903-4.25-4.25-4.25c-2.347 0-4.25 1.903-4.25 4.25v0c0.005 0.724 0.193 1.403 0.519 1.995l-0.011-0.022-3.062 3.062c-1.147-0.84-2.587-1.344-4.144-1.344-0.868 0-1.699 0.157-2.467 0.443l0.049-0.016-0.644-1.17c0.726-0.757 1.173-1.787 1.173-2.921 0-2.332-1.891-4.223-4.223-4.223s-4.223 1.891-4.223 4.223c0 2.332 1.891 4.223 4.223 4.223 0.306 0 0.605-0.033 0.893-0.095l-0.028 0.005 0.642 1.166c-1.685 1.315-2.758 3.345-2.758 5.627 0 0.605 0.076 1.193 0.218 1.754l-0.011-0.049-0.667 0.283c-0.78-0.904-1.927-1.474-3.207-1.474-2.334 0-4.226 1.892-4.226 4.226s1.892 4.226 4.226 4.226c2.334 0 4.226-1.892 4.226-4.226 0-0.008-0-0.017-0-0.025v0.001c-0.008-0.159-0.023-0.307-0.046-0.451l0.003 0.024 0.667-0.283c1.303 2.026 3.547 3.349 6.1 3.349 1.703 0 3.268-0.589 4.503-1.574l-0.015 0.011 2.702 2.455c-0.258 0.526-0.41 1.144-0.414 1.797v0.001c0 2.347 1.903 4.25 4.25 4.25s4.25-1.903 4.25-4.25c0-2.347-1.903-4.25-4.25-4.25v0zM8.19 5c0-0.966 0.784-1.75 1.75-1.75s1.75 0.784 1.75 1.75c0 0.966-0.784 1.75-1.75 1.75v0c-0.966-0.001-1.749-0.784-1.75-1.75v-0zM5 22.42c-0.966-0.001-1.748-0.783-1.748-1.749s0.783-1.749 1.749-1.749c0.966 0 1.748 0.782 1.749 1.748v0c-0.001 0.966-0.784 1.749-1.75 1.75h-0zM27 3.25c0.966 0 1.75 0.784 1.75 1.75s-0.784 1.75-1.75 1.75c-0.966 0-1.75-0.784-1.75-1.75v0c0.001-0.966 0.784-1.749 1.75-1.75h0zM11.19 16c0-0.001 0-0.002 0-0.003 0-2.655 2.152-4.807 4.807-4.807 1.328 0 2.53 0.539 3.4 1.409l0.001 0.001 0.001 0.001c0.87 0.87 1.407 2.072 1.407 3.399 0 2.656-2.153 4.808-4.808 4.808s-4.808-2.153-4.808-4.808c0-0 0-0 0-0v0zM27 27.75c-0.966 0-1.75-0.784-1.75-1.75s0.784-1.75 1.75-1.75c0.966 0 1.75 0.784 1.75 1.75v0c-0.001 0.966-0.784 1.749-1.75 1.75h-0z"></path>
</svg>
`;

icons.internet = html`
<svg fill="#ffffff" viewBox="0 0 449.39 449.39" xmlns="http://www.w3.org/2000/svg"  version="1.1">
<path d="M227.459,0.072l-0.012-0.009h-0.271C226.347,0.057,225.533,0,224.701,0
    C100.797,0,0,100.797,0,224.695C0,348.593,100.797,449.39,224.695,449.39c123.897,0,224.695-100.797,224.695-224.695
    C449.39,101.724,350.08,1.564,227.459,0.072z M233.478,157.014c30.591-1.152,58.323-8.163,82.733-18.104
    c9.436,22.969,15.959,48.76,17.034,77.001h-99.768V157.014z M215.912,215.912h-99.768c1.078-28.264,7.577-54.055,17.005-77.019
    c24.416,9.952,52.163,16.968,82.763,18.121V215.912z M98.639,215.912H17.771c1.878-44.786,18.063-85.907,44.072-118.966
    c15.084,11.896,33.633,24.339,55.279,34.837C106.981,156.439,99.745,184.68,98.639,215.912z M98.584,233.478
    c1.2,31.117,8.331,59.232,18.598,84.101c-21.671,10.498-40.238,22.958-55.333,34.856C35.84,319.379,19.65,278.261,17.777,233.478
    H98.584z M116.167,233.478h99.745v58.907c-30.428,1.138-58.038,8.073-82.348,17.937
    C124.043,287.41,117.385,261.691,116.167,233.478z M233.478,233.478h99.745c-1.219,28.201-7.892,53.932-17.417,76.844
    c-24.308-9.863-51.908-16.793-82.334-17.937v-58.907H233.478z M350.805,233.478h80.813c-1.876,44.783-18.069,85.907-44.075,118.969
    c-15.106-11.916-33.701-24.381-55.384-34.891C342.429,292.682,349.599,264.573,350.805,233.478z M350.829,215.912
    c-1.069-31.137-8.103-59.313-18.292-84.252c21.534-10.472,39.986-22.864,55.007-34.714c26.012,33.059,42.199,74.18,44.075,118.961
    h-80.79V215.912z M376.096,83.606c-13.929,10.938-30.969,22.343-50.73,32.007C303.5,70.76,272.383,37.997,251.604,19.37
    C300.481,25.746,344.042,49.255,376.096,83.606z M308.956,122.909c-22.38,9.04-47.688,15.404-75.478,16.539V27.069
    C252.175,43.125,285.895,76.27,308.956,122.909z M215.912,27.052v112.39c-27.807-1.135-53.124-7.51-75.515-16.565
    C163.46,76.201,197.206,43.077,215.912,27.052z M197.995,19.347c-12.628,11.539-27.286,26.78-38.942,41.501
    c-11.588,14.638-24.09,33.133-34.729,54.904c-19.89-9.697-37.027-21.153-51.033-32.146
    C105.394,49.201,149.028,25.68,197.995,19.347z M73.285,365.781c14.023-11.007,31.189-22.482,51.116-32.181
    c22.26,45.265,53.961,78.131,75.023,96.635C149.872,424.163,105.706,400.512,73.285,365.781z M140.877,326.304
    c22.271-8.943,47.434-15.232,75.035-16.354v111.284C197.329,405.292,163.918,372.477,140.877,326.304z M233.478,421.235V309.951
    c27.595,1.127,52.748,7.41,75.021,16.354C285.449,372.449,252.055,405.281,233.478,421.235z M250.186,430.201
    c20.619-18.264,52.389-51.188,74.746-96.623c19.944,9.709,37.133,21.191,51.164,32.203
    C343.727,400.478,299.641,424.105,250.186,430.201z"/>
</svg>
`;

icons.prompt = html`
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 19H21M3 5L11 12L3 19" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export default icons;

