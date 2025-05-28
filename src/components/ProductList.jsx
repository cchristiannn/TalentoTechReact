import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Link } from 'react-router-dom';
import { translateCategory } from "../utils/categoryTranslator";

function ProductList({ onAddToCart }) {
    const [categorias, setCategorias] = useState([]);
    const [selectCategoria, setSelectCategoria] = useState("todo");
    const [producto, setProducto] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products/categories")
            .then(res => res.json())
            .then(data => setCategorias(data))
            .catch(() => setCategorias([]));
    }, []);

    useEffect(() => {
        setLoading(true);
        const url =
            selectCategoria === "todo"
                ? "https://fakestoreapi.com/products"
                : `https://fakestoreapi.com/products/category/${selectCategoria}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setProducto(data);
                setLoading(false);
            })
            .catch(() => {
                setError("Error al cargar productos");
                setLoading(false);
            });
    }, [selectCategoria]);

    return (
        <div className="container mt-4">
            
            <div className="mb-4">
                <label className="form-label fw-bold text-light">Categorías:</label>
                <select
                    className="form-select"
                    value={selectCategoria}
                    onChange={(e) => setSelectCategoria(e.target.value)}
                >
                    <option value="todo">Todas</option>
                    {categorias.map((cat, ind) => (
                        <option key={ind} value={cat}>
                            {translateCategory(cat)}
                        </option>))}
                </select>
            </div>

            <div className="row" style={{ minHeight: "400px" }}>
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
                        <div className="spinner-border text-light" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    </div>
                ) : error ? (
                    <div className="text-danger text-center mt-5">{error}</div>
                ) : (
                    producto.map(prod => (
                        <div key={prod.id} className="col-md-4 mb-4">
                            <ProductCard
                                product={prod}
                                onAddToCart={onAddToCart}
                                detailLink={
                                    <Link
                                        to={`/producto/${prod.id}`}
                                        className="btn btn-outline-light btn-sm"
                                    >
                                        Ver detalles
                                    </Link>
                                }
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );

 
}

export default ProductList;
