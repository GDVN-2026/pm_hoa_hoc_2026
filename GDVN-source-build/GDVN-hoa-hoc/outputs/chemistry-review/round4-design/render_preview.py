"""Render exported source geometry, not a browser screenshot."""
import json, math
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageColor
root=Path(__file__).parent
font=ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf',21)
small=ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf',16)
for name in ['lime','precipitate','oxygen']:
    model=json.loads((root/(name+'.json')).read_text(encoding='utf-8'))
    im=Image.new('RGBA',(960,720),'#e5eff5')
    for f in model['faces']:
        a,b,c=f['points'][:3]
        u=[b[i]-a[i] for i in range(3)]; v=[c[i]-a[i] for i in range(3)]
        n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]]
        light=.62+.32*abs(sum(n[i]*[.4,.8,.5][i] for i in range(3))/(math.sqrt(sum(x*x for x in n)) or 1))
        rgb=ImageColor.getrgb(f['color']); rgb=tuple(int(c*(1-(1-light)*.42)) for c in rgb)
        layer=Image.new('RGBA',im.size); d=ImageDraw.Draw(layer)
        d.polygon([tuple(p[:2]) for p in f['projected']],fill=rgb+(int(f['alpha']*255),))
        im=Image.alpha_composite(im,layer)
    d=ImageDraw.Draw(im)
    for label in model['labels']:
        x,y=label['screen'][:2]; text=label['text']; box=d.textbbox((0,0),text,font=font)
        tw=box[2]-box[0]+26; x=max(tw/2+8,min(952-tw/2,x)); y=max(85,min(660,y))
        d.rounded_rectangle((x-tw/2,y-21,x+tw/2,y+18),radius=8,fill='#faffff',outline='#c5d9e3')
        d.text((x,y-4),text,font=font,fill='#25465b',anchor='mm')
    d.text((30,22),'GDVN  /  '+name.upper()+'  /  3D',font=font,fill='#25465b')
    d.text((480,695),'Bản dựng từ hình học nguồn — không phải ảnh chụp trình duyệt',font=small,fill='#567184',anchor='mm')
    im.convert('RGB').save(root/(name+'.png'))
