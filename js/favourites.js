$(document).ready(function() {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (favs.length === 0) {
        $('#favoritesList').html('<p class="text-center">No favorites yet.</p>');
        return;
    }
    const html = favs.map(f => `
        <div class="col-md-4">
            <div class="card h-100">
                <div class="card-body">
                    <h5>${f.name}</h5>
                    <button class="btn btn-danger btn-sm remove-fav" data-id="${f.id}">Remove</button>
                </div>
            </div>
        </div>
    `).join('');
    $('#favoritesList').html(html);

    $('.remove-fav').on('click', function() {
        const id = $(this).data('id');
        let favs = JSON.parse(localStorage.getItem('favorites') || '[]');
        favs = favs.filter(f => f.id !== id);
        localStorage.setItem('favorites', JSON.stringify(favs));
        location.reload();
    });
});