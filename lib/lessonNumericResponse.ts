import { normalizeNumericResponse } from './numericResponse';
/** Lesson checks accept exact numbers and simple fractions, including toolbar
 * notation. This never evaluates expressions or changes SAT test-entry rules. */
export function normalizeLessonNumericResponse(value:unknown):string|null {
  if(typeof value!=='string'||value.length>128)return null;
  let text=value.trim();
  if(/^\$[^$]+\$$/.test(text))text=text.slice(1,-1).trim();
  const fraction=text.match(/^\\(?:frac|dfrac|tfrac)\s*\{\s*([+−-]?\d+)\s*\}\s*\{\s*([+−-]?\d+)\s*\}$/)
    ||text.match(/^([+−-]?\d+)\s*\/\s*([+−-]?\d+)$/);
  if(fraction){
    let numerator=BigInt(fraction[1].replace('−','-'));
    let denominator=BigInt(fraction[2].replace('−','-'));
    if(denominator===0n)return null;
    if(denominator<0n){numerator=-numerator;denominator=-denominator;}
    return normalizeNumericResponse(`${numerator}/${denominator}`);
  }
  return normalizeNumericResponse(text.replace(/^−/,'-').replace(/^\+/,''));
}
