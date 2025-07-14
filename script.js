document.addEventListener('DOMContentLoaded',()=>{

/* ----------------------------- ① カード定義 ----------------------------- */
const cards = {
  ume_kinpira:{
    slug:'ume_kinpira', title:'梅きんぴらごぼう',
    catchMain:'情熱スパーク',
    catchSub:'― 瞬間を燃やし、行動で道を切り拓く ―'
  },
  komatsuna_salmon_cheese:{
    slug:'komatsuna_salmon_cheese', title:'小松菜と炙り鮭チーズ',
    catchMain:'調和のコンダクター',
    catchSub:'― みんなの気持ちを絶妙にまとめる潤滑油 ―'
  },
  yamawasabi_creamcheese:{
    slug:'yamawasabi_creamcheese', title:'山わさびとクリームチーズ',
    catchMain:'刺激を纏う冒険家',
    catchSub:'― 未知を愉しみ、日常にスパイスを振りかける ―'
  },
  potato_curry:{
    slug:'potato_curry', title:'じゃがいもとカレーそぼろ',
    catchMain:'陽だまりムードメーカー',
    catchSub:'― 笑顔と元気をふわっと振りまく太陽系 ―'
  },
  oba_miso:{
    slug:'oba_miso', title:'大葉みそ',
    catchMain:'涼風リセット',
    catchSub:'― 空気を整え、瑞々しい発想を吹き込む ―'
  },
  double_konbu:{
    slug:'double_konbu', title:'ダブル昆布',
    catchMain:'海の包容力',
    catchSub:'― 静かに支え、周囲をまろやかに包み込む ―'
  }
};

/* -------------------------- ② ラッキー要素 -------------------------- */
const luckyColors = [
  {name:'桜ピンク',code:'#F78DA7'},{name:'夕焼けオレンジ',code:'#FF8C42'},
  {name:'檸檬イエロー',code:'#FFD447'},{name:'若葉グリーン',code:'#8DCB5E'},
  {name:'空色ブルー',code:'#5AB5EF'},{name:'藤パープル',code:'#B38BD8'}
];
const luckyItems = [
  '木製の箸置き','エコバッグ','アロマキャンドル',
  '万年筆インク','和紙の付箋','ミニ観葉植物'
];
const pick = arr => arr[Math.floor(Math.random()*arr.length)];

/* ------------------------- ③ DOM キャッシュ ------------------------- */
const hero   = document.getElementById('start');
const quiz   = document.getElementById('quiz');
const result = document.getElementById('result');
const form   = document.getElementById('fortuneForm');
document.getElementById('startBtn').onclick = ()=>{hero.style.display='none';quiz.style.display='block';};
document.getElementById('againBtn').onclick = ()=>{form.reset();result.style.display='none';hero.style.display='flex';};

/* --------------------------- ④ ブースト表 --------------------------- */
const tasteBoost = {
  A:['double_konbu','oba_miso'],          // 甘め
  B:['komatsuna_salmon_cheese','ume_kinpira'], // 塩気強め
  C:['yamawasabi_creamcheese','potato_curry']  // ピリ辛
};
const riceBoost = {
  A:['yamawasabi_creamcheese','ume_kinpira'],  // かため
  C:['potato_curry','oba_miso']                // やわらか
};
const drinkBoost = {
  A:['ume_kinpira','double_konbu'],            // 温かい
  B:['komatsuna_salmon_cheese','oba_miso'],    // 水
  C:['yamawasabi_creamcheese','potato_curry']  // 炭酸
};
const volBoost = {
  A:['potato_curry','yamawasabi_creamcheese','ume_kinpira'], // ガッツリ
  B:['double_konbu','oba_miso'],                              // 満腹
  C:['komatsuna_salmon_cheese','double_konbu']                // 小腹
};

/* -------------------------- ⑤ メインロジック -------------------------- */
form.addEventListener('submit',e=>{
  e.preventDefault();
  const q1=form.q1.value, q2=form.q2.value, q3=form.q3.value,
        q4=form.q4.value, q5=form.q5.value, q6=form.q6.value;

  /* 1) 海苔 × 冒険度で候補セット */
  let candidates=[];
  if(q3==='A'){ // パリパリ
    if(q5==='C'){ // 伝統派
      candidates=['ume_kinpira','komatsuna_salmon_cheese'];
    }else{
      candidates=['yamawasabi_creamcheese','komatsuna_salmon_cheese'];
    }
  }else if(q3==='B'){ // しっとり
    if(q5==='C'){
      candidates=['komatsuna_salmon_cheese'];
    }else{
      candidates=['potato_curry'];
    }
  }else{ // 海苔なし
    if(q5==='C'){
      candidates=['double_konbu','komatsuna_salmon_cheese'];
    }else{
      candidates=['oba_miso','komatsuna_salmon_cheese'];
    }
  }

  /* 2) 各カードに重み付け */
  const weights={};
  candidates.forEach(c=>weights[c]=1);           // 基本 1
  tasteBoost[q6]?.forEach(c=>weights[c]&&(weights[c]+=2));
  riceBoost[q4]?.forEach(c=>weights[c]&&(weights[c]+=1));
  drinkBoost[q2]?.forEach(c=>weights[c]&&(weights[c]+=1));
  volBoost[q1]?.forEach(c=>weights[c]&&(weights[c]+=1));

  /* 3) 重みに応じて抽選 */
  const pool=[];
  Object.entries(weights).forEach(([k,w])=>{
    for(let i=0;i<w;i++) pool.push(k);
  });
  const resKey = pool[Math.floor(Math.random()*pool.length)];
  const res = cards[resKey];

  /* 4) ラッキー要素 */
  const color = pick(luckyColors);
  const item  = pick(luckyItems);

  /* 5) 結果描画 */
  const img=document.getElementById('resultImg');
  img.src=res.slug+'.jpg';
  img.alt=res.title;

  document.getElementById('resultTitle').textContent   = res.title;
  document.getElementById('catchMain').textContent     = res.catchMain;
  document.getElementById('catchMain').style.color     = color.code;
  document.getElementById('catchSub').textContent      = res.catchSub;
  document.getElementById('luckyColorName').textContent= color.name;
  document.getElementById('luckyColorName').style.color= color.code;
  document.getElementById('luckyItem').textContent     = item;

  quiz.style.display='none';
  result.style.display='block';
});

/* ----------------------- ⑥ シンプルなエラーハンドラ ----------------------- */
window.addEventListener('error',ev=>{
  const pre=document.createElement('pre');
  pre.style.color='red';
  pre.textContent='エラーが発生しました:\\n'+ev.message;
  document.body.innerHTML='';
  document.body.appendChild(pre);
});

}); // DOMContentLoaded
