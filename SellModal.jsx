import React from 'react'
import { supabase } from '../supabaseClient'
export default function SellModal({ open, onClose }){
  const [loading,setLoading]=React.useState(false); const [err,setErr]=React.useState('')
  if(!open) return null
  async function submit(e){
    e.preventDefault(); setLoading(true); setErr('')
    const fd=new FormData(e.currentTarget)
    const payload={ id:'ad-'+Date.now(), title:fd.get('title')||'', price:parseInt(fd.get('price')||'0',10), category:fd.get('category')||'misc', location:fd.get('location')||'', condition:fd.get('condition')||'', brand:fd.get('brand')||'' }
    try{
      const { data:{ session } } = await supabase.auth.getSession()
      const token=session?.access_token
      const res=await fetch('/.netlify/functions/create-listing',{ method:'POST', headers:{'Content-Type':'application/json', ...(token?{Authorization:`Bearer ${token}`}:{})}, body: JSON.stringify(payload)})
      if(!res.ok) throw new Error(await res.text())
      alert('Listing submitted for review.')
      onClose && onClose()
    }catch(e){ setErr(String(e.message||e)) } finally { setLoading(false) }
  }
  return (<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"><div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-5"><div className="flex items-center justify-between mb-3"><h3 className="text-lg font-semibold">Create listing</h3><button onClick={onClose} className="text-gray-500">✕</button></div>{err&&<div className="text-red-600 text-sm mb-2">{err}</div>}<form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-3"><label className="text-sm">Title<input name="title" className="w-full mt-1 border rounded-md p-2" required/></label><label className="text-sm">Price (₹)<input type="number" name="price" className="w-full mt-1 border rounded-md p-2" required/></label><label className="text-sm">Category<select name="category" className="w-full mt-1 border rounded-md p-2"><option>Mobiles</option><option>Electronics</option><option>Furniture</option><option>Cars</option><option>misc</option></select></label><label className="text-sm">Location<input name="location" className="w-full mt-1 border rounded-md p-2"/></label><label className="text-sm">Condition<select name="condition" className="w-full mt-1 border rounded-md p-2"><option value="">—</option><option value="new">New</option><option value="like_new">Like New</option><option value="good">Good</option><option value="fair">Fair</option></select></label><label className="text-sm">Brand<input name="brand" className="w-full mt-1 border rounded-md p-2"/></label><div className="sm:col-span-2 flex items-center justify-end gap-2 mt-2"><button type="button" onClick={onClose} className="px-4 py-2 border rounded-md">Cancel</button><button disabled={loading} className="px-4 py-2 bg-[#b5892f] text-white rounded-md">{loading?'Posting…':'Post'}</button></div></form></div></div>)
}
