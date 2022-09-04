import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    MDBValidation,
    MDBValidationItem,
    MDBInput,
    MDBBtn,
} from 'mdb-react-ui-kit';
import StoreService from '../../services/StoreService';
import { UserContext } from "../../App";

function AddNewStore() {
    const getUser = useContext(UserContext);
    const navigate = useNavigate();
    const [store, setStore] = useState({
        storeAddress: '',
        storeEmail:'',
        storeName:'',
        storePhone:'',
        user:{
            id: getUser.id,
        }
    });

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let data = { ...store };
        data[name] = value;
        setStore(data);
    }

    const saveStore = (event) => {
        StoreService.addNewStore(store).then(res => {
            console.log('save success!');
            navigate(-1);
        });
    }

    const cancel = () =>{
        navigate(-1);
    }

    if(getUser){
    return (
        <>
        <div style={{backgroundColor: 'rgb(246, 239, 239)'}}>
        <div className='pt-3' style={{backgroundColor: 'rgb(246, 239, 239)'}}></div>
        <div className='container col-md-8 bg-light pt-2'>
            <h2> Thêm cửa hàng mới <hr/> </h2>
            <div className='row pt-4 pb-3'>
            <div className='col-md-6'> <img className='img-fluid' style={{aspectRatio: 1 / 1.02}} src={store.storeImageURL} alt='no-image'/> </div>
            <div className='col-md-6'>
                <MDBValidation className='row g-3'>
                    <div className='col-md-3'><label> Địa chỉ: </label></div>
                    <div className='col-md-9'><MDBValidationItem feedback='Please provide a valid address.' invalid>
                        <MDBInput
                            placeholder='Địa chỉ' name='storeAddress'
                            className='form-control' value={store.storeAddress}
                            onChange={(e) => handleChange(e)} 
                            required/>
                    </MDBValidationItem>
                    </div>
                    {/* --------------------------------------------------------- */}

                    <div className='col-md-3'><label> Tên cửa hàng: </label></div>
                    <div className='col-md-9'><MDBValidationItem feedback='Please provide a valid name.' invalid>
                        <MDBInput
                            placeholder='Store Name' name='storeName' className='form-control' value={store.storeName} 
                            onChange={(e) => handleChange(e)}
                            required/>
                    </MDBValidationItem></div>

                    {/* --------------------------------------------------------- */}

                    <div className='col-md-3'><label> Ảnh: </label></div>
                    <div className='col-md-9'><MDBValidationItem feedback='Please provide a valid card url.' invalid>
                        <MDBInput
                            placeholder='Store Image URL' name='storeImageURL' className='form-control' value={store.storeImageURL} 
                            onChange={(e) => handleChange(e)}
                            required/>
                    </MDBValidationItem></div>

                    {/* --------------------------------------------------------- */}


                    <div className='col-md-3'><label> Số điện thoại: </label></div>
                    <div className='col-md-9'><MDBValidationItem feedback='Please provide a valid card phone.' invalid>
                        <MDBInput
                            placeholder='Số điện thoại' type='number' name='storePhone' className='form-control' value={store.storePhone} 
                            onChange={(e) => handleChange(e)}
                            required/>
                    </MDBValidationItem></div>


                    {/* --------------------------------------------------------- */}


                    <div className='col-md-3'><label> Email: </label></div>
                    <div className='col-md-9'><MDBValidationItem feedback='Please provide a valid card email.' invalid>
                        <MDBInput
                            placeholder='Email' name='storeEmail' className='form-control' value={store.storeEmail} 
                            onChange={(e) => handleChange(e)}
                            required/>
                    </MDBValidationItem></div>
                    {/* --------------------------------------------------------- */}

                    <div className='col-12'>
                        <MDBBtn type='submit' className='btn btn-info me-2' onClick={(e) => saveStore(e)}>Lưu</MDBBtn>
                        <MDBBtn type='reset' className='btn btn-danger me-2'>Đặt lại</MDBBtn>
                        <button className='btn btn-secondary me-2' onClick={()=>cancel()}> Hủy </button>
                    </div>
                </MDBValidation>
            </div>
            </div>

        </div>
        </div>
        <div className='pt-5' style={{backgroundColor: 'rgb(246, 239, 239)'}}></div>
        </>
    )
    }
    else{
        navigate("/login");
    }
}

export default AddNewStore;
