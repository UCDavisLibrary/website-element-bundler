//import styles from "./shared-styles.html";
import styles from "./element-styles.js";
let styleWrapper = document.createElement('div');
styleWrapper.style.display = 'none';
styleWrapper.innerHTML = styles;
document.head.appendChild(styleWrapper);
