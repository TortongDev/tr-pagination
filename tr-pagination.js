
const tr_pagination = document.querySelector('#tr-pagination');
// const firstBtn = `<button class="btn-pag first" onclick="fetchDataByMainBtn('first')">First</button>`;
// const lastBtn = `<button class="btn-pag last" onclick="fetchDataByMainBtn('last')">Last</button>`;
// const previousBtn = `<button class="btn-pag previous" onclick="fetchDataByMainBtn('previous')">Previous</button>`;
// const nextBtn = `<button class="btn-pag next" onclick="fetchDataByMainBtn('next')">Next</button>`;
// const env_hidden = `<input type="hidden" id="env_hidden">`;

const firstBtn = document.createElement("div");
firstBtn.classList.add("btn-pag");
firstBtn.classList.add("first");
firstBtn.textContent = "First";

const previousBtn = document.createElement("div");
previousBtn.classList.add("btn-pag");
previousBtn.classList.add("previous");
previousBtn.textContent = "Previous";

const nextBtn = document.createElement("div");
nextBtn.classList.add("btn-pag");
nextBtn.classList.add("next");
nextBtn.textContent = "Next";

const lastBtn = document.createElement("div");
lastBtn.classList.add("btn-pag");
lastBtn.classList.add("last");
lastBtn.textContent = "Last";

const input_hidden = document.createElement("input");
input_hidden.classList.add('current-page');
input_hidden.setAttribute("type", "hidden");
input_hidden.setAttribute("value", 1);
input_hidden.setAttribute("id", "current_page");
tr_pagination.append(firstBtn, previousBtn, nextBtn, lastBtn, input_hidden)


function showAll(data, per_page, current_page){
    let allPage = 0;
    let perPage = per_page || 10;
    let currentPage = current_page || 1;
    let html = "";
    // const first = action.first || false
    // const previous = action.previous || false
    // const number = action.number || false
    // const next = action.next || false
    // const last = action.last || false
    const rowAll = data.length || 0;
    const sumBtn = Math.ceil(rowAll / perPage);
    const current_pages = document.querySelector("#current_page");
    const number = document.querySelectorAll(".number");

    current_pages.setAttribute('value', currentPage);
    html = "";
    
    if(number.length == 0 || number.length < 1){
        Array.isArray(data) && data.forEach(row_data => {
            html += `<div>${row_data.name}</div>`;
        });

        for (let index = 0; index < sumBtn; index++) {
            const numberBtn = document.createElement("div");
            numberBtn.classList.add("btn-pag");
            numberBtn.classList.add("number");
            numberBtn.textContent = `${index+1}`;
            
            nextBtn.before(numberBtn);
        }
    }
    
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const slice_data = data.slice(start, end);
    console.log(slice_data);
    
}   

fetch('./data.json')
.then(response => response.json())
.then(data => {
    showAll(data, 5, 1);
    const tr_pagination_div = document.querySelectorAll('#tr-pagination div');
    tr_pagination_div.forEach(row => {
        row.addEventListener('click', () => {
            console.log(row);
            let number_page = 1;
            const current_page = row.textContent || 1;
            const hidden_amount_page = document.querySelector("#current_page").value || 1;
            const action = ['First','Previous', 'Next', 'Last'];
            if(!action.includes(current_page)){
                number_page = current_page;
                console.log(number_page);
                showAll(data, 5, number_page);
            }else{
                if(current_page == 'First') {
                    number_page = 0;
                    
                }else if(current_page == 'Previous'){
                    number_page = hidden_amount_page - 1;
                }else if(current_page == 'Next'){
                    if(number_page == 2) return;
                    number_page = Number(hidden_amount_page) + 1;
                }else{
                    number_page = hidden_amount_page;
                }
                showAll(data, 5, number_page);
                
            }
            
        })
        
    })
})
.catch(error => console.log(error));