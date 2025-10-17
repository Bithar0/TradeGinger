import React from 'react'
export default function RazorpayScript(){ React.useEffect(()=>{ if(!document.getElementById('rzp')){ const s=document.createElement('script'); s.id='rzp'; s.src='https://checkout.razorpay.com/v1/checkout.js'; document.body.appendChild(s) } },[]); return null }
export function openRazorpay({ amount, email }){
  const key = window.RAZORPAY_KEY_ID || import.meta.env.VITE_RAZORPAY_KEY_ID || ''
  if (!key || !window.Razorpay) { alert('Payment unavailable'); return }
  const rzp = new window.Razorpay({ key, amount: Math.round(amount*100), currency:'INR', name:'TradeGinger Credits', description:'Top-up', prefill:{ email }, theme:{ color:'#b5892f' }, handler:(r)=>alert('Payment success: '+r.razorpay_payment_id) })
  rzp.open()
}
