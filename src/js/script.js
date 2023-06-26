'use strict';

document.addEventListener('DOMContentLoaded', () => {
	const addButton = document.querySelector('#addButton');
	const productInput = document.querySelector('#productInput');
	const productList = document.querySelector('#productList');

	let savedProductList = localStorage.getItem('productList');

	if (savedProductList) {
		savedProductList = JSON.parse(savedProductList);
	} else {
		savedProductList = [];
	};

	function saveProductList() {
		localStorage.setItem('productList', JSON.stringify(savedProductList));
	};

	function deleteProductList() {
		localStorage.removeItem('productList');
	};

	function saveCheckboxState(product, state) {
		localStorage.setItem(`checkbox-${product}`, state);
	};

	function getCheckboxState(product) {
		return localStorage.getItem(`checkbox-${product}`);
	};

	function addProduct() {
		const inputValue = (productInput.value.trim()).charAt(0).toUpperCase() + (productInput.value.trim()).slice(1);;

		if (inputValue !== '') {
			const li = document.createElement('li');
			const product = inputValue;

			li.innerHTML = `
				<input type="checkbox" class="checkbox">
				<div class="product_name">${product}</div>
				<button class="delete">
				<i class="fa-solid fa-trash"></i>
				</button>
			`;

			const productName = li.querySelector('.product_name');

			const checkbox = li.querySelector('.checkbox');
			checkbox.addEventListener('change', () => {
				if (checkbox.checked) {
					productName.classList.add('checked');
					saveCheckboxState(product, 'true');
				} else {
					productName.classList.remove('checked');
					saveCheckboxState(product, 'false');
				}
				saveProductList();
			});

			const deleteBtn = li.querySelector('.delete');
			deleteBtn.addEventListener('click', () => {
				li.remove();
				savedProductList = savedProductList.filter(item => item !== product);
				localStorage.removeItem(`checkbox-${product}`);
				saveProductList();
			});

			productList.appendChild(li);
			savedProductList.push(product);
			saveProductList();

			productInput.value = '';
		}
	}

	addButton.addEventListener('click', addProduct);

	productInput.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				addProduct();
			}
	});

	savedProductList.forEach((product) => {
		const li = document.createElement('li');

		li.innerHTML = `
			<input type="checkbox" class="checkbox">
			<div class="product_name">${product}</div>
			<button class="delete">
				<i class="fa-solid fa-trash"></i>
			</button>
		`;

		const productName = li.querySelector('.product_name');

		const checkbox = li.querySelector('.checkbox');
		checkbox.addEventListener('change', () => {
			if (checkbox.checked) {
				productName.classList.add('checked');
				saveCheckboxState(product, 'true');
			} else {
				productName.classList.remove('checked');
				saveCheckboxState(product, 'false');
			}
			saveProductList();
		});

		const deleteBtn = li.querySelector('.delete');
		deleteBtn.addEventListener('click', () => {
			li.remove();
			savedProductList = savedProductList.filter(item => item !== product);
			localStorage.removeItem(`checkbox-${product}`);
			saveProductList();
		});

		productList.appendChild(li);

		const savedCheckboxState = getCheckboxState(product);
		if (savedCheckboxState === 'true'){
			checkbox.checked = true;
			productName.classList.add('checked');
		}
	});
			
	function clearProductList() {
		productList.innerHTML = '';
		savedProductList = [];
		deleteProductList();
	}
	
	const clearButton = document.querySelector('#clearButton');
	clearButton.addEventListener('click', clearProductList);
});