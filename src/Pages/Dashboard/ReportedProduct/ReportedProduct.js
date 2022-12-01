import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const ReportedProduct = () => {

    const [reportedProduct, setReportedProduct] = useState([])

    useEffect(() => {
        fetch('https://market-thrifty-server.vercel.app/reported-product')
            .then(res => res.json())
            .then(data => {
                setReportedProduct(data)
            })
    }, [])

    const handelDelete = (id) => {
        const agree = window.confirm('Are You sure to delete this seller?');
        if (agree) {
            fetch(`https://market-thrifty-server.vercel.app/reported-del/${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success(`Product deleted successfully`);
                        const remaining = reportedProduct.filter(rp => rp._id !== id);
                        setReportedProduct(remaining);
                    }
                })
        }
    }

    return (
        <div>
            <h1 className='font-semibold text-4xl my-6'>Reported Product : {reportedProduct.length}</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Seller Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reportedProduct?.map((rp, i) => <tr key={rp._id} className="hover">
                                <th>{i + 1}</th>
                                <td>{rp.name}</td>
                                <td>{rp.sellerName}</td>
                                <td>
                                    <button
                                        onClick={() => handelDelete(rp._id)}
                                        className="btn btn-xs btn-outline btn-error">Delete</button>
                                </td>

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportedProduct;