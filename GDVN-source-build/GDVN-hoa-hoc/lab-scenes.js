/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
const flask='<path fill="url(#lab-glass)" d="M112 42h36v14h-7v34l35 54q6 16-10 16H94q-16 0-10-16l35-54V56h-7z"/><path fill="url(#lab-liquid)" d="M102 119h56l16 28q3 9-8 9H94q-11 0-8-9z"/>';
const flame='<g class="lab-flame" stroke="none"><ellipse cx="129" cy="175" rx="32" ry="28" fill="url(#lab-glow)"/><path fill="url(#lab-flame-color)" d="M128 193c-14-1-19-12-13-24 2 8 6 5 9-2 4-7 6-13 5-20 10 13 18 26 12 37-2 6-7 9-13 9z"/><path fill="#fff4ca" opacity=".85" d="M128 190c-6-3-5-10 2-20 6 9 6 17-2 20z"/></g>';
const dryTube='<path stroke="url(#lab-metal)" stroke-width="6" d="M51 42v143m-27 0h54M51 82h61"/><g transform="rotate(-12 109 88)"><path d="M161 73H62a14 14 0 0 0 0 28h99z" fill="url(#lab-glass)"/><path d="M157 77H65a10 10 0 0 0-9 5" stroke="#e6f9ff" opacity=".85"/><path d="M58 96h38l-8-6-7 3-6-5-7 5-6-2z" fill="var(--lab-solid,#7545a2)" stroke="none"/><path d="M109 74v26" stroke="url(#lab-metal)" stroke-width="6"/></g>';
const dryHeat=dryTube+'<g transform="translate(-55 -35)">'+flame+'</g><rect x="56" y="161" width="39" height="16" rx="5" fill="url(#lab-metal)"/>';
const oxygenReceiver='<rect x="153" y="66" width="10" height="22" rx="2" fill="#877665"/><path d="M161 76h40v74h16v-15" stroke="#c7e6f6" stroke-width="5"/><rect x="176" y="132" width="70" height="38" rx="7" fill="url(#lab-glass)"/><path d="M178 148h66v17h-66z" fill="url(#lab-liquid)" stroke="none"/><path d="M205 157v-48q0-9 9-9h7q9 0 9 9v48" fill="url(#lab-glass)"/><path class="lab-receiver-water" d="M207 111h21v46h-21z" fill="url(#lab-liquid)" stroke="none"/><g class="lab-motion" fill="#d8fbff" stroke="none"><circle cx="218" cy="143" r="2.5"/><circle cx="222" cy="133" r="2"/><circle cx="216" cy="123" r="1.6"/></g>';
const tube='<path fill="none" d="M130 42V25h78v72"/><path fill="url(#lab-glass)" d="M189 92h37v52q0 20-18 20t-19-20z"/><circle class="lab-motion" cx="208" cy="124" r="5" fill="#66d1fa"/>';
const waterBath='<rect x="55" y="115" width="150" height="57" rx="10" fill="url(#lab-glass)"/><path d="M59 134h142v32H59z" fill="url(#lab-liquid)"/><path d="M111 59v88a19 19 0 0 0 38 0V59z" fill="url(#lab-glass)"/><path d="M116 114h28v32a14 14 0 0 1-28 0z" fill="#79bce3" opacity=".7"/><text x="60" y="187" class="lab-svg-text">Bể nước ấm</text>';
const scenes={
  'soap-bath':waterBath.replace('#79bce3','#d8b975')+'<path class="lab-test-product" d="M116 116q14-4 28 0v15q-14-4-28 0z" fill="#efe5b8"/>',
  'silver-mirror':waterBath.replace('#79bce3','#d6eaf1')+'<path class="lab-test-product" d="M114 91v55a16 16 0 0 0 32 0V91" fill="none" stroke="url(#lab-metal)" stroke-width="6"/>',
  'copper-test':waterBath+'<path class="lab-test-product" d="M117 149l7-4 7 3 8-3 5 5q-13 18-27-1z" fill="#b24d35" stroke="none"/>',

  'nitrogen-oxide':flask.replace('fill="url(#lab-liquid)"','class="lab-acid-liquid" fill="#d8edf3"')+'<path d="M130 42V23h77v79" stroke="#a2c6dd" stroke-width="4"/><path d="M190 87h35v68h-35z" fill="url(#lab-glass)"/><path d="M193 124h29v28h-29z" fill="url(#lab-liquid)"/><g class="lab-no2" fill="#c46f36" stroke="none"><ellipse cx="131" cy="106" rx="28" ry="17"/><ellipse cx="131" cy="87" rx="11" ry="24"/><ellipse cx="207" cy="104" rx="12" ry="13"/></g><path d="M113 147l15-9 11 7-7 8z" fill="#ba6a41"/>',

  thermite:'<ellipse cx="130" cy="163" rx="79" ry="12" fill="#050d18"/><path d="M74 121h112l-21 39H95z" fill="url(#lab-metal)"/><ellipse cx="130" cy="121" rx="56" ry="13" fill="#566578"/><path d="m85 122 15-7 18 2 13-8 22 7 20 5-17 7h-50z" fill="#984e41"/><g class="thermite-glow" transform="translate(0 -70)">'+flame+'</g><path class="thermite-product" d="M106 126q21-14 46-2l-13 7h-22z" fill="#ffb263" stroke="#ffd6a2"/>',

  dry:dryHeat,
  inlet:'<path d="M40 48h91v95" stroke="#a6d8ef" stroke-width="5"/><path d="M88 96v65q0 10 10 10h64q10 0 10-10V96" fill="url(#lab-glass)"/><path class="lab-inlet-liquid" d="M91 123h78v38q0 7-7 7H98q-7 0-7-7z" fill="url(#lab-liquid)"/><g class="lab-motion" fill="#d5f5ff"><circle cx="131" cy="143" r="3"/><circle cx="136" cy="132" r="2"/><circle cx="129" cy="123" r="2"/></g>',
  ammonia:dryHeat+'<path d="M165 61l29 3-3 10-29-3z" fill="#dc7279" class="lab-litmus"/>',
  molten:'<rect x="49" y="80" width="162" height="97" rx="14" fill="url(#lab-metal)"/><path d="M59 118h142v46H59z" fill="#d48548"/><path d="M62 158h136v9H62z" fill="#f5b976"/><path d="M90 135V44h80v91" stroke="#b8d1e3" stroke-width="4"/><path d="M90 87v47m80-47v47" stroke="#25384a" stroke-width="11"/><rect x="109" y="31" width="42" height="24" rx="5" fill="#233f67"/><text x="114" y="47" fill="#fff" stroke="none">−  +</text><g class="lab-motion" fill="#fff2bd"><circle cx="171" cy="115" r="4"/><circle cx="178" cy="105" r="3"/></g>',

  oxygen:dryHeat+oxygenReceiver,
  burner:'<rect x="105" y="159" width="50" height="25" rx="7" fill="url(#lab-metal)"/><path d="M130 159v-26m-20 51h40" stroke-width="7"/><g transform="translate(0 -55)">'+flame+'</g>',
  blast:'<defs><linearGradient id="gdvn-furnace-metal"><stop stop-color="#31475c"/><stop offset=".45" stop-color="#8298aa"/><stop offset="1" stop-color="#344a60"/></linearGradient><linearGradient id="gdvn-furnace-core" x2="0" y2="1"><stop stop-color="#3a4354"/><stop offset="1" stop-color="#a04839"/></linearGradient></defs><path fill="url(#gdvn-furnace-metal)" d="M104 22h52v22l25 74-12 35v33H91v-33l-12-35 25-74z"/><path fill="url(#gdvn-furnace-core)" d="M113 45h34l23 73-11 32v27h-58v-27l-11-32z"/><g class="blast-charge" fill="#d6ac79"><circle cx="119" cy="31" r="4"/><circle cx="135" cy="37" r="5"/><circle cx="144" cy="25" r="4"/><path d="M130 4v17m-5-6 5 6 5-6"/></g><g class="blast-air" fill="none" stroke="#ffb554" stroke-width="4"><path d="M44 135h51m-10-5 10 5-10 5M125 126V68m-5 9 5-9 5 9"/></g><g class="blast-reduction" fill="#ef9270"><circle cx="111" cy="84" r="6"/><circle cx="136" cy="94" r="7"/><circle cx="150" cy="113" r="5"/></g><g class="blast-slag" fill="#ffcf74"><path d="M101 151h58v10h-58z"/><path d="M159 155h38l14 8" fill="none" stroke="#ffcf74" stroke-width="5"/></g><g class="blast-iron" fill="#ff793c"><path d="M101 161h58v16h-58z"/><path d="M101 170H65l-14 9" fill="none" stroke="#ff793c" stroke-width="5"/></g>',

  dropper:'<g transform="rotate(23 136 42)"><rect fill="#395b8c" x="124" y="10" width="24" height="28" rx="12"/><path fill="url(#lab-glass)" d="M127 34h18v36l-6 12h-6l-6-12z"/><path fill="var(--lab-droplet,#dfebec)" d="M130 54h12v14l-5 9z"/></g><path class="lab-motion" fill="var(--lab-droplet,#dfebec)" d="M117 85q-14 17 0 17t0-17z"/>',
  tongs:'<path fill="none" stroke-width="7" d="M195 18l-63 36-12 17m72-50-52 43-6 13"/>',
  gas:flask+tube,
  heated:flask+tube+flame,
  reflux:flask+flame+'<rect x="117" y="7" width="26" height="38" rx="5" fill="url(#lab-glass)"/><path d="M130 4v39m-13-26h-17m43 17h17"/><path class="lab-motion" d="M130 21v13" stroke="#348eca"/>',
  furnace:'<rect fill="url(#lab-metal)" x="58" y="44" width="144" height="128" rx="17"/><path fill="#472d39" d="M86 144V97a44 44 0 0 1 88 0v47z"/><path fill="#e6c2a9" d="M100 128h60l-8 15h-44z"/><g transform="translate(0 -36)">'+flame+'</g>',
  cell:'<rect fill="url(#lab-glass)" x="56" y="85" width="148" height="88" rx="10"/><path fill="url(#lab-liquid)" d="M62 121h136v45H62z"/><path fill="none" d="M87 133V42h86v91M130 94v76"/><path stroke-width="8" d="M87 96v50m86-50v50"/><rect fill="#233f67" x="106" y="29" width="48" height="26" rx="5"/><text x="113" y="47" fill="white" stroke="none">−  +</text><g class="lab-motion" fill="#fff"><circle cx="96" cy="132" r="4"/><circle cx="163" cy="127" r="4"/></g>',
  reactor:'<path fill="none" d="M72 70h37m43 72h40v-21h28"/><rect fill="url(#lab-metal)" x="108" y="42" width="45" height="120" rx="18"/><path d="M109 74h43m-43 27h43m-43 27h43"/><circle fill="#f4f9ff" cx="130" cy="37" r="14"/><path d="m130 37 6-5"/><path class="lab-motion" fill="#33a7d7" d="M79 62l14 8-14 8z"/>'
};
const anchors={
  "soap-bath":{vessel:[130,125],tool:[82,142]},
  "silver-mirror":{vessel:[130,134],tool:[82,142]},
  "copper-test":{vessel:[130,151],tool:[82,142]},
  dropper:{tool:[117,83]},tongs:{tool:[134,70]},
  oxygen:{vessel:[78,99],tool:[77,132],receiver:[218,117]},
  dry:{vessel:[78,99],tool:[77,132]},ammonia:{vessel:[78,99],tool:[178,69]},
  blast:{vessel:[130,107],charge:[130,32],air:[91,135],reduction:[136,94],slag:[151,155],outlet:[65,170]},
  cell:{vessel:[107,151],tool:[130,42],anode:[173,130]},molten:{vessel:[129,130],tool:[130,42],bottom:[129,157]},
  furnace:{vessel:[130,131],tool:[130,145]},inlet:{vessel:[128,146],tool:[130,72]},
  gas:{vessel:[128,138],tool:[130,42]},heated:{vessel:[128,138],tool:[130,175]},
  reflux:{vessel:[128,138],tool:[130,25]},reactor:{vessel:[130,104],tool:[90,70]},
  burner:{vessel:[130,118],tool:[130,144]},thermite:{vessel:[130,123],tool:[130,105]},
  'nitrogen-oxide':{vessel:[129,140],tool:[130,100]}
};
export function labScene(kind,variant=''){
  const points={...anchors[kind]};
  let scene=scenes[kind];
  if(variant==='aluminium'){
    scene=scene.replace('M90 135V44h80v91','M50 161V44h120v91').replace('M90 87v47m80-47v47','M170 87v47');
    scene+='<path d="M59 147h142v17H59z" fill="#cbdce5" class="lab-al-layer"/><text x="66" y="159" class="lab-svg-text lab-al-layer">Al lỏng</text><text x="72" y="112" class="lab-svg-text">Cryolite + Al₂O₃</text><text x="180" y="101" class="lab-svg-text">CO₂</text>';
  }
  if(variant==='brine')scene+='<text x="65" y="110" class="lab-svg-text">H₂ (−)</text><text x="148" y="110" class="lab-svg-text">Cl₂ (+)</text><text x="64" y="157" class="lab-svg-text">NaOH (dd)</text>';
  if(variant==='lime-kiln')scene+='<path d="M149 63V37h55" stroke="url(#lab-metal)" stroke-width="9"/><text x="181" y="29" class="lab-svg-text lab-lime-output">CO₂ ↑</text><path class="lab-lime-charge" d="M105 128l7-12 13 1 5 9 7-10 11 4 8 8z" stroke="none" fill="#b7a88e"/>';
  if(variant==='javel')scene+='<path d="M169 151h22v17" stroke="#aed6ea" stroke-width="3"/><text x="48" y="63" class="lab-svg-text">Cl₂</text><text x="81" y="120" class="lab-svg-text">NaOH loãng</text><text x="158" y="155" class="lab-svg-text lab-javel-output">NaClO + NaCl</text>';
  if(variant==='acid-contact'){
    scene='<path d="M12 106h235" stroke="#9bc5dd" stroke-width="4"/><g class="lab-contact-unit" data-unit="0"><rect x="24" y="78" width="58" height="57" rx="10" fill="url(#lab-metal)"/><text x="32" y="99" class="lab-svg-text">Xúc tác</text><text x="30" y="121" class="lab-svg-text">SO₂ → SO₃</text></g><g class="lab-contact-unit" data-unit="1"><rect x="104" y="61" width="54" height="89" rx="13" fill="url(#lab-glass)"/><path d="M109 112h44v31h-44z" fill="url(#lab-liquid)"/><text x="110" y="91" class="lab-svg-text">Hấp thụ</text><text x="112" y="128" class="lab-svg-text">Oleum</text></g><g class="lab-contact-unit" data-unit="2"><path d="M185 77h49v56q0 13-13 13h-23q-13 0-13-13z" fill="url(#lab-glass)"/><path d="M188 119h43v15q0 9-10 9h-23q-10 0-10-9z" fill="url(#lab-liquid)"/><text x="189" y="101" class="lab-svg-text">Pha loãng</text><text x="194" y="133" class="lab-svg-text">H₂SO₄</text></g>';
    Object.assign(points,{step0:[54,106],step1:[130,108],step2:[210,128]});
  }
  if(variant==='hydrogen-burn'){
    scene+='<path d="M68 147h51" stroke="#98cce7" stroke-width="4"/><text x="65" y="139" class="lab-svg-text">H₂</text><text x="155" y="121" class="lab-svg-text">O₂</text><path d="M88 69l81 15-4 9-81-15z" fill="url(#lab-glass)"/><g class="lab-condensate" fill="#b9efff"><circle cx="114" cy="87" r="3"/><circle cx="134" cy="91" r="4"/><circle cx="150" cy="94" r="2.5"/></g>';
    points.condensate=[134,91];
  }
  if(variant==='fermentation'){
    scene='<path d="M78 71h93v15l13 15v54q0 15-15 15H80q-15 0-15-15v-54l13-15z" fill="url(#lab-glass)"/><path d="M69 119q28-6 54 0t57 0v35q0 12-12 12H81q-12 0-12-12z" fill="#cf9c54"/><rect x="76" y="62" width="96" height="13" rx="4" fill="#466780"/><path d="M145 62V42h60" stroke="#526f81" stroke-width="5"/><g class="lab-ferment-output"><path d="M174 42h31m-7-5 7 5-7 5" stroke="#24799b" stroke-width="2"/><text x="174" y="33" fill="#24465b" stroke="none" font-size="10">CO₂ thoát ra</text><g class="lab-ferment-bubbles" fill="#fff6db" stroke="#956437"><circle cx="91" cy="137" r="3"/><circle cx="110" cy="112" r="3"/><circle cx="129" cy="131" r="4"/><circle cx="146" cy="104" r="2.5"/><circle cx="161" cy="126" r="3"/></g><text x="125" y="153" text-anchor="middle" fill="#342616" stroke="none" font-size="9.5">Ethanol trong dịch</text></g><text class="lab-ferment-input" x="125" y="145" text-anchor="middle" fill="#342616" stroke="none" font-size="9.5">Glucose + nấm men</text>';
    Object.assign(points,{vessel:[125,133],tool:[145,43]});
  }
  if(variant==='haber'){
    scene='<path d="M18 98h67m81 0h75m-7-5 7 5-7 5" stroke="#526f81" stroke-width="3"/><rect x="85" y="63" width="81" height="73" rx="15" fill="url(#lab-metal)"/><path d="M97 107h57" stroke="#cedce3" stroke-width="2" stroke-dasharray="2 4"/><text x="125" y="89" text-anchor="middle" class="lab-svg-text">Thiết bị tổng hợp</text><text x="125" y="122" text-anchor="middle" class="lab-svg-text">Xúc tác sắt</text><text x="20" y="86" fill="#24465b" stroke="none" font-size="10">N₂ + H₂</text><g class="lab-haber-output"><path d="M174 98h67" stroke="#24799b" stroke-width="2" stroke-dasharray="4 4"/><text x="179" y="86" fill="#24465b" stroke="none" font-size="10">Hỗn hợp khí</text><text x="182" y="119" fill="#24465b" stroke="none" font-size="10">chứa NH₃</text></g>';
    Object.assign(points,{vessel:[125,98],tool:[125,98],outlet:[210,98]});
  }
  if(variant==='magnesium-burn'){
    scene='<path d="M67 153h126l-9 10H76z" fill="url(#lab-metal)"/><path class="lab-mg-ribbon" d="m100 142 17-8 14 8 15-10 14 9" stroke="#415d70" stroke-width="5"/><g transform="translate(0 -30)">'+flame+'</g><path class="lab-mg-oxide" d="M94 152l12-5 11 1 9-7 10 4 10-3 13 7 10 3z" fill="#fcfdff" stroke="#617b90"/>';
    points.vessel=[130,146];
  }
  const gasRoute=variant==='lime-kiln'?'M130 119Q149 98 149 64V37H225':({dry:'M78 97Q118 87 162 76L188 66',gas:'M130 122V25h78v76',heated:'M130 122V25h78v76',ammonia:'M78 96Q132 77 181 67',oxygen:'M78 97L161 76h40v74h16v-28'})[kind];
  if(gasRoute)scene+='<path class="lab-gas-track" d="'+gasRoute+'" fill="none" stroke="#a5e8ff" stroke-width="2.2" stroke-dasharray="3 8"/>';
  const markers=Object.entries(points).map(([id,[x,y]])=>'<circle data-lab-anchor="'+id+'" cx="'+x+'" cy="'+y+'" r="1" opacity="0"/>').join('');

  return '<svg viewBox="0 0 260 205" aria-hidden="true" fill="none" stroke="#608aa6" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><defs><linearGradient id="lab-glass"><stop stop-color="#9bd3ee" stop-opacity=".65"/><stop offset=".28" stop-color="#d6f5ff" stop-opacity=".25"/><stop offset=".8" stop-color="#70b2d4" stop-opacity=".13"/><stop offset="1" stop-color="#a5dfff" stop-opacity=".58"/></linearGradient><linearGradient id="lab-liquid" x2="0" y2="1"><stop stop-color="#8ee5fc" stop-opacity=".7"/><stop offset="1" stop-color="#3698ce" stop-opacity=".65"/></linearGradient><linearGradient id="lab-metal"><stop stop-color="#253d54"/><stop offset=".42" stop-color="#b3c8d7"/><stop offset=".68" stop-color="#6b879e"/><stop offset="1" stop-color="#344e68"/></linearGradient><linearGradient id="lab-flame-color" x2="0" y2="1"><stop stop-color="#ffb24d"/><stop offset=".65" stop-color="#ffdf84"/><stop offset="1" stop-color="#8578fd"/></linearGradient><radialGradient id="lab-glow"><stop stop-color="#ff973c" stop-opacity=".6"/><stop offset="1" stop-color="#ff973c" stop-opacity="0"/></radialGradient></defs>'+scene+markers+'</svg>';
}
