import React from 'react';

const Card = ({ product }) => {
    return (
        <div style={{ border: "1px solid black", padding: "10px", height: "450px", width: "300px"}}>
            <img src={product.thumbnail} width="300" height="300" alt="Product" />
            <div>{product.brand}&nbsp;{product.title} - {product.category}&nbsp;({product.rating}⭐️)</div>
            <div>{product.description}</div>
            <div>${product.price}(Down from ${parseInt((product.price*100)/(100-product.discountPercentage))})</div>
            <div>{"Only "}{product.stock}{" left"}</div>
        </div>
    );
}

export default Card;
