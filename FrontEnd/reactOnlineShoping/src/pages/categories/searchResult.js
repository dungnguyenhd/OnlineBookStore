import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import ProductServices from "../../services/ProductServices";

export default function SearchResult() {
    const [product, setProduct] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const params = useParams();
    useEffect(() => {
        ProductServices.getAllProducts(params.name).then((res) => {
            setProduct(res.data);
        })
    }, []);

    console.log(product);

    const productPerPage = 8;
    const pagesVisited = pageNumber * productPerPage;

    const pageCount = Math.ceil(product.length / productPerPage)
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    const sortPriceDown = () => {
        const sortData = [...product];
        sortData.sort((a, b) => a.productNewPrice - b.productNewPrice);
        setProduct(sortData);
    };

    const sortPriceUp = () => {
        const sortData = [...product];
        sortData.sort((a, b) => b.productNewPrice - a.productNewPrice);
        setProduct(sortData);
    };

    var listProduct = [];
    if (product.length !== 0) {
        listProduct = product.slice(pagesVisited, pagesVisited + productPerPage).map((product) => (
            <div className="col-xl-3 col-md-3 mb-3 mt-1 " key={product.productId}>
                <Link className="product-link" to={'/product/' + product.productId}>
                    <div className="card" style={{ textAlign: 'left', fontSize: '.9rem', width: '12.5rem' }}>
                        <img src={product.productImage} className="img-fluid" alt="no-image" style={{ aspectRatio: 1 / 1.02 }} />
                        <div className="card-body">
                            <p className="card-title textOverflow " style={{ textTransform: 'uppercase', textAlignLast: 'justify', }}>{product.productName}</p>
                            <p><span style={{ backgroundColor: '#26aa99', padding: '3px', fontSize: '.6rem', fontWeight: 'bold', fontStyle: 'italic', color: 'rgb(250, 247, 247)' }}> <i className="fa fa-shipping-fast"></i>&#160; FREE SHIP</span></p>
                            <p className="card-text" style={{ textAlignLast: 'justify', }}><span style={{ color: 'grey', textDecoration: 'line-through', fontStyle: 'italic', fontSize: '.9rem' }}><sup>đ</sup>{product.productOldPrice.toLocaleString("en-US")}</span> &#160;
                                <span style={{ color: 'rgb(255, 38, 0)', fontSize: '1rem' }}><sup>đ</sup>{product.productNewPrice.toLocaleString("en-US")}</span> </p>
                        </div>
                    </div>
                </Link>
            </div>
        ));
    }
    else {
        listProduct = <h6> Không có sản phẩm nào phù hợp</h6>
    }


    return (
        <>
            <div style={{ backgroundColor: 'rgb(246, 239, 239)' }}>
                <div className="container">
                    <div className="row pt-3">
                        <div className="col-md-2">
                            <p className="pt-3 ps-2" style={{ textAlign: 'left' }}> <i className="fa fa-list"></i> &#160; Bộ lọc </p>
                            <hr></hr>

                            <p className="ps-2" style={{ textAlign: 'left' }}> Tất cả </p>

                            {/* <p className="ps-2" style={{ textAlign: 'left' }}> Bán chạy </p>

                                <p className="ps-2" style={{ textAlign: 'left' }}> Mới </p> */}
                        </div>

                        <div className="col-md-10" style={{ backgroundColor: 'white', borderRadius: '3px' }} >

                        <div className="container-fluid mt-2" style={{ backgroundColor: 'rgb(246, 239, 239)' }}>
                                <p style={{ textAlign: 'left' }}> Kết quả tìm kiếm cho: {params.name} </p>
                            </div>

                            <div className="container-fluid mt-2 pb-2" style={{ textAlign: 'left', backgroundColor: 'rgb(247, 242, 242)', borderRadius: '3px' }}>
                                Sắp xếp theo &#160;&#160;
                                <div className="dropdown">
                                    <button className="dropbtn pb-1">Giá &#160; &#160; &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
                                        &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;</button>
                                    <div className="dropdown-content">
                                        <a onClick={() => sortPriceUp()}>Tăng dần</a>
                                        <a onClick={() => sortPriceDown()}>Giảm dần</a>
                                    </div>
                                </div>
                            </div>

                            <div className="container-fluid">
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
                                <div className="row">
                                    {listProduct}
                                </div>

                            </div>
                        </div>
                        <div className="pt-5"></div>
                    </div>
                </div>
            </div>
        </>
    )
}