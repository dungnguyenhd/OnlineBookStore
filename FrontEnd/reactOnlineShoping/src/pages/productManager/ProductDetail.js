import React, { useEffect, useState } from 'react'
import ProductServices from '../../services/ProductServices';
import { useParams, useNavigate, Link } from "react-router-dom";
import StoreService from '../../services/StoreService';
import CustomerOrderService from '../../services/CusOrderService';

function ProductDetail() {

  const params = useParams();
  const [product, setProduct] = useState(null);
  const [store, setStore] = useState({});
  const [comment, setComment] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    ProductServices.getProductById(params.productId).then((response) => {
      setProduct(response.data);
      let data = { ...response.data };
      let data2 = { ...data.store }
      StoreService.getStoreById(data2.storeId).then((res) =>{
        setStore(res.data)
      })
      CustomerOrderService.getAllComments(params.productId).then((res)=>{
        setComment(res.data);
      })
    });

  }, []);

  var listComment = [];
  if(comment.length !== 0){
    listComment = comment.map((comment) =>(
      <div key={comment.id} className='pt-3'>
          <div> <img src={comment.user.avatar} alt='No avatar' className="rounded-circle" width="80" /> {comment.user.username} ---- Đánh giá: {comment.rating} sao --- {comment.comment} </div>
          <hr/>
      </div>
    ))
  }
  else{
    listComment = (
      <>
        Sản phẩm chưa có đánh giá nào
      </>
    )
  }

  if (product != null) {
    return (
      <>
        <div style={{ backgroundColor: 'rgb(246, 239, 239)' }}>
          <div className='container pt-2 pb-2' style={{ textAlign: 'left' }}> <Link to={'/'} className='product-link'>Shopdee</Link> &gt; <Link to={'/catagory' + product.productType} className='product-link'>{product.productType}</Link>  &gt; {product.productName} </div>
          <div className='container pb-3' style={{ backgroundColor: 'white', borderRadius: '2px' }}>
            <div className='row'>
              <div className='col-6 pt-3'>
                <img src={product.productImage} className='img-fluid img-thumbnail' />
              </div>

              <div className='col-6 pt-3'>
                <div className='pt-1' style={{ textAlign: 'left' }}> <span style={{ backgroundColor: '#fd4614', padding: '1px', borderRadius: '3px', fontSize: '.8rem', color: 'white' }}> Yêu thích </span>
                  <span style={{ paddingLeft: '10px', fontSize: '1.3rem' }}> {product.productName.toUpperCase()} </span>
                </div>

                <div className='pt-1' style={{ textAlign: 'left' }}> <img src='https://i.postimg.cc/90JFCY0n/Screenshot-2022-08-30-161422.png' width='20%' /> </div>

                <div style={{ backgroundColor: '#f9f7f7' }} className='pt-3 pb-1 mt-2'>
                  <p className="card-text" style={{ textAlign: 'left' }}><span style={{ color: 'grey', textDecoration: 'line-through', fontSize: '1rem', paddingLeft: '15px' }}><sup>đ</sup>{product.productOldPrice.toLocaleString("en-US")}</span> &#160;
                    <span style={{ color: 'rgb(255, 38, 0)', fontSize: '1.4rem', fontWeight: 'bold', paddingLeft: '5px' }}><sup>đ</sup>{product.productNewPrice.toLocaleString("en-US")}</span> <span style={{ backgroundColor: '#fd4614', padding: '3px', borderRadius: '3px', fontSize: '.8rem', color: 'white', fontWeight: 'bold', marginLeft: '5px' }}>{Math.floor(product.productOldPrice / product.productNewPrice)}% GIẢM</span> </p>
                  <p style={{ textAlign: 'left', paddingLeft: '17px', color: 'rgb(18, 160, 236)' }}> <i className="fa fa-hand-holding-usd"></i> Cam kết giá tốt nhất thị trường! </p>
                </div>

                <div className='row pt-3' style={{ textAlign: 'left', paddingLeft: '5px' }}>
                  <div className='col-md-3' style={{ color: 'gray' }}> <p>Bảo hiểm</p>  <p> Vận chuyển </p> <p> Từ </p> <p> Kho </p> </div>
                  <div className='col-md-9'> <p> Bảo hiểm {product.productType} <span style={{ fontSize: '.9rem', color: 'rgb(18, 160, 236)' }}> &#160; Tìm hiểu thêm </span>  </p>
                    <p> <i className="fa fa-shipping-fast"></i>&#160; Hỗ trợ shipping toàn quốc </p>
                    <p> {product.productAddress} </p>
                    <p> {product.productAmount} sản phẩm có sẵn</p>
                  </div>
                </div>

                <div className='pt-3' style={{ textAlign: 'left' }}>
                  <button className='btn btn-outline-danger p-3'> <i className="fa fa-cart-arrow-down"></i> Thêm vào giỏ hàng </button>
                  &#160;&#160;&#160;
                  <button className='btn btn-danger p-3'> <i className="fa fa-bags-shopping"></i> Mua ngay </button>
                </div>
              </div>
            </div>
          </div>

          <div className="container pt-3">
            <div className="row pt-3 pb-2" style={{ backgroundColor: 'white', borderRadius: '5px' }}>

              <div className="col-md-4">
                <div className="card p-1">
                  <div className="d-flex justify-content-between align-items-center p-2">
                    <div className="ps-2"> <img src={store.storeImageURL} className="img-fluid rounded-circle" style={{ width: '100px', border: '5px solid lightgrey' }} /> </div>
                    <div className="flex-column lh-1 imagename pe-2"> <span className="h5">{store.storeName}</span> <br></br> <span>{store.storeAddress}</span> <br /><br /> <Link to={'/store/'+store.storeId} style={{ paddingTop: '3px' }}><button className="btn btn-danger" style={{ padding: '3px' }}><i className="fa fa-store"></i> Xem Shop </button></Link> </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div> <p style={{ textAlign: 'left' }}> <i className="fa fa-store"></i> Địa chỉ: <span className="text-danger"> {store.storeAddress} </span>  </p>
                    <p style={{ textAlign: 'left' }}> <i className="fa fa-user"></i> Người theo dõi:  <span className="text-danger">200</span>  </p>
                    <p style={{ textAlign: 'left' }}> <i className="fa fa-star"></i> Đánh giá:  <span className="text-danger">5.0/5 (70k lượt)</span> </p>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div> <p style={{ textAlign: 'left' }}> <i className="fa fa-user-check"></i> Đang theo: <span className="text-danger">5</span>  </p>
                  <p style={{ textAlign: 'left' }}> <i className="fa fa-comment"></i> Tỉ lệ phản hồi:  <span className="text-danger">200</span>  </p>
                  <p style={{ textAlign: 'left' }}> <i className="fa fa-phone"></i> Liên hệ:  <span className="text-danger">{store.storePhone}</span> </p>
                </div>
              </div>

              <div className="col-md-1"></div>
            </div>
          </div>

          <div className='container pt-2 pb-2 mt-3' style={{backgroundColor: 'white', borderRadius: '2px', textAlign: 'left' }}> 
            <div> &#160; MÔ TẢ SẢN PHẨM <hr></hr> </div>

            <div> {product.productDescription} </div>
          </div>

          <div className='container pt-2 pb-2 mt-3' style={{backgroundColor: 'white', borderRadius: '2px', textAlign: 'left' }}> 
            <div> &#160; HỎI ĐÁP, ĐÁNH GIÁ <hr></hr> </div>

            <div> {listComment} </div>
          </div>

          <div className='pt-5'></div>
        </div>
      </>
    );
  } else {
    return (<><h1>Error 404</h1></>);
  }
}

export default ProductDetail;




