let cart = []
modalkey = 0;
let modalqt = 1;
const c = (el)=> { return document.querySelector (el); }
const cs = (el)=> document.querySelectorAll (el);

pizzaJson.map ((item, index) => {
    let pizzaItem = c ('.models .pizza-item').cloneNode (true);
    //preencher infs:

    pizzaItem.setAttribute  ('data-key', index)
    pizzaItem.querySelector(".pizza-item--img img ").src = item.img ;
    pizzaItem.querySelector ('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        let key = e.target.closest ('.pizza-item').getAttribute ('data-key');
        modalkey = key;
        modalqt = 1;
        //preencher infs (janelinha):
        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        c('.pizzaInfo--size.selected').classList.remove('selected');
        cs('.pizzaInfo--size').forEach ((size, sizeIndex)=>{
            if (sizeIndex == 2) {
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
        });
        c('.pizzaInfo--qt').innerHTML = modalqt
        c(".pizzaWindowArea").style.opacity = 0;
        c(".pizzaWindowArea").style.display = 'flex';
        setTimeout (() => {
            c(".pizzaWindowArea").style.opacity = 1;
        }, 500);
    })
    
    c (".pizza-area").append (pizzaItem); // append adiciona item diferente de ".innerhtml" que substitui.


})

// eventos da janela:
function closemodal () {
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout (()=> {
        c('.pizzaWindowArea').style.display = 'none'
    },500);
}

cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach ((item) => {
    item.addEventListener('click', closemodal);
})

c('.pizzaInfo--qtmais').addEventListener('click', () => {
    if (modalqt < 15) {
    modalqt++;
    c('.pizzaInfo--qt').innerHTML = modalqt;
    }
})

c('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (modalqt > 1) {
        modalqt--;
        c('.pizzaInfo--qt').innerHTML = modalqt;
    }
})

cs('.pizzaInfo--size').forEach ((size, sizeIndex) =>{
    size.addEventListener('click', (e)=> {
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add ('selected');
        let tamanho = c('.pizzaInfo--size.selected').getAttribute('data-key');
        if (tamanho == "2") {
            c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[modalkey].price.toFixed(2)}`;
        } else if (tamanho == "1") {
            c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[modalkey].pricem.toFixed(2)}`;
        } else if (tamanho == "0") {
            c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[modalkey].pricep.toFixed(2)}`;
        }
    });
});

c('.pizzaInfo--addButton').addEventListener('click', ()=> {
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));

    let identifier = pizzaJson[modalkey].id+'@'+size;
    let key = cart.findIndex((item)=> item.identifier == identifier)

    if (key > -1) {
        cart[key].qt += modalqt
    } else {
        cart.push ( {
            identifier,
            id:pizzaJson[modalkey].id,
            size,
            qt:modalqt
        })
    
    }
    closemodal ()
    updatecart ()
    
});

function updatecart () {
    if (cart.length > 0) {
        c('aside').classList.add ('show');
        c('.cart').innerHTML = '';
        
        for (let i in cart) {
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);
            let cartItem = c('.models .cart--item').cloneNode(true);
            
            let pizzaSizeName;
            switch (cart[i].size) {
                case 0:
                    pizzaSizeName = 'P';
                 break;
                case 1:
                    pizzaSizeName = 'M';
                 break;
                case 2:
                    pizzaSizeName = 'G';
                 break;
            }
            
            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`
            
            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = caret[i].qt;
            



            c('.cart').append(cartItem)
        }
    } else {
        c('aside').classList.remove ('show')
    }
}
