import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const AddProduct = () => {
    const [categoriesData, setCategoriesData] = useState([]);
    const [userData, setUserData] = useState({});
    const { name: sellerName, role } = userData;
    const { user } = useContext(AuthContext);
    useEffect(() => {
        fetch(`https://market-thrifty-server.vercel.app/category`)
            .then(res => res.json())
            .then(data => {
                setCategoriesData(data)
            })
    }, []);

    useEffect(() => {
        fetch(`https://market-thrifty-server.vercel.app/users/add-product?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setUserData(data)
            })

    }, [user?.email])


    const navigate = useNavigate();


    const time = new Date().toDateString()

    const handelAddProduct = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.productName.value;
        const buyingPrice = form.buyingPrice.value;
        const sellingPrice = form.sellingPrice.value;
        const condition = form.condition.value;
        const phoneNumber = form.phone.value;
        const location = form.location.value;
        const purchaseYear = form.purchaseYear.value;
        const description = form.description.value;
        const img = form.photoURL.value;
        const categoryName = form.category.value;
        const sellerEmail = form.email.value

        const productDetail = {
            name,
            buyingPrice,
            sellingPrice,
            condition,
            phoneNumber,
            location,
            purchaseYear,
            description,
            sellerName,
            img,
            categoryName,
            postedTime: time,
            sellerEmail,
            role
        }

        fetch(`https://market-thrifty-server.vercel.app/allphones`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(productDetail)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Product Added Successfully');
                navigate('/dashboard/my-products');
                form.reset();
            })

    }

    return (
        <div className='my-10'>
            <section className="p-6 bg-gray-400 text-gray-900 rounded-lg">
                <form onSubmit={handelAddProduct} className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
                    <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-200">
                        <div className="space-y-2 col-span-full lg:col-span-1">
                            <p className="font-medium">Add A Product</p>
                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="productName" className="text-sm">Product Name</label>
                                <input id="productName" name='productName' type="text" placeholder="Product Name" className="w-full p-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="sellingPrice" className="text-sm">Selling Price</label>
                                <input id="sellingPrice" name='sellingPrice' type="number" placeholder="Selling Price" className="w-full p-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="buyingPrice" className="text-sm">Buying Price</label>
                                <input id="buyingPrice" type="number" placeholder="Buying Price" className="w-full p-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                            </div>
                            <div className="col-span-full sm:col-span-2">
                                <label htmlFor="zip" className="text-sm">Category</label>
                                <select name='category' className="select select-bordered text-gray-900 w-full p-2 max-w-xs">
                                    <option value="Select Category"> Select Category</option>
                                    {
                                        categoriesData.map(category => {
                                            return <option
                                                key={category._id}
                                            >
                                                {category.name}
                                            </option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="photoURL" className="text-sm">Photo URl</label>
                                <input id="photoURL" name='photoURL' type="url" placeholder="Photo URL" className="w-full p-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                            </div>
                            <div className="col-span-full sm:col-span-2">
                                <label htmlFor="location" className="text-sm">Location</label>
                                <input id="location" name='location' type="text" placeholder="Location" className="w-full p-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                            </div>
                            <div className="col-span-full sm:col-span-2">
                                <label htmlFor="purchaseYear" className="text-sm">Purchase Year</label>
                                <input id="purchaseYear" name='purchaseYear' type="tel" placeholder="Purchase Year" className="w-full p-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                            </div>
                            <div className="col-span-full sm:col-span-2">
                                <label htmlFor="zip" className="text-sm">Condition</label>
                                <select name='condition' className="select  select-bordered text-gray-900 w-full p-2 max-w-xs">
                                    <option selected>Good</option>
                                    <option>Excellent</option>
                                    <option>Fair</option>
                                </select>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-200">
                        <div className="space-y-2 col-span-full lg:col-span-1">
                            <p className="font-medium">Seller Detail</p>
                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="username" className="text-sm">Username</label>
                                <input id="username" name='userName' type="text" placeholder="Username" disabled defaultValue={sellerName} className="w-full rounded-md p-2 focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="phone" className="text-sm">Phone Number</label>
                                <input id="phone" type="tel" placeholder="Phone Number" className="w-full p-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="email" className="text-sm">Email</label>
                                <input id="email" type="email" disabled defaultValue={user?.email} placeholder="Email" className="w-full p-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900" />
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="description" className="text-sm">Description</label>
                                <textarea id="description" name='description' placeholder="Description" className="w-full p-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"></textarea>
                            </div>
                            <div className="col-span-full ">
                                <button className='btn block w-full'>Add Product</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </section>
        </div>
    );
};

export default AddProduct;