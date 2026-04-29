let currentView = "grid";

function setView(view) {
    currentView = view;
    const resultDiv = document.getElementById("result");

    if (view === "grid") {
        resultDiv.className = "products grid-view";
    } else {
        resultDiv.className = "products list-view";
    }
}

async function searchProducts() {
    const query = document.getElementById("searchInput").value;
    const minPrice = document.getElementById("minPrice").value;
    const maxPrice = document.getElementById("maxPrice").value;
    const sortType = document.getElementById("sortType").value;
    const resultDiv = document.getElementById("result");

    resultDiv.innerHTML = "";

    const url = `https://dummyjson.com/products/search?q=${query}`;
    const response = await fetch(url);
    const data = await response.json();

    let products = data.products;

    if (minPrice !== "") {
        products = products.filter(product => product.price >= Number(minPrice));
    }

    if (maxPrice !== "") {
        products = products.filter(product => product.price <= Number(maxPrice));
    }

    if (sortType === "cheap") {
        products.sort((a, b) => a.price - b.price);
    } else if (sortType === "expensive") {
        products.sort((a, b) => b.price - a.price);
    } else if (sortType === "rating") {
        products.sort((a, b) => b.rating - a.rating);
    } else if (sortType === "az") {
        products.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortType === "za") {
        products.sort((a, b) => b.title.localeCompare(a.title));
    }

    if (products.length === 0) {
        resultDiv.innerHTML = `<div class="empty">Тауар табылмады</div>`;
        return;
    }

    products.forEach(product => {
        resultDiv.innerHTML += `
            <div class="card">
                <img src="${product.thumbnail}" alt="${product.title}">
                <div class="card-content">
                    <span class="badge">Қол жетімді</span>
                    <h3>${product.title}</h3>
                    <p class="price">${product.price} $</p>
                    <p class="description">${product.description}</p>
                    <p><b>Рейтинг:</b> ⭐ ${product.rating}</p>
                </div>
            </div>
        `;
    });

    setView(currentView);
}