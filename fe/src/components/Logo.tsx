import Link from 'next/link';
import React from 'react'

function Logo({href="/"}: {href: string}) {
  return (
    <Link href={href} className="flex items-center gap-1">
      <img src="/logo.png" alt="" className="w-5" />
      <p className="text-[20px] font-black  tracking-[-0.06em] ">moment</p>
    </Link>
  );
}

export default Logo