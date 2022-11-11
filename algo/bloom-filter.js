//TODO: Check ì an element is a member of a set
// * if false: the element is definitely not in the set.
// ! if true: the element is probably in the set. 

// ? Using Data structure Bit Vector

/**
 * ? Algorithm:
 * * Add element into bit vector:
 * + Use 3 different hash functions
 * +
 * * Check
 */



const arrSize = 100

function hash1(s = "")
{
    let hash = 0;
    for (let i = 0; i < s.length; i++) 
    {
        hash = (hash + s.charCodeAt(i));
        hash = hash % arrSize;
    }
    return hash;
}
  
function hash2(s = "")
{
    let hash = 0;
    for (let i = 0; i < s.length; i++) 
    {
        hash = hash + s.charCodeAt(i)*(10**i);
        hash = hash % arrSize;
    }
    return hash;
}

function hash3(s = "")
{
    let hash = 0;
    for (let i = 0; i < s.length; i++) 
    {
        hash = hash* 31 + s.charCodeAt(i);
        hash = hash % arrSize;
    }
    return hash;
}

const bitArray = Array(arrSize).fill(0)

function find(s = ""){
    const a = hash1(s);
    const b = hash2(s);
    const c = hash3(s);

    if (bitArray[a] && bitArray[b] && bitArray[c])
        return true;
    else
        return false;
}

function add(s = ""){
    const found = find(s)
    if(found){
        console.log(`${s}: in set`);
    }else{
        const a = hash1(s);
        const b = hash2(s);
        const c = hash3(s);
        bitArray[a] = true;
        bitArray[b] = true;
        bitArray[c] = true;

        console.log(`${s}: inserted`);
    }
}


const urls = ['abound','abounds','abundance','abundant','accessible',
'bloom','blossom','bolster','bonny','bonus','bonuses',
'coherent','cohesive','colorful','comely','comfort',
'gems','generosity','generous','generously','genial']

urls.forEach(add)

add("generous")