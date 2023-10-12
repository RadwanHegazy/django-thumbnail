// component section
let y = 0;
let x = 0;
var imgs = []

var component_list = {'text':[],'img':[],'board':{'bg':'#fff'}}

var component = document.querySelector('.component-list');
function AddComponent (name) {
    var ele = `
    <div>
        <p>${name}</p>
        <div class="more">
            <button id="control"></button>
            <button id="remove"></button>
        </div>
    </div> 
                `;

        component.innerHTML += ele;
}



// components

function SetActionToComponent(){
    var c_list = document.querySelectorAll('.component-list div');

    c_list.forEach( component =>{
    
        var edit = component.querySelector('#control');
        var remove = component.querySelector('#remove');
    
        edit.addEventListener('click',()=>{
            // contine
            var wanted_compnent_name = component.querySelector('p').textContent;
            

            document.querySelectorAll('.board *').forEach(item=>{
                if (item.textContent == wanted_compnent_name){
                    main = item;
                    ControlerView('text')
                }
                if (item.alt == wanted_compnent_name){
                    ControlerView('img')
                    main = item;
                }

                

            })

        })
    
        remove.addEventListener('click',()=>{
            var wanted_compnent_name = component.querySelector('p').textContent;

            
            document.querySelectorAll('.board *').forEach(item=>{
                if (item.textContent == wanted_compnent_name){
                    item.remove()
                    component.remove()
                }
                if (item.alt == wanted_compnent_name){
                    item.remove()
                    component.remove()
                }
            })

        })
    
    })
    
}



// main component which we control it
var main = '';
var board = document.getElementById('board');


function ControlerView (type){
    var sections = document.querySelectorAll(".controler-section .options div");

    sections.forEach(i=>{i.classList.remove('view')})

    if (type == 'text'){
        sections.forEach(i=>{

            if (i.className == 'font-options'){
                i.classList.add('view')
            }
        })
    }else{
        sections.forEach(i=>{

            if (i.className == 'img-options'){
                i.classList.add('view')
            }
        })
    }

    SetActionToComponent()
}

// View And Hide Text Overlayer
var add_text_container = document.querySelector('.add-text-overlayer');
document.getElementById('add-text-btn').addEventListener('click',function(){
    add_text_container.classList.add('view')
})

var cancel_btn = document.querySelector('#cancel-text');

cancel_btn.addEventListener('click',function(){
    add_text_container.classList.remove('view')
    add_text_container.querySelector('input').value = '';
})



// Choose Image To Add
var img = document.getElementById('choose-img');
var imgBtn = document.getElementById('add-img-btn');
var imgWidth = document.querySelector('.img-options #img-width');
var imgHeight = document.querySelector('.img-options #img-height');

imgBtn.addEventListener('click',()=>{
    img.click()
})


imgWidth.addEventListener('change',(e)=>{
    var p_size = imgWidth.value;

    if (p_size < 150){
        main.style.width = `${p_size}px`;
        component_list.img.forEach( item =>{
            if (item.name == main.alt){
                item.width = parseInt(p_size)
            }
        })
    }else{
        alert("وصلت لاقصي حجم")
    }
})

imgHeight.addEventListener('change',(e)=>{
    var p_size = imgHeight.value;

    if (p_size < 200){
        main.style.height = `${p_size}px`;
        component_list.img.forEach( item =>{
            if (item.name == main.alt){
                item.height = parseInt(p_size)
            }
        })
    }else{
        alert("وصلت لاقصي حجم")
    }
})


img.addEventListener('change',(e)=>{

    var main_img = e.target.files[0];
    imgs.push({
        'img' : main_img,
        'name' : main_img.name,
    })
    
    var my_image = document.createElement('img');

    my_image.src = URL.createObjectURL(main_img);
    my_image.setAttribute('alt',main_img.name)


    
    component_list.img.push({
        'name' : main_img.name,
        'x' : 0,
        'y' : 0,
        'width' : 50,
        'height' : 100,
    })

    AddComponent(main_img.name)
    board.appendChild(my_image)
    
    main = my_image;
    ControlerView('img')

    imgWidth.value = 50;
    imgHeight.value = 100;

})







