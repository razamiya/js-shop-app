

// get All Elements

const product_form = document.getElementById('product_form');
const product_update_form = document.getElementById('product_update_form');
const msg = document.querySelector('.msg');
const productItemg = document.querySelector('.productItem');
const single_veiw_content = document.querySelector('.single_veiw_content');

// add product localstore and validate form
product_form.onsubmit = (e) => {
    
    // default relod off
    e.preventDefault()
    
    // get form data with form object
    const form_data = new FormData(e.target);
    const data =  Object.fromEntries(form_data.entries())
    const {name, photo, price, quantity} =  Object.fromEntries(form_data.entries())

    if(!name || !photo || !price || !quantity) {
        msg.innerHTML = setAlert('All File Are Recoird')
    }else {
        // set all data localstore
        setLsData('product', data)
        msg.innerHTML = setAlert('Data Stable', 'success')
        product_form.reset()
        getAllProduct()
    }


}

// get all product and show our project

const getAllProduct = () => {

    const data =  getLsData('product');

    let list = ''
    
    if (data) {

        let totalPrice = 0;
        data.map((item, index) => {

            totalPrice += (item.price * item.quantity);
            list += `
            <tr>
            <td>${index + 1}</td>
            <td><img src="${item.photo}"></td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td>${item.price * item.quantity }</td>
            <td>
                <a class="btn btn-info btn-sm" data-bs-toggle="modal" href="#shop_single_modal" single_view_index="${index}"><i class="fas fa-eye"></i></a>
                <a class="btn btn-warning btn-sm" data-bs-toggle="modal" href="#shop_edit_modal" edit_index="${index}"><i class="fas fa-edit"></i></a>
                <a class="btn-danger btn-sm" remove_index="${index}"><i class="fas fa-trash" ></i></a>
            </td>
        </tr>
            `
        }) 

        list += `
        <tr>
            <td class="text-end" colspan="6">
                Total Amount = ${totalPrice}
            </td>
        </tr>
        `
        
    } 

    if  ( !data) {
        list = `
        <tr>
            <td colspan="7">
                <p style="color:red; margin:0px;" >Data Not Found</p>
            </td>
        </tr>
        `
    }

    
    productItemg.innerHTML = list

}
getAllProduct()


// product single view 

productItemg.onclick = (e) => {
    e.preventDefault();



  if (e.target.getAttribute('single_view_index')) {

    let index = e.target.getAttribute('single_view_index')
    const data = getLsData('product');
    const {name, photo, price} = data[index];


    single_veiw_content.innerHTML = `
    
            <img style="width:150px;" src="${photo}" alt="">
            <h2>${name}</h2>
            <p>price ${price}</p>
    `

  } else if (e.target.getAttribute('edit_index')) {

    const data =  getLsData('product');
    const index = e.target.getAttribute('edit_index');

    const {name, photo, price, quantity} = data[index]

    product_update_form.innerHTML = `
    
    <div class="my-3">
    <label for="">Name</label>
    <input name="name" value="${name}" type="text" class="form-control">
    </div>
    <div class="my-3">
        <label for="">Price</label>
        <input name="price" value="${price}" type="text" class="form-control">
    </div>
    <div class="my-3">
        <label for="">Quantity</label>
        <input name="quantity" value="${quantity}" type="text" class="form-control">
    </div>
    <div class="my-3">
        <input name="index" value="${index}" type="hidden" class="form-control">
    </div>
    <div class="my-3">
        <img src="${photo}" alt="">
    </div>
    <div class="my-3">
        <label for="">Photo</label>
        <input name="photo" value="${photo}" type="text" class="form-control">
    </div>
    <div class="my-3">
        <input type="submit" class="btn btn-primary w-100" value="Update product">
    </div>
    
    `
    
} else if (e.target.getAttribute('remove_index')) {

    const index = e.target.getAttribute('remove_index')
    const data = getLsData('product');

    data.splice(index, 1)
    updateLsData('product', data)
    getAllProduct()

}


} 


// update data pass localstrorage
product_update_form.onsubmit = (e) => {
    e.preventDefault()
    const form_data = new FormData(e.target);
    const {name, price, quantity, photo, index} = Object.fromEntries(form_data.entries());

    let all_data = getLsData('product');

    all_data[index] = { name, price, photo , quantity}

    console.log(index);

    updateLsData('product', all_data);
    
    getAllProduct()
}
