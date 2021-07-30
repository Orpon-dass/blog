import React from 'react'
import updateComponet from '../HOC/withuserUpdateForm'
 function TestHoc({name,title}) {
    return (
        <>
        <h1>this is higher order component</h1>
          name is {name}  
          title is {title}  
        </>
    )
}
export default updateComponet(TestHoc,"some other value")
