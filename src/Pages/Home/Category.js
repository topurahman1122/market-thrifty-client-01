import React from 'react';
import { Link } from 'react-router-dom';

const Category = ({ category }) => {
    const { name } = category
    return (
        <div>
            <Link to={`/category/${name}`}>
                <button className="btn btn-outline btn-primary">{name}</button>
            </Link>
        </div>
    );
};

export default Category;