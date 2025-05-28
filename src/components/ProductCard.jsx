function ProductCard({ product, onAddToCart, detailLink }) {
    return (
        
        <div className="card h-100 product-card">

            <img src={product.image} className="card-img-top p-3" alt={product.title} style={{ height: "250px", objectFit: "contain" }} />
            
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text fw-bold">${product.price}</p>
                <button
                    className="btn btn-primary mt-auto"
                    onClick={() => onAddToCart(product)}
                >
                    Agregar al carrito
                </button>
            </div>

            <div className="card-footer border-0 text-center" style={{ backgroundColor: '--main-green', border: '1px solid red' }}>
                {detailLink}
            </div>
        </div>
    );
}

export default ProductCard;
