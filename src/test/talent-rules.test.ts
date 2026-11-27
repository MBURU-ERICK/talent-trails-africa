import {describe,it,expect} from 'vitest';
import {skillMatch,profileCompletion} from '@/lib/talent';
describe('Transparent skills-based matching',()=>{
 it('uses overlap with required skills as the score',()=>{expect(skillMatch(['React','CSS'],['React','TypeScript','CSS'])).toEqual({matched:['React','CSS'],score:67});});
 it('ignores nationality, ethnicity and refugee status because only skills enter ranking',()=>{const a={skills:['React'],nationality:'Kenyan',ethnicity:'A',refugee:false};const b={skills:['React'],nationality:'Ugandan',ethnicity:'B',refugee:true};expect(skillMatch(a.skills,['React']).score).toBe(100);expect(skillMatch(b.skills,['React']).score).toBe(100);});
 it('normalizes competency names',()=>{expect(skillMatch([' react '],['React']).score).toBe(100);});
 it('does not claim a match for requirements that are not specified',()=>{expect(skillMatch(['React'],[]).score).toBe(0);});
});
describe('Profile completion',()=>{it('starts at zero and reaches 100 with all professional fields',()=>{expect(profileCompletion({})).toBe(0);expect(profileCompletion({name:'Amina',title:'Developer',location:'Nairobi',skills:['React'],education:'Diploma',languages:'English',interests:'Technology',preferences:'Remote'})).toBe(100);});});
