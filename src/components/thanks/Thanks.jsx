import React from 'react';
import './Thanks.css';

export function Thanks({ translates }) {
    const mainContent = translates.thnks_1;
    const afterContent = translates.thnks_2;



    return (
        <div
            className="box text-center lg:text-6xl text-5xl"
            id="box1"

            style={{ '--thanks-message': `'${afterContent}'` }}
        >
            {mainContent}
        </div>
    );
}