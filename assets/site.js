const toggle=document.querySelector('.mobile-toggle');
const menu=document.querySelector('.menu');
if(toggle&&menu){toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});}

const measurementId='G-G5KYTZ3EV7';
window.dataLayer=window.dataLayer||[];
window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
window.gtag('consent','default',{
  ad_storage:'denied',
  ad_user_data:'denied',
  ad_personalization:'denied',
  analytics_storage:'denied',
  wait_for_update:500
});
window.gtag('js',new Date());
window.gtag('config',measurementId);
const googleTag=document.createElement('script');
googleTag.async=true;
googleTag.src=`https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
document.head.appendChild(googleTag);

const consentKey='servamatapuit-google-consent';
const setGoogleConsent=(granted)=>{
  window.gtag('consent','update',{
    ad_storage:granted?'granted':'denied',
    ad_user_data:granted?'granted':'denied',
    ad_personalization:granted?'granted':'denied',
    analytics_storage:granted?'granted':'denied'
  });
};
const savedConsent=localStorage.getItem(consentKey);
if(savedConsent){
  setGoogleConsent(savedConsent==='granted');
}else{
  const consent=document.createElement('div');
  consent.setAttribute('role','dialog');
  consent.setAttribute('aria-label','Küpsiste valik');
  consent.style.cssText='position:fixed;z-index:1000;left:16px;right:16px;bottom:16px;max-width:720px;margin:auto;padding:18px 20px;background:#fff;color:#173f32;border:1px solid #d6ddd9;border-radius:6px;box-shadow:0 10px 35px rgba(0,0,0,.2);font:500 15px/1.5 Manrope,Arial,sans-serif';
  consent.innerHTML="<strong style='display:block;margin-bottom:5px'>Küpsiste valik</strong><span>Kasutame Google Analyticsit veebilehe kasutuse ja reklaamide tulemuste mõõtmiseks. Nõustumine lubab analüütika- ja reklaamiküpsised.</span><div style='display:flex;flex-wrap:wrap;gap:10px;margin-top:14px'><button type='button' data-consent='granted' style='border:0;border-radius:4px;padding:10px 16px;background:#245c49;color:#fff;font:inherit;font-weight:800;cursor:pointer'>Nõustun</button><button type='button' data-consent='denied' style='border:1px solid #245c49;border-radius:4px;padding:9px 15px;background:#fff;color:#245c49;font:inherit;font-weight:800;cursor:pointer'>Ainult vajalikud</button></div>";
  consent.addEventListener('click',(event)=>{
    const button=event.target.closest('[data-consent]');
    if(!button)return;
    const value=button.dataset.consent;
    localStorage.setItem(consentKey,value);
    setGoogleConsent(value==='granted');
    consent.remove();
  });
  document.body.appendChild(consent);
}

const form=document.querySelector('[data-quote-form]');
if(form){
  form.addEventListener('submit',async(event)=>{
    event.preventDefault();
    const status=form.querySelector('.status');
    const button=form.querySelector('button[type="submit"]');
    if(!form.reportValidity())return;
    status.className='status';status.style.display='block';status.textContent='Saadan päringut…';button.disabled=true;
    try{
      const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
      const data=await response.json().catch(()=>({}));
      if(!response.ok||data.success===false)throw new Error('Saatmine ebaõnnestus');
      window.gtag('event','generate_lead',{currency:'EUR',value:1});
      form.reset();status.textContent='Aitäh! Päring on saadetud. Võtame sinuga peagi ühendust.';
    }catch(error){status.className='status error';status.textContent='Päringut ei õnnestunud saata. Palun kirjuta aadressile strumest@hotmail.com või helista +372 5552 3176.';}
    finally{button.disabled=false;}
  });
}
