let events = [
    { id: "1", name: "Football: Kairat vs Real Madrid", date: "December 10, 20:00", venue: "Almaty Central Stadium", price: 5000, category: "sport", image: "sport.jpg" },
    { id: "2", name: "Movie: \"Freedom Again\"", date: "December 12, 19:00", venue: "Kinopark Esentai", price: 2500, category: "cinema", image: "cinema.jpg" },
    { id: "3", name: "Exhibition: \"Modern Art\"", date: "December 18–25", venue: "National Museum", price: 1500, category: "exhibition", image: "exhibition.jpg" },
    { id: "4", name: "Concert: \"Star World\"", date: "December 15, 19:00", venue: "Astana Arena", price: 8000, category: "concert", image: "concert.jpg" },
    { id: "5", name: "Theater: \"Romeo & Juliet\"", date: "December 20, 18:00", venue: "National Theater", price: 6000, category: "theater", image: "theater.jpg" }
];

$(document).ready(function() {
    displayEvents(events);

    $('#categoryFilter').on('change', applyFilters);
    $('#dateFilter').on('change', applyFilters);
});

function applyFilters() {
    const category = $('#categoryFilter').val();
    const date = $('#dateFilter').val();

    let filtered = events;
    if (category) {
        filtered = filtered.filter(e => e.category === category);
    }
    if (date) {
        filtered = filtered.filter(e => e.date.includes(date));
    }
    displayEvents(filtered);
}

function displayEvents(eventsToShow) {
    const container = $('#eventsContainer');
    if (eventsToShow.length === 0) {
        container.html('<p class="text-center">No events found.</p>');
        return;
    }

    const html = eventsToShow.map(event => `
        <div class="col-md-4 mb-4">
            <div class="card event-card h-100 shadow-sm">
                <img src="images/${event.image}" class="card-img-top" alt="${event.name}">
                <div class="card-body">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text"><i class="fas fa-calendar"></i> ${event.date}</p>
                    <p class="card-text"><i class="fas fa-map-marker-alt"></i> ${event.venue}</p>
                    <p class="card-text text-primary fw-bold">${event.price} KZT</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <button class="btn btn-outline-primary add-to-cart"
                                data-id="${event.id}"
                                data-name="${event.name}"
                                data-price="${event.price}">
                            Add to Cart
                        </button>
                        <button class="btn btn-link text-muted add-to-fav p-0"
                                data-id="${event.id}"
                                data-name="${event.name}">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    container.html(html);
}