import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../App';
import { DLT } from "./redux/action";
import { useDispatch } from "react-redux/es/exports";

const Cart = (props) => {
    let navigate = useNavigate();
    const getCartItems = useContext(CartContext);
    const dispatch = useDispatch();
    const [amount, setAmount] = useState(1);

    const dlt = (id) => {
        dispatch(DLT(id));
        console.log('ok')
    }
    
    const handleAmount = (e) =>{
        setAmount(e.target.value);
        console.log(amount);
    }

    const getTotal = () => {
        let sum = 0;
        for (let item of getCartItems) {
            sum += item.productNewPrice * amount;
        }
        return sum.toLocaleString("en-US");
    };
    var carts_jsx = '';
    if (getCartItems.length > 0) {
        carts_jsx = getCartItems.map((item, key) => (
            <tr key={key}>
                <td>{key + 1}</td>
                <td>
                    <input value={amount} onChange={(e) => handleAmount(e)} style={{width: '50%'}}></input>
                </td>
                <td><Link to={'/product/'+item.productId}><img src={item.productImage} height='100px' /></Link> </td>
                <td>{item.productName}</td>
                <td className="text-right">{item.productNewPrice.toLocaleString("en-US")} vnđ</td>
                <td className="text-right">{(item.productNewPrice * amount).toLocaleString("en-US")} vnđ</td>
                <td className="text-center">
                    <button
                        className="btn btn-sm btn-danger"
                        onClick={() => dlt(item.productId)}
                    >
                        Remove
                    </button>
                </td>
            </tr>
        ));
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col mt-2">
                    <h2 className="text-center">Giỏ hàng của bạn</h2>
                    <table className="table table-bordered table-striped p-2">
                        <thead>
                            <tr>
                                <th width='40px'>STT</th>
                                <th width='80px'>SL</th>
                                <th width='250px'>Ảnh</th>
                                <th width='600px'>Sản phẩm</th>
                                <th className="text-right" width='180px'>Đơn giá</th>
                                <th className="text-right" width='180px'>Tổng tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getCartItems.length == 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        Your cart is empty
                                    </td>
                                </tr>
                            ) : (
                                ''
                            )}
                            {carts_jsx}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <th colSpan="3" className="text-right">
                                    Thanh toán:
                                </th>
                                <th colSpan="2" className="text-right">{getTotal()} vnđ</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="text-center">
                        <button className="btn btn-primary m-1" onClick={() => navigate(-1)}>
                            Tiếp tục mua sắm
                        </button>
                        <Link to={'/payment'}>
                        <button className="btn btn-danger m-1" type="button">
                            Thanh toán
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
