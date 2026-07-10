<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Pagination</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 32px;
        }

        .toolbar {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 16px;
        }

        #search_tcl_config {
            min-width: 260px;
            padding: 8px 10px;
        }

        .result {
            display: grid;
            gap: 8px;
            margin-bottom: 16px;
        }

        .row {
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 10px 12px;
        }

        .card-footer-pagination.d-none {
            display: none;
        }

        .data-empty-row {
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 16px;
            text-align: center;
        }
        
    </style>
</head>
<body>
    <div class="toolbar">
        <input type="text" id="search_tcl_config" placeholder="Search by title, name, age, or id">
        <div>Total: <span class="data-total">0</span></div>
    </div>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>H1</th>    
                <th>H2</th>    
                <th>H3</th>    
                <th>H4</th>    
                <th>H5</th>    
                <th>H6</th>    
            </tr>
        </thead>
        <tbody id="result"></tbody>
    </table>
    <div class="card-footer-pagination">
        <div id="pagination"></div>
    </div>
    <script src="./admin-pagination.js"></script>
    <script>
        
        let settingFetchPaginationSearch = createSearchPagination({
            data: [],
            searchInput: "#search_tcl_config",
            resultBody: "#result",
            totalElement: ".data-total",
            footerPagination: ".card-footer-pagination",
                pagination: "#pagination",
            perPage: 3,
            searchFields: [
                "title",
                "name",
                "nationality",
                "jersey_number",
            ],
            labels: {
                first: "First",
                prev: "Previous",
                next: "Next",
                last: "Last"
            },
            emptyHtml: `
                <tr class="data-empty-row">
                    <td colspan="6">There are no <strong class="color-main">Tcl Configs</strong></td>
                </tr>
            `,
            renderRow: tr_td,
        });
        settingFetchPaginationSearch.ajax_function_url("./data/players.json");
        setTimeout(() => {
            settingFetchPaginationSearch.refresh_list("./data/players.json");
        }, 3000);
        function tr_td(row, rowNumber){
            return `
                <tr>
                    <td>${rowNumber}</td>
                    <td>${row.title}</td>
                    <td>${row.name}</td>
                    <td>${row.age}</td>
                    <td>${row.club}</td>
                    <td>${row.nationality}</td>
                </tr>
            `;
        }

    </script>
</body>
</html>
