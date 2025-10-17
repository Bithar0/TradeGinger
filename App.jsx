import React from 'react'
import Header from './components/Header.jsx'
import RazorpayScript from './components/RazorpayScript.jsx'
import SellModal from './components/SellModal.jsx'
import HomePage from './pages/HomePage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import MapSearch from './pages/MapSearch.jsx'
import AdminPage from './pages/AdminPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import ListingDetail from './pages/ListingDetail.jsx'
import SellerProfile from './pages/SellerProfile.jsx'
import HelpPage from './pages/HelpPage.jsx'

function useRouter(){
  const [path,setPath]=React.useState(window.location.pathname)
  React.useEffect(()=>{const onPop=()=>setPath(window.location.pathname); window.addEventListener('popstate',onPop); return()=>window.removeEventListener('popstate',onPop)},[])
  function goto(p){ if(p===path) return; window.history.pushState({},'',p); setPath(p) }
  return { path, goto }
}

export default function App(){
  const { path, goto } = useRouter()
  const [sellOpen,setSellOpen]=React.useState(false)
  return (<div>
    <Header onGoto={goto} onSell={()=>setSellOpen(true)} />
    {path==='/' && <HomePage />}
    {path==='/search' && <SearchPage />}
    {path==='/map' && <MapSearch />}
    {path==='/admin' && <AdminPage />}
    {path==='/profile' && <ProfilePage />}
    {path.startsWith('/l/') && <ListingDetail />}
    {path.startsWith('/u/') && <SellerProfile />}
    {path==='/help' && <HelpPage />}
    <SellModal open={sellOpen} onClose={()=>setSellOpen(false)} />
    <RazorpayScript />
  </div>)
}
