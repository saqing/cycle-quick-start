import {merge} from 'rxjs'
import {map,filter, switchAll} from 'rxjs/operators'
import {About} from './About'
import {Hello} from './Hello'

const App = (sources:any)=>{
  const match$ = sources.router.define({
    '/':Hello,
    '/about': About,
    '*':Hello
  });
  
  const page$ = match$.pipe(map(({path, value}:any) => {
    return value(Object.assign({}, sources, {
      router: sources.router.path(path)
    }))
  }))

  return {
    DOM: page$.pipe(map((c:any) => c.DOM), switchAll()), 
    router: merge(page$.pipe(
        map((c:any) => c.router),
        filter((x:any) => x || ''),
        switchAll()))
  }
}

export default App