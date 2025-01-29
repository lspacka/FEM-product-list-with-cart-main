const desserts_data = document.querySelectorAll('.dessert-info')
const buttons = document.querySelectorAll('.add-button')
const desserts = []
const cart = []
const order_btns = []
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
        console.log(index)
        if (!cart.includes(desserts[index])) {
            cart.push(desserts[index])
            desserts[index].quantity++
            // console.log(cart)
            // this just for testing
            // better to have the buttons already created and styled, and then just add them here
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

            order_btns.push(button)

            const dec_btn = document.getElementById(`dec-${index}`)
            const inc_btn = document.getElementById(`inc-${index}`)
            const order_label = document.getElementById(`label-${index}`)

            // order_label.textContent = `${desserts[index].quantity}`

            dec_btn.addEventListener('click', () => {
                if (desserts[index].quantity == 0)
                    return  // change to normal button?
                desserts[index].quantity--
                order_label.textContent = `${desserts[index].quantity}`
                // console.log(desserts[index].quantity)
                // console.log(desserts[index])
            })

            inc_btn.addEventListener('click', () => {
                desserts[index].quantity++
                order_label.textContent = `${desserts[index].quantity}`
                // console.log(desserts[index].quantity)
                // console.log(desserts[index])
            })

            
            // button.style.padding = '0.7em 0 0.7em 0'
            // change cart
        } else {
            return
        }

        // order_btns.forEach((button, index) => {
        //     const dec_btn = document.querySelector('.dec-quant')
        //     const inc_btn = document.querySelector('.inc-quant')
        //     const order_label = document.querySelector('.order-label')

        //     dec_btn.addEventListener('click', () => {
        //         if (desserts[index].quantity == 0)
        //             return  // change to normal button?
        //         cart[index].quantity--
        //         order_label.textContent = `${cart[index].quantity}`
        //         // console.log(desserts[index].quantity)
        //         console.log(cart[index])
        //     })

        //     inc_btn.addEventListener('click', () => {
        //         cart[index].quantity++
        //         order_label.textContent = `${cart[index].quantity}`
        //         // console.log(desserts[index].quantity)
        //         console.log(desserts[index])
        //     })
        // })

        // desserts[index].quantity++
        // console.log(cart)
    })
})

// console.log(cart)
// console.log(desserts)
// console.log(desserts_data[0].firstElementChild)
