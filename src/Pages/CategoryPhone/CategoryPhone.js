import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from './BookingModal';
import PhoneCard from './PhoneCard';

const CategoryPhone = () => {
    const data = useLoaderData();
    const [addedPhone, setAddedPhone] = useState('');

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10'>
                {
                    data.map(phone => <PhoneCard
                        key={phone._id}
                        phone={phone}
                        setAddedPhone={setAddedPhone}
                    ></PhoneCard>)
                }
                {
                    data && <BookingModal
                        addedPhone={addedPhone}
                        setAddedPhone={setAddedPhone}
                    ></BookingModal>
                }
            </div>
        </div>
    );
};

export default CategoryPhone;