// add text to board
var text_options = document.querySelector('.font-options');
var text = document.getElementById('add-text-value');
var addTextBtn = document.getElementById('add-text');


addTextBtn.addEventListener('click',()=>{
    var val = text.value;

    if (val){

        var p = document.createElement('p');
        p.textContent = val

        main = p;
        
        board.appendChild(p)
        AddComponent(val)

        text.value = '';
        add_text_container.classList.remove('view')
        
        ControlerView('text')
        text_options.querySelector('#change_font_size').value = '20';
        component_list.text.push({
            'name' : val,
            'x' : 0,
            'y' : 0,
            'font_size' : 20,
            'font_color' : '#000',
        })

    }else{
        alert('أكتب النص')
    }
})


// Change Board bg

var board_bg = document.querySelector('#bg-color');

board_bg.addEventListener('change',()=>{

    board.style.background = board_bg.value;
    component_list.board.bg = board_bg.value;
    board.style.boxShadow = ` 0px 1px 12px ${board_bg.value}`

})


// handle font size
var font_size = document.getElementById('change_font_size');
font_size.addEventListener('change',(e)=>{
    var p_size = font_size.value;

    if (p_size < 60){
        main.style.fontSize = `${p_size}px`;
        var text = main.textContent;
        component_list.text.forEach( item =>{
        if (item.name == text){
            item.font_size = p_size;
        }
    } )
    }else{
        alert("وصلت لاقصي حجم")
    }
})


// handle font color
var font_color = document.getElementById('change_font_color');
font_color.addEventListener('change',()=>{
    var color = font_color.value;
    main.style.color = color;
    
    var text = main.textContent;
    component_list.text.forEach( item =>{
    if (item.name == text){
        item.font_color = color;
    }})

})




// Move Element
function UpdateXY(x,y){

    var text = main.textContent;
    component_list.text.forEach( item =>{
        if (item.name == text){
            item.x = x;
            item.y = y;
        }
    } )
   
}

function ImgUpdateXY(x,y){

    var text = main.alt;
    component_list.img.forEach( item =>{
        if (item.name == text){
            item.x = x;
            item.y = y;
        }
    } )


}
var elements = document.querySelector('.controler');


elements.querySelectorAll('div').forEach( item =>{
    
    
    
    if ( item.className == 'up' ){
        item.addEventListener('click',()=>{
            if (y > 0){
                y = y - 10;
                main.style.top = `${y}px`;
                if (main.textContent){
                    UpdateXY(x,y)
                }else{
                    ImgUpdateXY(x,y)
                }
       
            }
        })
    }

    if ( item.className == 'down' ){
        item.addEventListener('click',()=>{
            var max_ = 180 - main.clientHeight;
            if (y < max_){
                y = y + 10;
                main.style.top = `${y}px`;      
                if (main.textContent){
                    UpdateXY(x,y)
                }else{
                    ImgUpdateXY(x,y)
                }      
            }
        })
    }

    if ( item.className == 'left' ){
        item.addEventListener('click',()=>{
            x = x - 10;
            main.style.left = `${x}px`;
            if (main.textContent){
                UpdateXY(x,y)
            }else{
                ImgUpdateXY(x,y)
            }
        })
    }

    if ( item.className == 'right' ){
        item.addEventListener('click',()=>{
            x = x + 10;
            main.style.left = `${x}px`;
            
            if (main.textContent){
                UpdateXY(x,y)
            }else{
                ImgUpdateXY(x,y)
            }


        })
    }
    




})




// reset settings
document.querySelector('#reset').addEventListener('click',()=>{
    window.location.reload()
})


