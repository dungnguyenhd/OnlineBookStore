import React from 'react';
import { Link } from 'react-router-dom';
import { AnimatedInput } from './searchScript';

export default function SearchBar() {

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container pb-2">
                        <span>
                            <Link to="/" className="link-icon">
                                <img className="img-fluid"
                                    src='https://i.imgur.com/N9Kg4e1.png'
                                    style={{ width: "58px", height: "50px" }}
                                ></img>
                                <span className='font-weight-bold'> Shopdee</span>
                            </Link>
                        </span>

                        <span>

                            <form className="d-flex">
                                <div className="input-group">
                                    <AnimatedInput  style={{width: '900px'}} placeholder="Search something...type here...example: hello world" />
                                    <button type="button" className="btn btn-primary">
                                        <i className="fa fa-search"></i>
                                    </button>
                                </div>
                            </form>
                        </span>

                        <span> <i class="fas fa-shopping-cart"></i></span>
                    </div>
            </nav>
        </>
    );
}