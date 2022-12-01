import React, { useEffect, useState } from 'react';
import AdvertisedCard from './AdvertisedCard';

const AdvertisedProduct = () => {

    const [advertisedProduct, setAdvertisedProduct] = useState([]);

    useEffect(() => {
        fetch(`https://market-thrifty-server.vercel.app/advertised-product`, {
            headers: {
                authorization: `bearer ${localStorage.getItem("marketThrifty-token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setAdvertisedProduct(data)
            })
    }, [])

    return (
        <div>

            {advertisedProduct?.length > 0 &&
                <>
                    <h1 className='font-bold text-center text-4xl my-10'>Advertised Product</h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10'>
                        {advertisedProduct?.length > 0 &&
                            advertisedProduct?.map(product => <AdvertisedCard
                                key={product._id}
                                product={product}
                            >
                            </AdvertisedCard>)
                        }
                    </div>
                </>
            }
        </div>
    );
};

export default AdvertisedProduct;