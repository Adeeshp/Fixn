import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

function CategoryList({ categoryList }) {
  return (
    <div className='mx-4 md:mx-22 lg:mx-52 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
      {categoryList.length > 0 ? categoryList.map((category, index) => (
        <Link href={'/search/' + category.categoryName} key={index} className={`flex flex-col items-center
             justify-center gap-2
             bg-blue-50 p-5 rounded-lg
             cursor-pointer hover:bg-blue-100 hover:scale-110 transition-all ease-in-out
             `}>
          <Image
            src={category.icon || '/default-image.png'}
            alt={category.categoryName}
            width={35}
            height={35}
          />
          <h2 className='text-secondary'>{category.categoryName}</h2>
        </Link>
      )) : 
        [1,2,3,4,5,6].map((item,index)=>(
            // <div key={index} className='h-[120px] w-full bg-slate-200 animate-pulse rounded-lg'></div>
            <div key={index} className="w-full h-[105px] bg-slate-200 rounded-lg animate-pulse flex items-center justify-center">
              <Image
                src="/fixn.svg"
                alt="fixn-logo"
                width={60}
                height={60}
                className="filter grayscale"
              />
            </div>
        ))
      }
    </div>
  );
}

export default CategoryList;
