/** Stable presentation order; saved responses retain their original choice IDs. */
export function lessonChoiceOrder(length:number, seedText:string):number[] {
  let seed = [...seedText].reduce((hash,char)=>Math.imul(hash ^ char.charCodeAt(0),16777619)>>>0,2166136261);
  const order = Array.from({length},(_,index)=>index);
  for(let index=length-1;index>0;index--){
    seed=(Math.imul(seed,1664525)+1013904223)>>>0;
    const other=Math.floor(seed/4294967296*(index+1));
    [order[index],order[other]]=[order[other],order[index]];
  }
  return order;
}
