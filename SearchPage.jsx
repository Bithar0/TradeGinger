import React, { useEffect, useState } from 'react'
export default function SearchPage(){
  const [rows,setRows]=useState([]); const [q,setQ]=useState(''); const [loading,setLoading]=useState(false)
  async function search(){ setLoading(true); const r=await fetch('/.netlify/functions/search?q='+encodeURIComponent(q)); const j=await r.json(); setRows(j.items||[]); setLoading(false) }
  useEffect(()=>{ search() }, [])
  return (<main className="max-w-[1100px] mx-auto p-6"><h1 className="text-3xl font-bold mb-4">Search</h1><div className="flex gap-2 mb-3"><input value={q} onChange={(e)=>setQ(e.target.value)} className="border rounded-md p-2" placeholder="Search..."/><button className="btn" onClick={search}>Go</button></div>{loading&&'Loading…'}<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{rows.map(it=>(<a key={it.id} href={'/l/'+it.id} className="card p-4"><div className="font-semibold">{it.title}</div><div className="text-sm text-gray-500">₹ {new Intl.NumberFormat('en-IN').format(it.price||0)}</div></a>))}</div></main>)
}
