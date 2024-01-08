import React, { useEffect, useState } from 'react';
import Card from './Card';

const Pagination = () => {
    const [products, setProducts] = useState([]);
    const [pagesInfo, setPagesInfo] = useState({ page: 1, totalPages: 1 });

	useEffect(() => {
        const url = `https://dummyjson.com/products?skip=${(pagesInfo.page-1)*10}&limit=100`;

        fetch(url)
		.then(async (data) => {
			const resp = await data.json();
			setProducts(resp.products);
            setPagesInfo({ ...pagesInfo, totalPages: resp.total/10 });
		})
		.catch(e => console.log(e));
	},[]);

    const onClickHandle = (pageNum) => {
        if(pageNum === "left") {
            if(pagesInfo.page !== 1) pageNum = pagesInfo.page-1;
            else pageNum = pagesInfo.page;
        } else if(pageNum === "right") {
            if(pagesInfo.page !== pagesInfo.totalPages) pageNum = pagesInfo.page+1;
            else pageNum = pagesInfo.page;
        }

        setPagesInfo({ ...pagesInfo, page: pageNum });
    }

    return (
        <div style={{ display: "grid", placeContent: "center", placeItems: "center", marginBottom: "20px" }}>
            <div style={{ display: "flex", margin: "20px", gap: "20px", flexWrap: "wrap" }}>
                {products.slice((pagesInfo.page-1)*10,pagesInfo.page*10).map(product => (
                    <Card key={product.id} product={product} />
                ))}
            </div>
            <div>
                <span onClick={() => onClickHandle("left")} style={{ background: pagesInfo.page === 1 ? "lightgrey" : "", padding: "10px", border: "1px solid black", cursor: "pointer" }}>⬅️{" "}</span>
                {[...Array(pagesInfo.totalPages)].map((_,id) => (
                    <span onClick={() => onClickHandle(id+1)} style={{ background: id+1===pagesInfo.page ? "yellow" : "", padding: "10px", border: "1px solid black", cursor: "pointer" }}>{id+1}{" "}</span>
                ))}
                <span onClick={() => onClickHandle("right")} style={{ background: pagesInfo.page === pagesInfo.totalPages ? "lightgrey" : "", padding: "10px", border: "1px solid black", cursor: "pointer" }}>➡️{" "}</span>
            </div>
        </div>
    );
}

export default Pagination;
