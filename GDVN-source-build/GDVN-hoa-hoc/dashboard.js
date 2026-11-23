/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import {toolIcon} from './icons.js';
import {routes,set,$} from './modules.js';
import {normalize,escapeHTML as esc} from './chemistry.js';
import {curriculumTopics} from './curriculum-topics.js';
import {journeys,readProgress} from './learning-paths.js';
export function home(query=''){
  const normalized=query.trim();
  const tokens=text=>normalize(text).match(/[\p{L}\p{N}]+/gu)||[];
  const queryTokens=tokens(normalized);
  const gradeMatch=normalize(normalized).match(/\blop\s*(6|7|8|9|10|11|12)\b/);
  const grade=gradeMatch?.[1];
  const terms=grade?tokens(normalize(normalized).replace(gradeMatch[0],'')):queryTokens;
  const matches=text=>{
    const words=tokens(text);
    return terms.every(term=>words.some(word=>word===term||(term.length>2&&word.startsWith(term))));
  };
  const aliases={solution:'pH độ tan chuẩn độ',ionic:'độ tan kết tủa',knowledge:'pH sổ tay',periodic:'halogen bảng tuần hoàn',lab:'halogen thí nghiệm'};
  const topics=queryTokens.length?curriculumTopics.filter(topic=>
    (!grade||String(topic.grade)===grade)&&matches(topic.name+' '+topic.text)):[];
  const score=([id,,title,group,description])=>{
    if(matches(title))return 70;
    if(matches(aliases[id]||''))return 60;
    if(topics.some(topic=>topic.tools.includes(id)&&(grade||matches(topic.name))))return 50;
    return matches(title+' '+group+' '+description+' '+(aliases[id]||''))?20:0;
  };
  const filtered=routes.slice(1).filter(route=>!normalized||
    (queryTokens.length&&(!grade||topics.some(topic=>topic.tools.includes(route[0])))&&score(route)));
  if(normalized)filtered.sort((a,b)=>score(b)-score(a));
  const groups=[...new Set(routes.slice(1).map(route=>route[3]))];
  if(!normalized){
    const gradeLinks=Array.from({length:7},(_,index)=>'<a href="#knowledge?grade='+(index+6)+'">Lớp '+(index+6)+'</a>').join('');
    set('<section class="knowledge-start"><div class="knowledge-intro"><div><h1>Hóa học trực quan</h1><p>Tra cứu kiến thức và mở mô hình minh họa theo lớp.</p></div><div class="journey-emblem" aria-hidden="true">'+toolIcon('molecule')+'</div></div><nav class="grade-shortcuts" aria-label="Kiến thức theo lớp"><h2>Học theo lớp</h2><div>'+gradeLinks+'</div></nav></section>');
  }
  const title=normalized?'Kết quả cho “'+esc(normalized)+'”':'Danh mục công cụ';
  const visibleGroups=groups.filter(group=>filtered.some(route=>route[3]===group));
  const knowledgeResults=topics.length?'<details class="knowledge-matches" open><summary>Chủ đề kiến thức ('+topics.length+')</summary><ul>'+topics.map(topic=>{
    const params=new URLSearchParams({grade:String(topic.grade),term:topic.name});
    return '<li><a href="#knowledge?'+esc(params.toString())+'">'+esc(topic.name)+'</a><span>Lớp '+topic.grade+'</span></li>';
  }).join('')+'</ul></details>':'';
  set('<section class="directory" aria-labelledby="directory-title"><h2 id="directory-title">'+title+'</h2>'+knowledgeResults+'<div class="group-filters" aria-label="Lọc nhóm chức năng"'+(visibleGroups.length<2?' hidden':'')+'><button class="active" data-home-group="all" aria-pressed="true">Tất cả</button>'+visibleGroups.map(group=>'<button data-home-group="'+esc(group)+'" aria-pressed="false">'+esc(group)+'</button>').join('')+'</div><div id="directory-groups"></div></section>');
  if(!normalized){
    const progress=readProgress();
    set('<details class="home-journeys"><summary>Khám phá theo chủ đề</summary><ul>'+journeys.map(journey=>{
      const done=Array.isArray(progress[journey.id])?progress[journey.id]:[];
      const next=journey.steps.find(id=>!done.includes(id))||journey.steps[0];
      return '<li><a href="#'+next+'?path='+journey.id+'">'+journey.title+'</a></li>';
    }).join('')+'</ul></details>');
  }
  function renderGroups(selected='all'){
    const html=groups.filter(group=>selected==='all'||group===selected).map(group=>{
      const items=filtered.filter(route=>route[3]===group);if(!items.length)return '';
      return '<section class="topic-row"><div class="topic-intro"><h3>'+esc(group)+'</h3></div><div class="topic-tools">'+items.map(([id,icon,title,,description])=>'<a class="tool-entry" href="#'+id+'"><span class="tool-glyph" aria-hidden="true">'+toolIcon(id)+'</span><div><h4>'+esc(title)+'</h4><p>'+esc(description)+'</p></div></a>').join('')+'</div></section>';
    }).join('');
    $('directory-groups').innerHTML=html||'<p class="empty">Không tìm thấy công cụ phù hợp. Hãy thử tên chủ đề, công cụ hoặc lớp, ví dụ “pH” hay “lớp 8”.</p>';
  }
  document.querySelector('.group-filters').onclick=event=>{const button=event.target.closest('[data-home-group]');if(!button)return;document.querySelectorAll('[data-home-group]').forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});renderGroups(button.dataset.homeGroup);};
  renderGroups();
}
