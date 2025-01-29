const desserts_data = document.querySelectorAll('.dessert-info')
const buttons = document.querySelectorAll('.add-button')
const desserts = []
const cart = []
let desserts_quant = 0
let total = 0

class Dessert {
    constructor(type, name, price){
        this.type = type
        this.name = name
        this.price = price
        this.quantity
    }
}

for (let data of desserts_data) {
    let dessert = new Dessert
    let array = Array.from(data.children)

    dessert.type = array[0].textContent
    dessert.name = array[1].textContent
    dessert.price = array[2].textContent
    dessert.quantity = 0
    desserts.push(dessert)
}

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (!cart.includes(desserts[index])) {
            cart.push(desserts[index])
            desserts[index].quantity++
            console.log(cart)
            // change button
            // button.innerHTML = ''
            // this just for testing
            // better to have the buttons already created and styled, and then just add them here
            // button.classList.add('no-hover')
            button.innerHTML = `
                <div class="dec-quant"><img src="assets/images/icon-decrement-quantity.svg" alt="decrement sign" class="order-img"></div>
                <label class="order-label">${desserts[index].quantity}</label>
                <div class="inc-quant"><img src="assets/images/icon-increment-quantity.svg" alt="increment sign" class="order-img"></div>
            `
            button.style.backgroundColor = 'hsl(14, 86%, 42%)'
            button.style.border = 'none'
            button.style.justifyContent = 'space-evenly'
            button.style.alignItems = 'center'
            button.style.cursor = 'initial'
            // button.style.padding = '0.7em 0 0.7em 0'
            // change cart
        } else {
            return
        }
        // desserts[index].quantity++
        // console.log(cart)
    })
})

// console.log(cart)
// console.log(desserts)
// console.log(desserts_data[0].firstElementChild)
