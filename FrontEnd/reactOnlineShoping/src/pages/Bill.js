import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ResTableServices from '../services/ResTableService';
import { useParams } from "react-router-dom";
import CustomerService from "../services/CustomerService";

const Bill = () => {

    const params = useParams();
    const [table, setTable] = useState([]);
    const [customer, setCustomer] = useState([]);

    useEffect(() => {
        ResTableServices.getResTablesById(params.id).then((response) => {
            setTable(response.data);
        })
    }, []);

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let data = { ...table };
        data[name] = value;
        setTable(data);
      };

      const handleChangeCustomer = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let data = { ...customer };
        data[name] = value;
        setCustomer(data);
      };

      const updateTable = () => {
        // EmpServices.updateBranch(params.branchId,branch);
        ResTableServices.updateResTables(params.id, table).then(res => {
          console.log("update success!");
        });

        CustomerService.addNewCustomer(customer).then((res) =>{
            console.log("add customer success!");
        })
      }


    return (
        <>
            <div class='container-fluid'>
                <div class='row'>
                    <div class="col-6 col-sm-6 col-md-6 ">
                        <section style={{ paddingTop: "7rem", }}></section>
                        <div class='border'>
                            <h1 class="text-center">Thông tin khách hàng</h1>

                            <form>

                                <div className='form-group'>
                                    <section style={{ paddingTop: "2rem", }}></section>
                                    <input placeholder='Name:' name='customerName' className='form-control' value={customer.customerName} onChange={(e) => handleChangeCustomer(e)}>
                                    </input>
                                </div>

                                <div className='form-group'>
                                    <section style={{ paddingTop: "2rem", }}></section>
                                    <input placeholder='Address:' name='customerAddress' className='form-control' value={customer.customerAddress} onChange={(e) => handleChangeCustomer(e)}>
                                    </input>
                                </div>
                                <section style={{ paddingTop: "2rem", }}></section>
                                <input placeholder='Phone' name='customerPhone' className='form-control'  value={customer.customerPhone} onChange={(e) => handleChangeCustomer(e)}>
                                </input>

                                <section style={{ paddingTop: "2rem", }}></section>
                                <input placeholder='Card Number' name='customerCardNumber' className='form-control'  value={customer.customerCardNumber} onChange={(e) => handleChangeCustomer(e)}>
                                </input>

                                <section style={{ paddingTop: "2rem", }}></section>
                                <div className='text-center'>
                                    <button className='btn btn-info' onClick={()=> updateTable()}>  <Link to={'/table'} className='nav-link'>Save</Link> </button> <span> </span>
                                    <button className='btn btn-secondary'><Link to={'/cashier'} className='nav-link'> Back</Link> </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class='col-6 col-sm-6 col-md-6 '>
                        <section style={{ paddingTop: "7rem", }}></section>
                        <div class='border'>
                            <h1 class="text-center">Thông tin bàn đã chọn</h1>

                            <form>

                                <div className='form-group'>
                                    <section style={{ paddingTop: "2rem", }}></section>
                                    <p placeholder='ID Table' name='idTable' className='form-control' > {params.id}
                                    </p>
                                </div>

                                <div className='form-group'>
                                    <section style={{ paddingTop: "2rem", }}></section>
                                    <p placeholder='NameTable:' name='NameTable' className='form-control'> {table.tableName}
                                    </p>
                                </div>
                                <section style={{ paddingTop: "2rem", }}></section>
                                <p placeholder=' TableCapacity:' name='TableCapacity' className='form-control'> {table.restableCapacity}
                                </p>

                                <div className='form-group'>
                                    <td>
                                        <select
                                            name="restableStatus"
                                            value={table.restableStatus}
                                            onChange={(e) => handleChange(e)}
                                            className='rounded-3'
                                        >
                                            <option value={true}>
                                                <span> Có sẵn </span>
                                            </option>

                                            <option value={false}>
                                                <span> Đã đặt </span>
                                            </option>
                                        </select>
                                    </td>
                                </div>
                                <section style={{ paddingTop: "2rem", }}></section>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Bill;