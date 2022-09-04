import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate  } from "react-router-dom";
import ReactPaginate from 'react-paginate';

import { UserContext } from '../../App';
import StoreService from '../../services/StoreService';
import ProductServices from '../../services/ProductServices';

export default function ProductManager() {
    const [products, setProducts] = useState([]);
    const getUser = useContext(UserContext);
    const [store, setStore] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const [direction, setDirection] = useState(1);
    const navigate = useNavigate();

    useEffect(()=>{
        if(getUser !== null){
        StoreService.getStoreByUser(getUser.id).then((res) => {
            setStore(res.data);
        })
        ProductServices.getStoreProduct(store.storeId).then((res) => {
            setProducts(res.data);
        })
    }
    },[])

    useEffect(() => { 
            ProductServices.getProductByStoreSearch(store.storeId, searchTerm).then((response) => {
                setProducts(response.data);
            });
    }, [searchTerm]);

    const productPerPage = 5;
    const pagesVisited = pageNumber * productPerPage;

    const pageCount = Math.ceil(products.length / productPerPage)
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    const deleteProduct = (id) => {
        if (window.confirm('Are you sure?') === true) {
            ProductServices.deleteProduct(id).then((response) => {
                setProducts(response.data);
            })
        }
        else {

        }
    }

    const sortColumn = (field, type) => {
        const sortData = [...products];
        if (type == 'string') {
            sortData.sort((a, b) => direction * a[field].localeCompare(b[field]));
        } else if (type == 'number') {
            sortData.sort((a, b) => direction * (a[field] - b[field]));
        }
        setDirection(direction * -1);
        setProducts(sortData);
    };

    var listProducts = [];
    if (products.length !== 0) {
        listProducts = products.slice(pagesVisited, pagesVisited + productPerPage).map((product) => (
            <tr key={product.productId}>
                <th scope="row">{product.productId}</th>
                <td style={{textAlign:'left'}}>{product.productName}</td>
                <td><img src={product.productImage} className='img-fluid' width='30%'/></td>
                <td>{product.productNewPrice.toLocaleString("en-US")}</td>
                <td>
                <Link className="product-link" to={'/product/'+product.productId}><button className='btn btn-warning'>Xem</button></Link>
                </td>

                <td>
                    <Link to={`/editProduct/` + product.productId}><button className='btn btn-info'>Sửa</button></Link>
                </td>
                <td>
                    <button
                        className="btn btn-danger" onClick={() => deleteProduct(product.productId)}
                    >
                        Xóa
                    </button>
                </td>
            </tr>
        ));
    }
    else {
        listProducts = <tr><th>Không có sản phẩm nào</th><td></td></tr>;
    }

    const onClickEnter = (event) => {
        if (event.key === 'Enter') {
            setSearchTerm(document.querySelectorAll('input[name=inputSearch]')[0].value);
        }
    }

    if(getUser === null){
        navigate("/login");
    }
    else{
    return (
        <div style={{backgroundColor: 'lightgray'}}>
        <div className="container pt-4" style={{backgroundColor: 'white'}}>
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    name="inputSearch"
                    placeholder='Tìm kiếm sản phẩm của bạn ....'
                    onKeyDown={onClickEnter}
                ></input>
                <div className="input-group-append">
                    <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={() => setSearchTerm(document.querySelectorAll('input[name=inputSearch]')[0].value)}>
                        Tìm
                    </button>
                </div>
            </div>
            <div className='mt-2'>
                <Link to={`/addNewProduct`}><button className='btn btn-success'> Thêm sản phẩm mới </button></Link>
            </div>

            <div>
                <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                />
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col" onClick={() => sortColumn('productId', 'number')}>STT</th>
                        <th scope="col" onClick={() => sortColumn('productName', 'string')}>Tên sản phẩm</th>
                        <th scope="col" onClick={() => sortColumn('productImage', 'string')}>Hình ảnh</th>
                        <th scope="col" onClick={() => sortColumn('productNewPrice', 'number')}>Giá</th>
                        <th scope="col">Xem</th>
                        <th scope="col">Sửa</th>
                        <th scope="col">Xóa</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {listProducts}
                </tbody>
            </table>
        </div>
        </div>
    );
}
}