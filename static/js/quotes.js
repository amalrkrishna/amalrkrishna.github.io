(function() {
    var quotes = $('#quotes h5');
    var quoteIndex = -1;
    
    function showNextQuote() {
        ++quoteIndex;
        quotes.eq(quoteIndex % quotes.length)
            .delay(1000)
            .fadeIn(2000)
            .delay(1000)
            .fadeOut(2000, showNextQuote);
    }
    
    showNextQuote();    
})();
