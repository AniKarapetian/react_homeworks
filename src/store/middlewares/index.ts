
export const timeMiddleware = (store: any)=>(next:any)=>(action:any)=>{
setTimeout(()=>{
    console.log('middleware is working!');
    return next(action);
}, 2000);
  
}