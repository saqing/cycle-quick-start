import { run } from '@cycle/rxjs-run'
import { makeDOMDriver } from '@cycle/dom'
import {routerify} from 'cyclic-router'
import {makeHistoryDriver} from '@cycle/history'
import switchPath from 'switch-path';
import App from './components/app'

const main = routerify(App, switchPath)

run(main as any,{
    DOM:makeDOMDriver('#app'),
    history: makeHistoryDriver() 
})