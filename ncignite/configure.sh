#!/usr/bin/env bash
# Fill in the NC Ignite site placeholders. Run it once you have the real values.
# Every flag is optional. Pass only what you have, run it again later for the rest.
#
#   ./configure.sh --instagram ncignite --linkedin nc-ignite
#
# Domain and emails are already set to ncignite.net. To change them later:
#   ./configure.sh --domain newdomain.org --email hello@newdomain.org
#
# --dry-run prints what would change and writes nothing.

set -euo pipefail
cd "$(dirname "$0")"

DOMAIN="" EMAIL="" SPONSORS="" CONDUCT="" IG="" LI="" DRY=0

while [ $# -gt 0 ]; do
  case "$1" in
    --domain)      DOMAIN="$2"; shift 2 ;;
    --email)       EMAIL="$2"; shift 2 ;;
    --sponsors)    SPONSORS="$2"; shift 2 ;;
    --conduct)     CONDUCT="$2"; shift 2 ;;
    --instagram)   IG="$2"; shift 2 ;;
    --linkedin)    LI="$2"; shift 2 ;;
    --dry-run)     DRY=1; shift ;;
    -h|--help)     sed -n '2,20p' "$0"; exit 0 ;;
    *) echo "Unknown flag: $1" >&2; exit 1 ;;
  esac
done

FILES=(index.html code-of-conduct.html)
CHANGES=0

# sub <description> <sed-expression>
sub() {
  local what="$1" expr="$2" hit=0
  for f in "${FILES[@]}"; do
    if sed -n "$expr p" "$f" 2>/dev/null | grep -q .; then hit=1; fi
  done
  if [ "$DRY" = 1 ]; then
    echo "  would set: $what"
  else
    for f in "${FILES[@]}"; do
      sed -i '' "$expr" "$f" 2>/dev/null || sed -i "$expr" "$f"
    done
    echo "  set: $what"
  fi
  CHANGES=$((CHANGES + 1))
}

esc() { printf '%s' "$1" | sed 's/[&/\]/\\&/g'; }

echo "NC Ignite setup"
[ "$DRY" = 1 ] && echo "(dry run, nothing will be written)"

if [ -n "$DOMAIN" ]; then
  d=$(esc "${DOMAIN#https://}")
  sub "canonical and share URLs to https://$DOMAIN/" "s|https://example\.com|https://$d|g"
fi

[ -n "$EMAIL" ]    && sub "contact email to $EMAIL"    "s|hello@example\.com|$(esc "$EMAIL")|g"
[ -n "$SPONSORS" ] && sub "sponsor email to $SPONSORS" "s|sponsors@example\.com|$(esc "$SPONSORS")|g"
[ -n "$CONDUCT" ]  && sub "conduct email to $CONDUCT"  "s|conduct@example\.com|$(esc "$CONDUCT")|g"

if [ -n "$IG" ]; then
  sub "Instagram link" "s|#SOCIAL_INSTAGRAM\">Instagram, to be announced|https://instagram.com/$(esc "${IG#@}")\">Instagram|g"
fi
if [ -n "$LI" ]; then
  sub "LinkedIn link" "s|#SOCIAL_LINKEDIN\">LinkedIn, to be announced|https://linkedin.com/company/$(esc "$LI")\">LinkedIn|g"
fi

if [ "$CHANGES" = 0 ]; then
  echo "  nothing passed. Run with --help to see the flags."
  exit 0
fi

echo
echo "Still unfilled:"
left=$(grep -oh 'example\.com\|SOCIAL_INSTAGRAM\|SOCIAL_LINKEDIN' "${FILES[@]}" 2>/dev/null | sort -u)
if [ -z "$left" ]; then echo "  nothing. Every placeholder is filled."; else echo "$left" | sed 's/^/  /'; fi
