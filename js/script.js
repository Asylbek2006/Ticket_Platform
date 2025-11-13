$(document).ready(function() {
    updateCartCount();
    updateFavCount();
    loadTheme();

    $('#themeToggle').on('click', function() {
        $('body').toggleClass('dark-mode');
        const isDark = $('body').hasClass('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        $(this).html(isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>');
    });

    $(document).on('click', '.add-to-cart', function() {
        const id = $(this).data('id');
        const name = $(this).data('name');
        const price = parseInt($(this).data('price'));
        if (!id || !name || !price) return;

        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existing = cart.find(i => i.id === id);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        $(this).addClass('btn-success').text('Added!').prop('disabled', true);
        setTimeout(() => {
            $(this).removeClass('btn-success').text('Add to Cart').prop('disabled', false);
        }, 1000);
    });

    $(document).on('click', '.add-to-fav', function() {
        const id = $(this).data('id');
        const name = $(this).data('name');
        if (!id || !name) return;

        let favs = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (!favs.find(f => f.id === id)) {
            favs.push({ id, name });
            localStorage.setItem('favorites', JSON.stringify(favs));
            updateFavCount();
            $(this).removeClass('text-muted').addClass('text-danger').html('<i class="fas fa-heart"></i>');
        }
    });

    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 50) {
            $('.header').addClass('scrolled');
            $('body').css('padding-top', '70px');
        } else {
            $('.header').removeClass('scrolled');
            $('body').css('padding-top', '76px');
        }
    });
});

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    $('#cartCount').text(count);
}

function updateFavCount() {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    $('#favCount').text(favs.length);
}

function loadTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    if (theme === 'dark') {
        $('body').addClass('dark-mode');
        $('#themeToggle').html('<i class="fas fa-sun"></i>');
    }
}

// Load news only on index.html
if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    loadNews();
}

function loadNews() {
    const apiKey = 'a244132d47f9495e98d5042398494595'; 
    fetch(`https://api.worldnewsapi.com/search-news?source-country=kz&categories=entertainment&number=3&api-key=${apiKey}`)
        .then(r => r.json())
        .then(d => {
            if (d.news && d.news.length > 0) {
                const news = d.news.slice(0, 3);
                const html = news.map(a => `
                    <div class="col-md-4">
                        <div class="card h-100 shadow-sm">
                            <img src="${a.image || 'images/news.jpg'}" class="card-img-top" style="height:200px; object-fit:cover;">
                            <div class="card-body">
                                <h6 class="card-title">${a.title}</h6>
                                <p class="card-text text-muted small">${new Date(a.published_at).toLocaleDateString()}</p>
                                <a href="${a.link}" target="_blank" class="btn btn-outline-primary btn-sm">Read More</a>
                            </div>
                        </div>
                    </div>
                `).join('');
                $('#newsContainer').html(html);
            } else {
                renderFakeNews(); 
            }
        })
        .catch(() => {
            renderFakeNews();
        });
}

function renderFakeNews() {
    const fakeNews = [
        {
            title: "Kairat vs Real Madrid: Historic Match in Almaty",
            publishedAt: "2025-12-10T20:00:00Z",
            url: "https://tengrinews.kz",
            urlToImage: "images/sport.jpg"
        },
        {
            title: "Freedom Again: Movie Premiere This Friday",
            publishedAt: "2025-12-12T19:00:00Z",
            url: "https://kinopoisk.ru",
            urlToImage: "images/cinema.jpg"
        },
        {
            title: "Modern Art Exhibition Opens Tomorrow",
            publishedAt: "2025-12-18T10:00:00Z",
            url: "https://inform.kz",
            urlToImage: "images/exhibition.jpg"
        }
    ];

    const html = fakeNews.map(a => `
        <div class="col-md-4">
            <div class="card h-100 shadow-sm">
                <img src="${a.urlToImage}" class="card-img-top" style="height:200px; object-fit:cover;">
                <div class="card-body">
                    <h6 class="card-title">${a.title}</h6>
                    <p class="card-text text-muted small">${new Date(a.publishedAt).toLocaleDateString()}</p>
                    <a href="${a.url}" target="_blank" class="btn btn-outline-primary btn-sm">Read More</a>
                </div>
            </div>
        </div>
    `).join('');
    $('#newsContainer').html(html);
}