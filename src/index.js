import 'normalize.css'
import styles from './index.module.scss'
import lodash from 'lodash'
import bonoImg  from './images/bono.jpg'
import proryImg from './images/poro.bmp'
import '@babel/polyfill'


function component (){
    const element = document.createElement('div');
    element.innerHTML="Hello World2";
    element.classList = styles.helloWebpack

    const imgElements = document.createElement('img');
    imgElements.src = proryImg
    imgElements.classList = styles.logoImg
    element.append(imgElements)


    return element;
}

console.log('lodash isNull:',lodash.isNull(component))
// console.log(`IS_PRODUCTION:${IS_PRODUCTION}`)


document.body.appendChild(component())