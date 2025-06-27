const desserts_data = document.querySelectorAll('.dessert-info')
const buttons = document.querySelectorAll('.add-button')
const cart_items = document.querySelector('.cart-items')
const cart_content = document.querySelector('.cart-content')
const dessert_images = document.querySelectorAll('.dessert-img')
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

dessert_images.forEach((dessertImage, imageIndex) => {
    dessertImage.setAttribute('id', `img-${imageIndex}`)
})

cart_items.innerHTML = `&nbsp;(${order_quant})`
const ul = document.createElement('ul')
let cart_elements = document.createElement('div')
ul.className = 'item-list'
let cart_index = 0

buttons.forEach((button, index) => {
    const dessert_image = document.getElementById(`img-${index}`)

    dessert_image.classList.add('img-inactive')
    button.classList.add('inactive')

    button.addEventListener('click', () => {
        if (!cart.includes(desserts[index])) {
            cart.push(desserts[index])
            desserts[index].index = cart.indexOf(desserts[index])
            desserts[index].quantity++
            desserts[index].total = desserts[index].price * desserts[index].quantity
            
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
                <div class="ol-container">
                    <label class="order-label" id="label-${index}">${desserts[index].quantity}</label>
                </div>
                <div class="inc-quant" id="inc-${index}">
                    <img src="assets/images/icon-increment-quantity.svg" alt="increment sign" class="order-img">
                </div>
            `
            button.classList.add('active')
            dessert_image.classList.add('img-active')
            
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
            item_quantity.textContent = `${desserts[index].quantity}x`   
            item_price.textContent = `@$${desserts[index].price.toFixed(2)}` 
            item_total.textContent = `$${(desserts[index].total).toFixed(2)}`

            item_figs.append(item_quantity, item_price, item_total)
            item_info.append(item_name, item_figs)

            remove_icon.setAttribute('id', `remove-${cart_index}`)

            remove_icon.addEventListener('click', () => {
                cart.splice(desserts[index].index, 1)
                item_list.removeChild(item)
                order_quant -= desserts[index].quantity
                total -= desserts[index].total
                desserts[index].quantity = 0
                desserts[index].total = 0

                if (total < 0)
                    total = 0

                cart_items.innerHTML = `&nbsp;(${order_quant})`
                order_label.textContent = `${desserts[index].quantity}`
                total_label.textContent = `$${total.toFixed(2)}`

                cart.forEach((cartItem, cartIndex) => {
                    cartItem.index = cartIndex
                })
                // reset button to inital state
                button.innerHTML = `
                    <div class="cart-img"><img src="assets/images/icon-add-to-cart.svg" alt="cart icon"></div>
                    <p>Add to Cart</p>
                `
                button.classList.remove('active')
                dessert_image.classList.remove('img-active')
            })

            remove_item.append(remove_icon)
            cart_index++

            item.append(item_thumb, item_info, remove_item)
            item_list.append(item)

            //////////////////////////////////////

            const items = item_list.childNodes
            const confirmed_label = document.querySelector('.cot-label-2')

            confirm_order.addEventListener('click', () => {
                if (!item_list.hasChildNodes())
                    return

                window.scrollTo({ top: 0, behavior: 'smooth'})
                order_modal.style.display = 'block'
                overlay.style.display = 'block'
                confirmed_label.textContent = total_label.textContent
                
                items.forEach(orderItem => {
                    const modal_item = orderItem.cloneNode(true)
                    const remove_button = modal_item.querySelector('.remove-item')
                    const confirmed_item_info = modal_item.querySelector('.item-info')
                    const confirmed_item_name = modal_item.querySelector('.item-name')
                    const total_container = document.createElement('div')
                    const confirmed_item_figs = modal_item.querySelector('.item-figs')
                    const confirmed_item_quant = confirmed_item_figs.querySelector('.item-quantity')
                    const confirmed_item_price = confirmed_item_figs.querySelector('.item-price')
                    
                    confirmed_item_info.classList.add('confirmed-item-info')
                    confirmed_item_name.classList.add('confirmed-item-name')
                    confirmed_item_figs.className = 'confirmed-item-figs'
                    confirmed_item_quant.classList.add('confirmed-item-quant')
                    confirmed_item_price.classList.add('confirmed-item-price')
                    total_container.className = 'total-container'

                    // relocating the item total label cos I dont like using transform:translate
                    // edit: fucking headache, should've just used transform:translate
                    const confirmed_item_total = confirmed_item_figs.querySelector('.item-total')
                    const item_total_copy = confirmed_item_total.cloneNode(true)

                    item_total_copy.className = 'confirmed-item-total'
                    confirmed_item_figs.removeChild(confirmed_item_total)
                    total_container.append(item_total_copy)
                    modal_item.append(total_container)
                    
                    // remove the X button and add thumbnail
                    modal_item.classList.add('confirmed-item')
                    modal_item.removeChild(remove_button)
                    const thumbnail = modal_item.querySelector('.item-thumb')
                    const item_img = document.createElement('img')

                    item_img.setAttribute('src', `assets/images/image-${modal_item.id}-thumbnail.jpg`)
                    item_img.className = 'item-img'
                    thumbnail.append(item_img)
                    order_list.append(modal_item)
                })

                const new_order_btn = document.querySelector('.new-order')
                new_order_btn.addEventListener('click', () => {
                    location.reload()                                           // choosing my battles innit
                })
            })

            const dec_btn = document.getElementById(`dec-${index}`)
            const inc_btn = document.getElementById(`inc-${index}`)
            const order_label = document.getElementById(`label-${index}`)
            total_label = document.querySelector('.ot-label-2')

            order_quant++
            total += desserts[index].price
            cart_items.innerHTML = `&nbsp;(${order_quant})`
            total_label.textContent = `$${total.toFixed(2)}`

            dec_btn.addEventListener('click', () => {
                if (desserts[index].quantity == 0)
                    return      
                                              
                desserts[index].quantity--
                order_quant--
                total -= desserts[index].price
                
                order_label.textContent = `${desserts[index].quantity}`
                cart_items.innerHTML = `&nbsp;(${order_quant})`
                item_quantity.textContent = `${desserts[index].quantity}x`
                item_total.textContent = `$${(desserts[index].price * desserts[index].quantity).toFixed(2)}`

                if (total == 0) 
                    total_label.textContent = `$${total}`
                else
                    total_label.textContent = `$${total.toFixed(2)}`
            })

            inc_btn.addEventListener('click', () => {
                desserts[index].quantity++
                desserts[index].total = desserts[index].quantity * desserts[index].price
                order_quant++
                total += desserts[index].price

                order_label.textContent = `${desserts[index].quantity}`
                cart_items.innerHTML = `&nbsp;(${order_quant})`
                total_label.textContent = `$${total.toFixed(2)}`
                item_quantity.textContent = `${desserts[index].quantity}x`
                item_total.textContent = `$${(desserts[index].total).toFixed(2)}`
            })
        } else {
            return  
        }
    })
})