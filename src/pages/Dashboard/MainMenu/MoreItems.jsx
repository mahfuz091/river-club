import React, { useState } from "react";

const MoreItems = ({ op }) => {
  return (
    <div className='flex items-baseline justify-between pt-[8px] gap-[14px]  pr-[10px] lg:pr-0 '>
      <h2>{op.data.name}</h2>
      <div className='flex items-center'>
        <p className='price mr-[116px]'>{op.data.price} Dhs</p>
      </div>
    </div>
  );
};

export default MoreItems;
