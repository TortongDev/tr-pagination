function createSearchPagination(options){
	let allData = options.data || [];
	let activePage = 1;

	const config = {
		searchInput: options.searchInput,
		resultBody: options.resultBody,
		pagination: options.pagination,
		totalElement: options.totalElement,
		footerPagination: options.footerPagination,
		perPage: options.perPage || 25,
		searchFields: options.searchFields || [],
		renderRow: options.renderRow,
		emptyHtml: options.emptyHtml || "",
		labels: {
			first: "First",
			prev: "Previous",
			next: "Next",
			last: "Last",
			...(options.labels || {})
		}
	};
	const searchInput = document.querySelector(config.searchInput);
	const resultBody = document.querySelector(config.resultBody);
	const paginationElement = document.querySelector(config.pagination);
	const totalElement = document.querySelector(config.totalElement);
	const footerPagination = document.querySelector(config.footerPagination);

	if(!searchInput || !resultBody || !paginationElement || !totalElement || !footerPagination){
		throw new Error("createSearchPagination: selector not found. Please check searchInput, resultBody, pagination, totalElement, and footerPagination.");
	}

	function getFilteredData(){
		const keyword = (searchInput.value || "").toString().trim().toLowerCase();

		return allData.filter(row => {
			const searchable = config.searchFields
				.map(field => (row[field] ?? "").toString().toLowerCase())
				.join(" ");

			return keyword === "" || searchable.indexOf(keyword) > -1;
		});
	}
	
	function render(){
		const filtered = getFilteredData();
		const total = filtered.length;
		const totalPages = Math.ceil(total / config.perPage);

		totalElement.innerHTML = total;
		paginationElement.innerHTML = "";


		if(total === 0){
			footerPagination.classList.add("d-none");
			resultBody.innerHTML = config.emptyHtml;
			return;
		}

		if(activePage > totalPages){
			activePage = totalPages;
		}

		footerPagination.classList.toggle("d-none", totalPages <= 1);

		const start = (activePage - 1) * config.perPage;
		const pageData = filtered.slice(start, start + config.perPage);
		
		let html = "";
		pageData.forEach((row, index) => {
			const rowNumber = start + index + 1;
			html += config.renderRow(row, rowNumber);
		});
		
		resultBody.innerHTML = html;

		if(totalPages > 1){
			renderPagination(totalPages);
		}
	}

	function renderPagination(totalPages){
		paginationElement.innerHTML = "";

		const firstBtn = createPageButton(config.labels.first, () => goToPage(1));
		const prevBtn = createPageButton(config.labels.prev, () => goToPage(activePage - 1));

		const pageContainer = document.createElement("span");

		const nextBtn = createPageButton(config.labels.next, () => goToPage(activePage + 1));
		const lastBtn = createPageButton(config.labels.last, () => goToPage(totalPages));

		paginationElement.appendChild(firstBtn);
		paginationElement.appendChild(prevBtn);
		paginationElement.appendChild(pageContainer);
		paginationElement.appendChild(nextBtn);
		paginationElement.appendChild(lastBtn);

		const isMobile = window.innerWidth <= 767;
		const maxVisible = isMobile ? 3 : 7;

		let startPage;
		let endPage;

		if(totalPages <= maxVisible){
			startPage = 1;
			endPage = totalPages;
		}else{
			const half = Math.floor(maxVisible / 2);
			startPage = activePage - half;
			endPage = activePage + half;

			if(startPage < 1){
				startPage = 1;
				endPage = maxVisible;
			}

			if(endPage > totalPages){
				endPage = totalPages;
				startPage = totalPages - maxVisible + 1;
			}
		}

		for(let i = startPage; i <= endPage; i++){
			const pageBtn = createPageButton(i, () => goToPage(i));
			pageBtn.className = "btn btn-md btn-outline-primary mr-1 page-num-btn" + (i === activePage ? " active" : "");
			pageContainer.appendChild(pageBtn);
		}
	}

	function createPageButton(text, callback){
		const btn = document.createElement("button");
		btn.type = "button";
		btn.className = "btn btn-md btn-outline-secondary mr-1";
		btn.textContent = text;
		btn.addEventListener("click", callback);
		return btn;
	}

	function goToPage(page){
		const filtered = getFilteredData();
		const totalPages = Math.ceil(filtered.length / config.perPage);

		if(page < 1) page = 1;
		if(page > totalPages) page = totalPages;

		activePage = page;
		render();
	}

	function search(){
		activePage = 1;
		render();
	}

	function setData(newData){
		allData = newData || [];
		activePage = 1;
		render();
	}

	function clearSearch(){
		searchInput.value = "";
		search();
	}
	function ajax_function_url(url){
		fetch(url)
		.then(response => response.json())
		.then(data => {
			if(data){
				
				setData(data ?? []);
			}else{
				setData([]);
			}
		})
		.catch(error => {
			console.log(error);
			setData([]);
		});
	}

	function refresh_list(url){
		fetch(url)
		.then(response => response.json())
		.then(data => {
			if(data){
				
				setData(data ?? []);
			}else{
				setData([]);
			}
		})
		.catch(error => {
			console.log(error);
			setData([]);
		});
	}

	searchInput.addEventListener("input", function(){
		search();
	});

	return {
		render,
		search,
		setData,
		clearSearch,
		ajax_function_url,
		refresh_list
	};
}
