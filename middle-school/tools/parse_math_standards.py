"""Rebuild data/math-standards.json from the NC K-12 Math SCOS PDF text.

Usage: pdftotext -layout NC_Math_SCOS_K-12.pdf scos.txt
       python3 -I parse_math_standards.py scos.txt ../data/math-standards.json

Keeps, per standard: code, domain, cluster (the "Standard:" header above it), text (the lead-in
sentence) and details (the bullet sub-points under it).
"""
import json, re, sys

src, dst = sys.argv[1], sys.argv[2]
lines = open(src, encoding='utf-8').read().split('\n')
code_re = re.compile(r'●​?\s*(NC\.(6|7|8|M1|M2|M3)\.([A-Za-z\-]+)\.(\d+[a-z]?))\s*(.*)')
std_re = re.compile(r'Standard:\s*(.*)')
sub_re = re.compile(r'^\s*[○■]​?\s*(.*)')
noise = ('NC Department', 'K-12 Mathematics', 'Revised to conform')
clean = lambda s: re.sub(r'\s+', ' ', s.replace('​', '')).strip()

out, cur, cluster, last_sub = {}, None, None, None
for ln in lines:
    if any(n in ln for n in noise):
        continue
    s = std_re.search(ln)
    if s:
        cluster, cur, last_sub = clean(s.group(1)), None, None
        continue
    m = code_re.search(ln)
    if m:
        code, course, dom, num, txt = m.groups()
        cur = {'code': code, 'domain': dom, 'cluster': cluster, 'text': clean(txt), 'details': []}
        out.setdefault(course, []).append(cur)
        last_sub = None
        continue
    if cur is None:
        continue
    t = ln.strip()
    if not t:
        continue
    sm = sub_re.match(ln)
    if sm:
        cur['details'].append(clean(sm.group(1)))
        last_sub = True
    elif re.match(r'^(Grade|[A-Z][a-z]+ Grade|Standards for Mathematical|\d\.\s)', t) or re.match(r'^[A-Z][A-Za-z ,&\-]+$', t) and len(t) < 60:
        cur = None            # section heading or practice list: stop capturing
    elif last_sub and cur['details']:
        cur['details'][-1] = clean(cur['details'][-1] + ' ' + t)
    else:
        cur['text'] = clean(cur['text'] + ' ' + t)

json.dump(out, open(dst, 'w'), indent=1, ensure_ascii=False)
for k, v in out.items():
    print(k, len(v), 'standards,', len({x['cluster'] for x in v}), 'clusters,',
          sum(1 for x in v if x['details']), 'with details')
