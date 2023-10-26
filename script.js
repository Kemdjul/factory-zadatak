/* Gornji i donji redovi slika */
const topCounter = document.getElementsByClassName("top-counter")[0];
const bottomCounter = document.getElementsByClassName("bottom-counter")[0];

/* Izmijenio sam redoslijed jer sam dobivao slike s istim dimenzijama jedna iznad druge,
   a to ubija poantu zadatka */
const imageAdressTop = [
    "./assets/slider-image-1.jpg",
    "./assets/slider-image-2.jpg",
    "./assets/slider-image-3.jpg",
    "./assets/slider-image-4.jpg",
    "./assets/slider-image-5.jpg",
    "./assets/slider-image-6.jpg",
    "./assets/slider-image-7.jpg"
];

const imageAdressBottom = [
    "./assets/slider-image-8.jpg",
    "./assets/slider-image-7.jpg",
    "./assets/slider-image-6.jpg",
    "./assets/slider-image-5.jpg",
    "./assets/slider-image-9.jpg",
    "./assets/slider-image-2.jpg",
    "./assets/slider-image-3.jpg"
];

/* Mijenjanje src atributa na arrow button */
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

/* Kreiranje img elemenata u gornjem i donjem redu */
let img;
for (let i = 0; i < 7; ++i) {
    img = document.createElement("img");
    img.classList.add("slideshow-image");
    img.src = imageAdressTop[i]
    topCounter.appendChild(img);
}

for (let i = 0; i < 7; ++i) {
    img = document.createElement("img");
    img.classList.add("slideshow-image");
    img.src = imageAdressBottom[i]
    bottomCounter.appendChild(img);
}

/* Varijabla koja upravlja za koliko se donji red mice ulijevo */
let leftCounter = 0;

/* Slucaj ako stisnemo lijevu tipku */
$(".arrow-left").click(function() {
    let topImages = $(".top-counter .slideshow-image");
    let bottomImages = $(".bottom-counter .slideshow-image");

    /* Slucaj ako je prva gornja slika vece sirine od donje prve slike */
    if (topImages.first().width() > bottomImages.first().width()) {
        /* Varijabla koja prati sirinu slika koje micemo s prvog na zadnjeg mjesta */
        let widthBottomElements;
        bottomImages.first().insertAfter(bottomImages.last());

        /* Ako je zbroj leftCountera i sirine prve donje slike veca od sirine gornje slike, micemo samo jednu sliku */
        if (leftCounter + bottomImages.first().width() > topImages.first().width()) {
            widthBottomElements = bottomImages.first().width() + leftCounter + 10;
            leftCounter = leftCounter + bottomImages.first().width() - topImages.first().width();
        } 
        /* Ako je manji, micemo jos jendu dodatnu sliku s druge pozicije na zadnju */
        else {
            bottomImages.eq(1).insertAfter(bottomImages.last());
            widthBottomElements = bottomImages.first().width() + bottomImages.eq(1).width() + leftCounter + 20;
            leftCounter = widthBottomElements - topImages.first().width() - 20;
        }
        /* Offsetamo slike, odnosno postavljamo njihovu pocetnu poziciju */
        bottomImages.css({ left: widthBottomElements });
    } 
    /* Slucaj ako je prva gornja slika iste sirine kao i prva donja slika */
    else if (topImages.first().width() == bottomImages.first().width()) {
        bottomImages.first().insertAfter(bottomImages.last());
        bottomImages.css({ left: leftCounter + bottomImages.first().width() + 10 });
    } 
    /* Slucaj ako je prva gornja slika manje sirine od prve donje slike */
    else {
        bottomImages.first().insertAfter(bottomImages.last());
        bottomImages.css({ left: bottomImages.first().width() + leftCounter + 10 })
        leftCounter = leftCounter + bottomImages.first().width() - topImages.first().width();
    }

    /* Radimo animaciju, prvo donji red, onda gornji */
    bottomImages.animate({ left: leftCounter });

    topImages.css({ left: topImages.first().width() + 10 });
    topImages.first().insertAfter(topImages.last());
    topImages.animate({ left: 0 });
});

/* Slucaj ako stisnemo desnu tipku */
$(".arrow-right").click(function() {
    let topImages = $(".top-counter .slideshow-image");
    let bottomImages = $(".bottom-counter .slideshow-image");
    let bottomFocus = $(".bottom-counter .slideshow-image:last");

    /* Odmah animiramo micanje udesno za gornji i donji red */
    topImages.animate({ left: topImages.last().width() + 10 });
    bottomImages.animate({ left: topImages.last().width() + 10 + leftCounter });

    /* Stavljamo timeout jer cekamo da zavrsi animacija kako bi micali slike sa zadnjih mjesta
    na prvo mjesto */
    setTimeout(() => {
        topImages.last().prependTo(".top-counter");
        topImages.css({ left: 0 });

        /* Slucaj ako je zadnja slika donjeg reda jednake sirine zadnje slike gornjeg reda,
        onda se samo micu na prvo mjesto */
        if (bottomImages.last().width() == topImages.last().width()) {
            bottomImages.last().prependTo(".bottom-counter");
            bottomImages.css({ left: leftCounter });
        } 
        /* Slucaj ako je zadnja slika donjeg reda manja od zadnje slike gornjeg reda,
        razlikujemo dva slucaja */
        else if (bottomImages.last().width() < topImages.last().width()) {

            leftCounter += topImages.last().width() - bottomImages.last().width();
            bottomImages.last().prependTo(".bottom-counter");
            /* Koristim posebnu varijablue bottomFocus umejsto bottomImages.last() jer
            kad koristim .last() funkciju, slideshow se pocinje cudno ponasati */
            bottomFocus = $(".bottom-counter .slideshow-image:last");

            /* Ako je kontrolna varijabla leftCounter veca od sirine zadnje slike donjeg reda,
            micemo dvije slike umjesto samo jedne */
            if (leftCounter >= bottomFocus.width()) {
                leftCounter -= (bottomFocus.width() + 10); 
                bottomFocus.prependTo(".bottom-counter");
            }

            bottomImages.css({ left: leftCounter });
        } 
        /* Slucaj ako je zadnja slika donjeg reda veca od zadnje slike gornjeg */
        else if (bottomImages.last().width() > topImages.last().width()) {
            leftCounter += topImages.last().width();

            /* Ako je kontrolna varijabla leftCounter veca od sirine zadnje slike donjeg reda,
            micemo dvije slike umjesto jedne */
            if (leftCounter >= bottomImages.last().width()) {
                leftCounter -= bottomImages.last().width();
                bottomImages.last().prependTo(".bottom-counter");
            }

            bottomImages.css({ left: leftCounter });
        }
    }, 500);
});