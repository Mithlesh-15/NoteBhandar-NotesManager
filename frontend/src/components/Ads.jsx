import React, { useEffect } from 'react'

function Ads() {
    useEffect(() => {
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch (e) {
    console.log(e);
  }
}, []);
  return (
    <>
  <ins className="adsbygoogle"
     style={{ display: "block" }}
     data-ad-client={import.meta.env.VITE_ADS_CLIENT}
     data-ad-slot={import.meta.env.VITE_ADS_SLOT}
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
    </>
  )
}

export default Ads