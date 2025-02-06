const desserts_data = document.querySelectorAll('.dessert-info')
const buttons = document.querySelectorAll('.add-button')
const cart_items = document.querySelector('.cart-items')
const cart_content = document.querySelector('.cart-content')
const desserts = []
let cart = []
let order_quant = 0
let total = 0
let total_label

class Dessert {
    constructor(type, name, price){
        this.type = type
        this.name = name
        this.price = price
        this.quantity
        this.total
        this.id
        this.index                  // index for cart array
    }
}

for (let data of desserts_data) {
    let dessert = new Dessert
    let array = Array.from(data.children)

    dessert.type = array[0].textContent
    dessert.name = array[1].textContent
    dessert.price = Number(array[2].textContent.split('$')[1])
    dessert.quantity = 0
    dessert.index = 0
    dessert.id = data.parentElement.classList[1]
    desserts.push(dessert)
}
// console.log(desserts)

cart_items.textContent = `(${order_quant})`
const ul = document.createElement('ul')
let cart_elements = document.createElement('div')
ul.className = 'item-list'
let cart_index = 0

buttons.forEach((button, index) => {
    button.classList.add('inactive')
    button.addEventListener('click', () => {
        if (!cart.includes(desserts[index])) {
            cart.push(desserts[index])
            desserts[index].index = cart.indexOf(desserts[index])
            desserts[index].quantity++
            desserts[index].total = desserts[index].price * desserts[index].quantity
            // console.log(cart)
            
            if (!cart_content.contains(ul)) {
                cart_content.innerHTML = ''
                cart_content.append(ul)
            } 
                
            cart_elements.innerHTML = `
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
            button.classList.add('active')
            
            /////////  RENDER CART ITEMS //////////

            const item_list = document.querySelector('.item-list')
            const item = document.createElement('li')
            const item_thumb = document.createElement('div')
            const item_info = document.createElement('div')
            const item_name = document.createElement('h4')
            const item_figs = document.createElement('div')
            const item_quantity = document.createElement('label')
            const item_price = document.createElement('label')
            const item_total = document.createElement('label')
            const remove_item = document.createElement('div')
            const remove_icon = document.createElement('img')
            const confirm_order = document.querySelector('.confirm-order')
            const order_modal = document.querySelector('.order-modal')
            const overlay = document.querySelector('.overlay')
            const order_list = document.querySelector('.order-list')

            item.className = 'item'
            item_thumb.className = 'item-thumb'
            item_info.className = 'item-info'
            item_name.className = 'item-name'
            item_figs.className = 'item-figs'
            item_quantity.className = 'item-quantity'
            item_price.className = 'item-price'
            item_total.className = 'item-total'
            remove_item.className = 'remove-item'
            remove_icon.className = 'remove-icon'

            item.style.listStyle = 'none'
            item.setAttribute('id', `${desserts[index].id}`)
            item_quantity.setAttribute('id', `quantity-${index}`)
            item_total.setAttribute('id', `total-${index}`)
            remove_icon.setAttribute('id', `remove-${index}`)
            remove_icon.setAttribute('src', 'assets/images/icon-remove-item.svg')
            remove_icon.setAttribute('alt', 'remove icon')

            item_name.textContent = `${desserts[index].name}`
            item_quantity.textContent = `${desserts[index].quantity}x`   // !
            item_price.textContent = `@$${desserts[index].price.toFixed(2)}` 
            item_total.textContent = `$${(desserts[index].total).toFixed(2)}`

            item_figs.append(item_quantity, item_price, item_total)
            item_info.append(item_name, item_figs)

            remove_icon.setAttribute('id', `remove-${cart_index}`)
            // item.setAttribute('id', `${cart_index}`)    

            remove_icon.addEventListener('click', () => {
                cart.splice(desserts[index].index, 1)
                item_list.removeChild(item)
                order_quant -= desserts[index].quantity
                total -= desserts[index].total
                desserts[index].quantity = 0
                desserts[index].total = 0

                if (total < 0)
                    total = 0

                cart_items.textContent = `(${order_quant})`
                order_label.textContent = `${desserts[index].quantity}`
                total_label.textContent = `$${total.toFixed(2)}`
                // console.log('before reorg: ', cart)

                cart.forEach((cartItem, cartIndex) => {
                    cartItem.index = cartIndex
                })
                // reset button to inital state
                button.innerHTML = `
                    <div class="cart-img"><img src="assets/images/icon-add-to-cart.svg" alt="cart icon"></div>
                    <h3>Add to Cart</h3>
                `
                button.classList.remove('active')
            })

            
            // console.log('ITEMS: ', items)

            // confirm_order.addEventListener('click', () => {
            //     order_modal.style.display = 'block'
            //     overlay.style.display = 'block'
            //     // document.body.style.position = 'fixed'

            //     console.log(items)

            //     // items.forEach((orderItem, orderIndex) => {
            //     //     console.log(orderItem)
            //     // })
            // })

            // items.forEach((orderItem, orderIndex) => {
            //     console.log(orderItem)
            // })

            remove_item.append(remove_icon)
            cart_index++

            item.append(item_thumb, item_info, remove_item)
            item_list.append(item)

            const items = document.querySelectorAll('.item')
            // const thumbnails = document.querySelectorAll('.item-thumb')
            // console.log('items: ', items)

            confirm_order.addEventListener('click', () => {
                order_modal.style.display = 'block'
                overlay.style.display = 'block'
                // document.body.style.position = 'fixed'

                items.forEach((orderItem, orderIndex) => {
                    // clone item and remove X button
                    // const item = orderItem
                    // item.removeChild()
                    const thumbnail = document.querySelector('.item-thumb')
                    const item_img = document.createElement('img')

                    item_img.setAttribute('src', `assets/images/image-${orderItem.id}-thumbnail.jpg`)
                    thumbnail.append(item_img)
                    console.log(items)
                    order_list.append(orderItem)

                })

                // thumbnails.forEach(thumbnail => {
                //     const item_img = document.createElement('img')
                //     item_img.setAttribute('src', `assets/images/image-${item.id}-thumbnail.jpg`)
                //     thumbnail.append(item_img)
                // })
            })

            //////////////////////////////////////

            const dec_btn = document.getElementById(`dec-${index}`)
            const inc_btn = document.getElementById(`inc-${index}`)
            const order_label = document.getElementById(`label-${index}`)
            total_label = document.querySelector('.ot-label-2')

            order_quant++
            total += desserts[index].price
            cart_items.textContent = `(${order_quant})`
            total_label.textContent = `$${total.toFixed(2)}`

            dec_btn.addEventListener('click', () => {
                if (desserts[index].quantity == 0)
                    return      
                                              
                desserts[index].quantity--
                order_quant--
                total -= desserts[index].price
                
                order_label.textContent = `${desserts[index].quantity}`
                cart_items.textContent = `(${order_quant})`
                item_quantity.textContent = `${desserts[index].quantity}x`
                item_total.textContent = `$${(desserts[index].price * desserts[index].quantity).toFixed(2)}`

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
                desserts[index].total = desserts[index].quantity * desserts[index].price
                order_quant++
                total += desserts[index].price

                order_label.textContent = `${desserts[index].quantity}`
                cart_items.textContent = `(${order_quant})`
                total_label.textContent = `$${total.toFixed(2)}`
                item_quantity.textContent = `${desserts[index].quantity}x`
                item_total.textContent = `$${(desserts[index].total).toFixed(2)}`

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