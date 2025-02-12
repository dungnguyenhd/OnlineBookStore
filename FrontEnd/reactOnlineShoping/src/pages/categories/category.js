import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import ProductServices from "../../services/ProductServices";

export default function Category() {
    const [product, setProduct] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const params = useParams();
    useEffect(() => {
        ProductServices.getAllProducts(params.name).then((res) => {
            setProduct(res.data);
        })
    }, []);

    // console.log(product);

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
        listProduct = <h6> Không có sản phẩm nào thuộc mục này</h6>
    }


    return (
        <>
            <div style={{ backgroundColor: 'rgb(246, 239, 239)' }}>
                <div className="container pt-3">
                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner " style={{ borderRadius: '5px'}}>
                            <div className="carousel-item active"><img className="img-fluid" src="https://t3.ftcdn.net/jpg/04/65/46/52/360_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg" style={{height: '350px', width: '1500px'}}/></div>
                            <div className="carousel-item"><img className="img-fluid" src="https://img.freepik.com/free-vector/summer-season-sale-fifty-percent-off-lettering_1262-12130.jpg?w=2000" style={{height: '350px', width: '1500px'}}/></div>
                            <div className="carousel-item"><img className="img-fluid" src="https://images.designtrends.com/wp-content/uploads/2016/08/08181126/Summer-Sale-Template-Banner.jpg" style={{height: '350px', width: '1500px'}}/></div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev"><span className="carousel-control-prev-icon" aria-hidden="true"></span><span className="visually-hidden">Previous</span></button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next"><span className="carousel-control-next-icon" aria-hidden="true"></span><span className="visually-hidden">Next</span></button>
                    </div>
                </div>
                <div className="container">
                    <div className="row mt-3 pt-2">
                        <div className="col-md-2">
                            <p className="pt-3 ps-2" style={{ textAlign: 'left' }}> <i className="fa fa-list"></i> &#160; Bộ lọc </p>
                            <hr></hr>

                            <p className="ps-2" style={{ textAlign: 'left' }}> Tất cả </p>

                            {/* <p className="ps-2" style={{ textAlign: 'left' }}> Bán chạy </p>

                                <p className="ps-2" style={{ textAlign: 'left' }}> Mới </p> */}
                        </div>

                        <div className="col-md-10" style={{ backgroundColor: 'white', borderRadius: '3px' }} >
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