'use strict';


const o = {

    x: 1,
    y: 2,
    z: 3,
};

for (let p in o) {
    if (!o.hasOwnProperty(p)) {
        continue;
    }
    console.log(p);
}

let ob = Object.getOwnPropertySymbols(o);
// комментарий

console.log(ob);