import React from 'react'
const updateComponet =(OriginalComponent,other)=>{
    
    const newComponent = (props)=>{
         console.log(other)
         console.log(props.title)
       return(<OriginalComponent name="orpon" {...props}/>)
     }
    return newComponent;
}
export default updateComponet;