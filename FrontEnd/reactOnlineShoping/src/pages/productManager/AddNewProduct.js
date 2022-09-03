import React, { useEffect,useState } from 'react'
import ProductServices from '../../services/ProductServices';
import { Link } from 'react-router-dom';
import {
    MDBValidation,
    MDBValidationItem,
    MDBInput,
    MDBBtn,
    MDBCheckbox
} from 'mdb-react-ui-kit';

function AddNewProduct() {
    const [product, setProduct] = useState({});

    useEffect(() => {
        let initData = {};
        initData.store = {};
        setProduct(initData);
      }, []);

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let data = { ...product };
        data[name] = value;
        setProduct(data);
    }

    const handleChangeStore = (event) => {
        console.log(event);
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let data = {...product};
        data.store[name] = value;
        setProduct(data);
        console.log('test product' + product)
      };

    const saveProduct = (event) => {
        ProductServices.addNewProduct(product).then(res => {
            console.log('save success!');
        });
    }

    // console.log('test product' + product)


    return (
        <div className='container col-md-8'>
            <h1> Thêm sản phẩm mới </h1>
            <div>
                <MDBValidation className='row g-3'>

                    <label> Xuất xứ: </label>
                    <MDBValidationItem feedback='Please provide a valid address.' invalid>
                        <MDBInput
                            placeholder='Product Address' name='productAddress'
                            className='form-control' value={product.productAddress}
                            onChange={(e) => handleChange(e)} 
                            required/>
                    </MDBValidationItem>

                    {/* --------------------------------------------------------- */}

                    <label> Tên sản phẩm: </label>
                    <MDBValidationItem feedback='Please provide a valid name.' invalid>
                        <MDBInput
                            placeholder='Product Name' name='productName' className='form-control' value={product.productName} 
                            onChange={(e) => handleChange(e)}
                            required/>
                    </MDBValidationItem>

                    {/* --------------------------------------------------------- */}

                    <label> Số lượng trong kho: </label>
                    <MDBValidationItem feedback='Please provide a valid amount.' invalid>
                        <MDBInput
                            placeholder='Product Card Number' type='number' name='productAmount' className='form-control' 
                            value={product.productAmount} onChange={(e) => handleChange(e)}
                            required/>
                    </MDBValidationItem>

                    {/* --------------------------------------------------------- */}

                    <label> Ngày nhập: </label>
                    <MDBValidationItem feedback='Please provide a valid card date.' invalid>
                        <MDBInput
                            placeholder='Product Date' name='productDate' className='form-control' value={product.productDate} 
                            onChange={(e) => handleChange(e)}
                            required/>
                    </MDBValidationItem>

                    {/* --------------------------------------------------------- */}

                    <label> Ảnh: </label>
                    <MDBValidationItem feedback='Please provide a valid card url.' invalid>
                        <MDBInput
                            placeholder='Product Image URL' name='productImage' className='form-control' value={product.productImage} 
                            onChange={(e) => handleChange(e)}
                            required/>
                    </MDBValidationItem>

                    {/* --------------------------------------------------------- */}

                    <label> Giá sản phẩm: </label>
                    <MDBValidationItem feedback='Please provide a valid card email.' invalid>
                        <MDBInput
                            placeholder='Product New Price' name='productNewPrice' className='form-control' value={product.productNewPrice} 
                            onChange={(e) => handleChange(e)}
                            required/>
                    </MDBValidationItem>

                    {/* --------------------------------------------------------- */}

                    <label> Giá thị trường: </label>
                    <MDBValidationItem feedback='Please provide a valid card email.' invalid>
                        <MDBInput
                            placeholder='Giá thị trường' name='productOldPrice' className='form-control' value={product.productOldPrice} 
                            onChange={(e) => handleChange(e)}
                            required/>
                    </MDBValidationItem>

                    <label> Phân loại sản phẩm: </label>
                    <MDBValidationItem feedback='Please provide a valid card email.' invalid>
                        <MDBInput
                            placeholder='Phân loại sản phẩm' name='productType' className='form-control' value={product.productType} 
                            onChange={(e) => handleChange(e)}
                            required/>
                    </MDBValidationItem>

                    <label> Mô tả phẩm: </label>
                    <MDBValidationItem feedback='Please provide a valid card email.' invalid>
                        <MDBInput
                            placeholder='Mô tả sản phẩm' name='productDescription' className='form-control' value={product.productDescription}
                            onChange={(e) => handleChange(e)}
                            required/>
                    </MDBValidationItem>

                    <label> Mã store: </label>
                    <MDBValidationItem feedback='Please provide a valid card email.' invalid>
                        <MDBInput
                            placeholder='Mô tả sản phẩm' name='storeId' className='form-control' value={product.storeId} 
                            onChange={(e) => handleChangeStore(e)}
                            required/>
                    </MDBValidationItem>

                    {/* --------------------------------------------------------- */}
                    <div className='col-12'>
                        <MDBBtn type='submit' className='btn btn-info me-2' onClick={(e) => saveProduct(e)}>Save</MDBBtn>
                        <MDBBtn type='reset' className='btn btn-danger me-2'>Reset form</MDBBtn>
                        <Link to={"/"}><button className='btn btn-secondary me-2'> Cancel </button></Link>
                    </div>
                </MDBValidation>
            </div>

        </div>
    )
}

export default AddNewProduct;
