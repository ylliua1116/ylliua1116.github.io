'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window { goatcounter?: {no_onload?: boolean; count?: () => void}; }
}

/** No service is contacted unless the owner explicitly provides a site code.
 * The script counts visits in a static Next.js/GitHub Pages site, including client-side routes.
 */
export default function GoatCounterTracker({code}: {code: string}) {
  const pathname = usePathname();
  const lastPath = useRef<string|null>(null);
  useEffect(() => {
    if (!/^[a-zA-Z0-9-]+$/.test(code) || !code) return;
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') return;
    if (!window.goatcounter) window.goatcounter = {no_onload: true};
    else window.goatcounter.no_onload = true;
    let canceled = false;
    const script = document.createElement('script');
    script.src='https://gc.zgo.at/count.js';
    script.async=true;
    script.setAttribute('data-goatcounter',`https://${code}.goatcounter.com/count`);
    script.setAttribute('data-goatcounter-settings',JSON.stringify({no_onload:true}));
    script.onload=()=>{if (!canceled) {window.goatcounter?.count?.(); lastPath.current=location.pathname;}};
    document.head.appendChild(script);
    return ()=>{canceled=true;script.remove();};
  },[code]);
  useEffect(()=>{
    if(!code || location.hostname==='localhost' || location.hostname==='127.0.0.1') return;
    if(lastPath.current && lastPath.current!==pathname){
      window.goatcounter?.count?.();
      lastPath.current=pathname;
    }
  },[code,pathname]);
  return null;
}
