const desserts_data = document.querySelectorAll('.dessert-info')
const buttons = document.querySelectorAll('.add-button')
const cart_items = document.querySelector('.cart-items')
const cart_content = document.querySelector('.cart-content')
const desserts = []
const cart = []
let order_quant = 0
let total = 0
// let dec_btn
// let inc_btn
// let order_label
// let item_list
// let li
// let item_quantity
// let item_total
let total_label

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
const ul = document.createElement('ul')
let cart_elements = document.createElement('div')
ul.className = 'item-list'

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (!cart.includes(desserts[index])) {
            cart.push(desserts[index])
            desserts[index].quantity++
            // console.log(cart)
            
            if (!cart_content.contains(ul)) {
                cart_content.innerHTML = ''
                cart_content.append(ul)
            } 
                
            cart_elements.innerHTML = `
                <!-- <ul class="item-list"></ul> -->
                <div class="order-total">
                    <label class="ot-label-1">Order Total</label>
                    <label class="ot-label-2">&dollar;0</label>
                </div>
                <div class="carbon-free">
                    <div class="tree">
                        <img src="assets/images/icon-carbon-neutral.svg" alt="" class="tree-img">
                    </div>
                    <p class="carbon-msg">This is a <b>carbon-neutral</b> delivery.</p>
                </div>
                <button class="confirm-order">Confirm Order</button>
            `
            cart_content.append(cart_elements)

            button.innerHTML = `
                <div class="dec-quant" id="dec-${index}">
                    <img src="assets/images/icon-decrement-quantity.svg" alt="decrement sign" class="order-img" >
                </div>
                <label class="order-label" id="label-${index}">${desserts[index].quantity}</label>
                <div class="inc-quant" id="inc-${index}">
                    <img src="assets/images/icon-increment-quantity.svg" alt="increment sign" class="order-img">
                </div>
            `
            
            // render cart items
            const item_list = document.querySelector('.item-list')
            // cart.forEach((item) => {
            //     const li = document.createElement('li')

            //     li.style.listStyle = 'none'
            //     li.className = 'item'
            //     li.innerHTML = `
            //         <div class="item-info">
            //             <h4 class="item-name">${item.name}</h4>
            //             <label class="item-quantity">${item.quantity}x</label>
            //             <label class="item-price">@$${item.price.toFixed(2)}</label>
            //             <label class="item-total">$${(item.price*item.quantity).toFixed(2)}</label>
            //         </div>
            //         <div class="remove-item">
            //             <img src="assets/images/icon-remove-item.svg" alt="remove icon">
            //         </div>
            //     `
            //     item_list.appendChild(li)
            // })

            const item = document.createElement('li')
            const item_info = document.createElement('div')
            const item_name = document.createElement('h4')
            const item_quantity = document.createElement('label')
            const item_price = document.createElement('label')
            const item_total = document.createElement('label')
            const remove_item = document.createElement('div')
            const remove_icon = document.createElement('img')

            item.className = 'item'
            item_info.className = 'item-info'
            item_name.className = 'item-name'
            item_quantity.className = 'item-quantity'
            item_price.className = 'item-price'
            item_total.className = 'item-total'
            remove_item.className = 'remove-item'
            remove_icon.className = 'remove-icon'

            item.style.listStyle = 'none'
            item_quantity.setAttribute('id', `quantity-${index}`)
            item_total.setAttribute('id', `total-${index}`)
            remove_icon.setAttribute('src', 'assets/images/icon-remove-item.svg')
            remove_icon.setAttribute('alt', 'remove icon')

            item_name.textContent = `${desserts[index].name}`
            item_quantity.textContent = `${desserts[index].quantity}`   // !
            item_price.textContent = `@$${desserts[index].price.toFixed(2)}` 
            item_total.textContent = `$${(desserts[index].price * desserts[index].quantity).toFixed(2)}`   // !

            item_info.append(item_name, item_quantity, item_price, item_total)
            remove_item.append(remove_icon)
            item.append(item_info, remove_item)
            item_list.append(item)

            button.style.backgroundColor = 'hsl(14, 86%, 42%)'
            button.style.border = 'none'
            button.style.justifyContent = 'space-evenly'
            button.style.alignItems = 'center'
            button.style.cursor = 'initial'

            const dec_btn = document.getElementById(`dec-${index}`)
            const inc_btn = document.getElementById(`inc-${index}`)
            const order_label = document.getElementById(`label-${index}`)
            // const item_quantity = document.querySelector('.item-quantity')
            // const item_total = document.querySelector('.item-total')
            // item_quantity.setAttribute('id', `quantity-${index}`)
            // item_total.setAttribute('id', `total-${index}`)
            total_label = document.querySelector('.ot-label-2')

            // item_list.forEach(item => {
            //     const item_quantity = document.querySelector('.item-quantity')
            //     const item_total = document.querySelector('.item-total')
            //     item_quantity.setAttribute('id', `quantity-${index}`)
            //     item_total.setAttribute('id', `total-${index}`)
            // })

            order_quant++
            total += desserts[index].price
            cart_items.textContent = `(${order_quant})`
            total_label.textContent = `$${total.toFixed(2)}`

            dec_btn.addEventListener('click', () => {
                if (desserts[index].quantity == 0)
                    return          // change to normal button?
                                              
                desserts[index].quantity--
                order_quant--
                total -= desserts[index].price
                order_label.textContent = `${desserts[index].quantity}`
                cart_items.textContent = `(${order_quant})`
                item_quantity.textContent = `${desserts[index].quantity}x`
                item_total.textContent = `${(desserts[index].price * desserts[index].quantity).toFixed(2)}`

                if (total == 0) 
                    total_label.textContent = `$${total}`
                else
                    total_label.textContent = `$${total.toFixed(2)}`

                // console.log(index)
                // console.log(cart)
                // console.log('order quantity: ', order_quant)
                // console.log(typeof desserts[index].price)
                // console.log(desserts[index].quantity)
                // console.log(desserts[index])
                // console.log('this index price: ', desserts[index].price)
                // console.log('this index total: ', total)
            })

            inc_btn.addEventListener('click', () => {
                desserts[index].quantity++
                order_quant++
                total += desserts[index].price
                order_label.textContent = `${desserts[index].quantity}`
                cart_items.textContent = `(${order_quant})`
                total_label.textContent = `$${total.toFixed(2)}`
                item_quantity.textContent = `${desserts[index].quantity}x`
                item_total.textContent = `${(desserts[index].price * desserts[index].quantity).toFixed(2)}`

                // console.log(index)
                // console.log(cart)
                // console.log('order quantity', order_quant)
                // console.log(desserts[index].quantity)
                // console.log(desserts[index])
                // console.log('this index price: ', desserts[index].price)
                // console.log('this index total: ', total)
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