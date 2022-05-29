const quantityBox = document.querySelectorAll('.product-quantity-box .js-change-quantity');
const price= parseInt(document.querySelector('#buy_button').innerHTML);
for (let each of quantityBox){
	each.addEventListener('click', function(e){
		const math = this.getAttribute('data-quantity-func');
		const quantityInput = this.closest('.product-quantity-box').querySelector('.quantity');
		const current = parseInt(quantityInput.value);
        const btn= document.querySelector('#buy_button');
        
		if (math === 'plus') {

			quantityInput.value = current + 1; 
            btn.textContent=( parseInt(quantityInput.value) * price)

		} else if (quantityInput.value > 1){
			quantityInput.value = current -1 ;
            btn.textContent=( parseInt(quantityInput.value) * price)

		}

	});
}