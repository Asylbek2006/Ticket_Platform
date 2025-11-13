$(document).ready(function() {
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        const inputs = $(this).find('input, textarea');
        let valid = true;
        inputs.each(function() {
            if (!$(this).val().trim()) valid = false;
        });

        if (valid) {
            $(this).fadeOut(400, function() {
                $(this).parent().html(`
                    <div class="alert alert-success">
                        <h4>Thanks a lot!</h4>
                        <p>Your message is sended, wait</p>
                    </div>
                `);
            });
        } else {
            alert('Fill in all fields.!');
        }
    });
});

