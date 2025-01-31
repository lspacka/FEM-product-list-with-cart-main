const desserts_data = document.querySelectorAll('.dessert-info')
const buttons = document.querySelectorAll('.add-button')
const cart_items = document.querySelector('.cart-items')
const cart_content = document.querySelector('.cart-content')
const desserts = []
const cart = []
// const order_btns = []
let order_quant = 0
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
    // dessert.price = Number(array[2].textContent.match(/[\d.]+/)[0])
    dessert.price = Number(array[2].textContent.split('$')[1])
    dessert.quantity = 0
    desserts.push(dessert)
}

cart_items.textContent = `(${order_quant})`

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // console.log(index)
        if (!cart.includes(desserts[index])) {
            cart.push(desserts[index])
            desserts[index].quantity++
            // console.log(cart)

            cart_content.innerHTML = `
                <ul class="item-list"></ul>
                <div class="order-total">
                    <label class="ot-label-1">Order Total</label>
                    <label class="ot-label-2">&dollar;0</label>
                </div>
                <div class="carbon-free">
                    <div class="tree"><img src="assets/images/icon-carbon-neutral.svg" alt="" class="tree-img"></div>
                    <h4 class="carbon-msg">This is a <b>carbon-neutral</b> delivery.</h4>
                </div>
                <button class="confirm-order">Confirm Order</button>
            `

            button.innerHTML = `
                <div class="dec-quant" id="dec-${index}">
                    <img src="assets/images/icon-decrement-quantity.svg" alt="decrement sign" class="order-img" >
                </div>
                <label class="order-label" id="label-${index}">${desserts[index].quantity}</label>
                <div class="inc-quant" id="inc-${index}">
                    <img src="assets/images/icon-increment-quantity.svg" alt="increment sign" class="order-img">
                </div>
            `

            button.style.backgroundColor = 'hsl(14, 86%, 42%)'
            button.style.border = 'none'
            button.style.justifyContent = 'space-evenly'
            button.style.alignItems = 'center'
            button.style.cursor = 'initial'
            // order_btns.push(button)

            const dec_btn = document.getElementById(`dec-${index}`)
            const inc_btn = document.getElementById(`inc-${index}`)
            const order_label = document.getElementById(`label-${index}`)
            const total_label = document.querySelector('.ot-label-2')

            order_quant++
            total += desserts[index].price
            cart_items.textContent = `(${order_quant})`
            total_label.textContent = `$${total}`

            dec_btn.addEventListener('click', () => {
                if (desserts[index].quantity == 0 || total == 0)
                    return          // change to normal button?
                                              
                desserts[index].quantity--
                order_quant--
                total -= desserts[index].price
                order_label.textContent = `${desserts[index].quantity}`
                cart_items.textContent = `(${order_quant})`
                total_label.textContent = `$${total}`

                // console.log(index)
                // console.log(cart)
                // console.log('order quantity: ', order_quant)
                // console.log(typeof desserts[index].price)
                // console.log(desserts[index].quantity)
                // console.log(desserts[index])
            })

            inc_btn.addEventListener('click', () => {
                desserts[index].quantity++
                order_quant++
                total += desserts[index].price
                order_label.textContent = `${desserts[index].quantity}`
                cart_items.textContent = `(${order_quant})`
                total_label.textContent = `$${total}`

                // console.log(index)
                // console.log(cart)
                // console.log('order quantity', order_quant)
                // console.log(desserts[index].quantity)
                // console.log(desserts[index])
            })

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
