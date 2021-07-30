import react from 'react';
export const wraperfuction = (OriginalComponent) =>{
   const NewComponent =(props)=>{
       return(
           <OriginalComponent />
       )
   }
   return NewComponent;
}