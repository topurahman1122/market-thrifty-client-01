import React from 'react';
import VerifyIcon from '../Shared/VerifyIcon';

const AdvertisedCard = ({ product }) => {
    const { buyingPrice, condition, description, img, location, name, phoneNumber, postedTime, purchaseYear, sellerName, sellingPrice, role } = product;
    return (
        <div>
            <div>
                <div className="flex flex-col max-w-lg p-6 space-y-6 shadow-xl overflow-hidden rounded-lg  bg-gray-300 text-gray-900">
                    <div className="flex space-x-4">
                        <div className="flex flex-col text-sm font-semibold space-y-1">
                            <div className='flex'>
                                <span className='mr-2'>{sellerName}</span>
                                <span> {role === "verified" && <VerifyIcon></VerifyIcon>}</span>
                            </div>
                            <span className="text-xs text-gray-900">Posted On: {postedTime}</span>
                        </div>
                    </div>
                    <div>
                        <img src={img} alt="" className="object-cover rounded-lg w-full mb-4 h-60 sm:h-96 bg-gray-500" />
                        <h2 className="mb-1 text-xl font-semibold">{name}</h2>
                        <p className="text-sm text-gray-900">{description}</p>
                        <div className='font-semibold grid grid-cols-2 mt-2'>
                            <p className='text-gray-900'>Buying Price : <span className='text-cyan-600 font-bold'>${buyingPrice}</span></p>
                            <p className='text-gray-900'>Selling Price : <span className='text-cyan-600 font-bold'>${sellingPrice}</span></p>
                            <p className='mt-2 text-gray-900'>Purchase Year : <span className='text-cyan-600 font-bold'>{purchaseYear}</span></p>
                            <p className='mt-2 text-gray-900'>Condition : <span className='text-cyan-600 font-bold'>{condition}</span></p>
                            <p className='mt-2 text-gray-900'>Location : <span className='text-cyan-600 font-bold'> {location}</span></p>
                            <p className='mt-2 text-gray-900'>Mobile : <span className='text-cyan-600'> {phoneNumber}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvertisedCard;