$(document).ready(function() {
    /* Changing src attribute after hovering on button */
    $(".arrow-left").hover(function() {
        $(".arrow-left img").attr("src", "./assets/arrow-blue-left.png");
    }, function() {
        $(".arrow-left img").attr("src", "./assets/arrow-gray-left.png");
    });

    $(".arrow-right").hover(function() {
        $(".arrow-right img").attr("src", "./assets/arrow-blue-right.png");
    }, function() {
        $(".arrow-right img").attr("src", "./assets/arrow-gray-right.png");
    });

    /* Animation when clicking on buttons */
    $(".arrow-left").on("click", function() {
        /* Upper and lower rows of images */
        const topCounter = $(".top-counter img");
        const bottomCounter = $(".bottom-counter img");

        topCounter.animate({ left: topCounter.last().width() + 10 });
        bottomCounter.animate({ left: bottomCounter.last().width() + 10 });

        setTimeout(() => {
            topCounter.last().insertBefore(topCounter.first());
            topCounter.css({ left: 0 });

            bottomCounter.last().insertBefore(bottomCounter.first());
            bottomCounter.css({ left: 0 });
        }, 500);
    });

    $(".arrow-right").on("click", function() {
        /* Upper and lower rows of images */
        const topCounter = $(".top-counter img");
        const bottomCounter = $(".bottom-counter img");

        topCounter.css({ left: topCounter.first().width() + 10 });
        topCounter.first().insertAfter(topCounter.last());
        topCounter.animate({ left: 0 });

        bottomCounter.css({ left: bottomCounter.first().width() + 10 });
        bottomCounter.first().insertAfter(bottomCounter.last());
        bottomCounter.animate({ left: 0 });
    });
})