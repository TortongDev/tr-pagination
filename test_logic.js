const arr = [
    {
        "id": 1,
        "title": "Senior Developer",
        "name": "Mr. John Doe",
        "age": 28
    },
    {
        "id": 2,
        "title": "Project Manager",
        "name": "Ms. Jane Smith",
        "age": 34
    },
    {
        "id": 3,
        "title": "UI/UX Designer",
        "name": "Mr. Alex Jones",
        "age": 25
    },
    {
        "id": 4,
        "title": "QA Engineer",
        "name": "Ms. Sarah Connor",
        "age": 31
    },
    {
        "id": 5,
        "title": "Data Analyst",
        "name": "Mr. Michael Brown",
        "age": 29
    },
    {
        "id": 6,
        "title": "DevOps Engineer",
        "name": "Mr. David Kim",
        "age": 33
    },
    {
        "id": 7,
        "title": "Product Owner",
        "name": "Ms. Emily White",
        "age": 27
    }
]


const bclick = document.querySelectorAll('#tb_data div');

form_search("#search", ".bclick");
function form_search(element_id, element_row){
    const search = document.querySelector(element_id);
    const row = document.querySelectorAll(element_row);
    search.addEventListener('input', (ipt) => {
        const kw = (ipt.target.value).toLowerCase() || "";
        row.forEach(raws => {
            const raw = (raws.dataset.title).toLowerCase() || "";
            
            if(!raw.includes(kw)){
                raws.style.display = "none";
            }else{
                raws.style.display = "";
            }
        })
        
    })
    
}
fetch_get('./data.json', "#tb_data")
function fetch_get(url,element_id_data){
    const element_html = document.querySelector(element_id_data);
    fetch(url)
    .then(response => response.json())
    .then(data => {
        if(typeof create_html == 'function') create_html(data, element_html)
    })
    .catch(error => console.log(error));
}

// create_html2({
//     beforeRender(row) {
//         console.log("Before", row);
//     },
//     render(row) {
//         return `<tr><td>${row.id}</td></tr>`;
//     },
//     afterRender(html) {
//         console.log("After", html);
//     }
// });

// function create_html2(options) {
//     const row = { id: 1 };

//     options.beforeRender(row);

//     const html = options.render(row);

//     options.afterRender(html);
// }
fetch_render({
    rander: true,
    element: "#tbody_data",
    setHtml: {
        per_page: 25,
        columns: 3,
        data: arr,
    },
})
function fetch_render(callbacks){
    let per_page = 3;
    let data = [];
    let html = "";

    if(typeof callbacks.setHtml == 'object'){
        per_page = callbacks.setHtml.per_page;
        data = callbacks.setHtml.data;
    }
    console.log("per_page ", per_page);
    console.log("data ", data);
    const render    = callbacks.rander || false;
    const element   = callbacks.element || "";
    if(!document.querySelector(element)){
        alert("ยังไม่ได้สร้าง element สำหรับแสดงข้อมูล")
    }
    if(!element){
        alert("ยังไม่ได้แนบ property : element")
    }
    if(render){

        document.querySelector(element).innerHTML = html
    }
    
    
}