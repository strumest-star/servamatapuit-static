const toggle=document.querySelector('.mobile-toggle');
const menu=document.querySelector('.menu');
if(toggle&&menu){toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});}
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
      form.reset();status.textContent='Aitäh! Päring on saadetud. Võtame sinuga peagi ühendust.';
    }catch(error){status.className='status error';status.textContent='Päringut ei õnnestunud saata. Palun kirjuta aadressile strumest@hotmail.com või helista +372 5552 3176.';}
    finally{button.disabled=false;}
  });
}
