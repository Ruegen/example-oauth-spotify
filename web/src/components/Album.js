import React from 'react'

function Album({
    images,
    name
}) {
    
    return <img src={images[1].url} alt={name} />
} 

export default Album