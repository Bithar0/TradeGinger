import React from 'react'
export default function Header({ onGoto, onSell }){
  return (
    <header className="px-5 py-3 border-b border-gray-200 bg-white sticky top-0 z-40">
      <div className="max-w-[1100px] mx-auto flex items-center gap-4">
        <a href="/" onClick={(e)=>{e.preventDefault();onGoto('/')}} className="font-extrabold text-xl">TradeGinger</a>
        <nav className="flex items-center gap-3 text-sm text-gray-700">
          <a href="/search" onClick={(e)=>{e.preventDefault();onGoto('/search')}}>Search</a>
          <a href="/map" onClick={(e)=>{e.preventDefault();onGoto('/map')}}>Map</a>
          <a href="/help" onClick={(e)=>{e.preventDefault();onGoto('/help')}}>Help</a>
          <a href="/admin" onClick={(e)=>{e.preventDefault();onGoto('/admin')}}>Admin</a>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <button className="btn" onClick={onSell}>Sell</button>
          <a href="/profile" onClick={(e)=>{e.preventDefault();onGoto('/profile')}} className="text-sm">Profile</a>
        </div>
      </div>
    </header>
  )
}
