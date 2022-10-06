
// TODO: Motivation
// let price = 10
// let quantity = 2
// let total = price * quantity

// quantity = 3
// console.log({total});

/**
 * ! We need to save how we’re calculating the `total`, 
 * ! so we can re-run it when `price` or `quantity` changes
 */

// * The code I’m about to run, store this, I may need you to run it at another time.

let price = 10
let quantity = 2
let total = price * quantity

let target = () => {
    total = price * quantity
}
let storages = []
const record = () =>{
    storages.push(target)
}

const replay = () => storages.map(fn => fn())

// target()
// record()


// price = 20
// console.log({total});
// replay()
// console.log({total});

// ! Can not scale with our app
// * Encapsulating this behavior into its own class called Dependency Class.

class DepClass {
    constructor(){
        this.subscribers = []
    }

    depend(){
        if(target && !this.subscribers.includes(target)){
            this.subscribers.push(target)
        }
    }

    notify(){
        this.subscribers.map(sub => sub())
    }
}

const deps = new DepClass()
// deps.depend()
// target()
// console.log({total});
// price = 20
// deps.notify()
// console.log({total});

// * A Watcher Function
const watcher = (func) => {
    target = func
    deps.depend()
    target()
    target = null
}

watcher(()=> {
    total = price * quantity
})


// console.log({total});
deps.notify()
// console.log({total});


// * Object.defineProperty()

let data = {
    price: 10,
    quantity: 2
}
// let initialPrice = data.price

// Object.defineProperty(data, "price", {
//     get(){
//         console.log("get");
//         return initialPrice
//     },
//     set(newValue){
//         console.log("set", {newValue});
//         initialPrice = newValue
//     }
// })

Object.keys(data).map((key)=>{
    let initialPrice = data[key]

    // ? Each property should have their own Dependency class
    const dep = new DepClass()
    Object.defineProperty(data, key, {
        get(){
            // console.log(`get ${key}`);
            dep.depend()
            return initialPrice
        },
        set(newValue){
            // console.log(`set ${key}`);
            initialPrice = newValue
            dep.notify()
        }
    })
})

watcher(()=> {
    total = data.price * data.quantity
})

const ids = {
    priceElement:'price',
    quantityElement:'quantity',
    totalElement:'total',
}

const updateElement = (id, value) => {
    let priceEle = document.getElementById(id) 
    if(!priceEle){
        priceEle =  document.createElement("h1")
        priceEle.id = id 
    }
    priceEle.innerText = `${id}: ${value}`
    return priceEle
}

const changePriceButton = document.createElement('button')
changePriceButton.innerText = "Increment prices"

const changeQuantityButton = document.createElement('button')
changeQuantityButton.innerText = "Increment quantity"



const render = () => {
    const root = document.getElementById("root")

    const priceEle = updateElement(ids.priceElement, data.price)
    root.appendChild(priceEle)

    const quantityEle = updateElement(ids.quantityElement, data.quantity)
    root.appendChild(quantityEle)

    const totalEle = updateElement(ids.totalElement, total)
    root.appendChild(totalEle)

    changePriceButton.onclick = () => {
        data.price = ++data.price 
        render()
    }
    root.appendChild(changePriceButton)

    changeQuantityButton.onclick = () => {
        data.quantity = ++data.quantity 
        render()
    }
    root.appendChild(changeQuantityButton)

}
render()


