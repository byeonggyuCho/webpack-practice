import 'normalize.css'
import styles from './index.css'
import lodash from 'lodash'

function component (){
    const element = document.createElement('div');
    element.innerHTML="Hello World2";
    element.classList = styles.hellowWebpack


    return element;
}

console.log(lodash.isNull(component))
console.log(`IS_PRODUCTION:${IS_PRODUCTION}`)


document.body.appendChild(component())