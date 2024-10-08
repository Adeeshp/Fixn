import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Link from "next/link";  // Import Link component

function Header() {
  return (
    <div className='p-5 shadow-sm flex'>
      <div className='flex items-center gap-8 justify-between'>
        <Image src="/fixn.svg" alt="logo" width={80} height={80} />
        <div className='md:flex items-center gap-6 hidden'>
          <h2 className='hover:scale-105 hover:text-primary cursor-pointer'>Home</h2>
          <h2 className='hover:scale-105 hover:text-primary cursor-pointer'>Services</h2>
          <h2 className='hover:scale-105 hover:text-primary cursor-pointer'>About Us</h2>
        </div>
        <Button >Get Started</Button>
      </div>
    </div>
  );
}

export default Header;
