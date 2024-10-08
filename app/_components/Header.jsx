import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Link from "next/link";

function Header() {
  return (
    <div className='fixed w-full z-90 shadow-sm bg-white'>
      <div className='mx-6 md:mx-20 py-5  flex justify-between'>
        <div className='flex items-center gap-8'>
          <Link href='/'>
            <Image src="/fixn.svg" alt="logo" width={100} height={100} />
          </Link>
        </div>
        <div className='flex items-center gap-8'> 
          <div className='md:flex items-center gap-6 hidden text-black'>
            <Link href='/'>
              <h2 className='hover:scale-105 hover:text-primary cursor-pointer'>Home</h2>
            </Link>
            <Link href='/services'>
              <h2 className='hover:scale-105 hover:text-primary cursor-pointer'>Services</h2>
            </Link>
            <Link href='/login'>
              <h2 className='hover:scale-105 hover:text-primary cursor-pointer'>Login</h2>
            </Link>
          </div>
          <Button className="hover:bg-white hover:scale-105 hover:border-primary hover:text-primary border-2 border-transparent cursor-pointer">
            Become a Fixer
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
