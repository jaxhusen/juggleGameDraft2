if($('#contest-game-type').val() == "gameJuggling") {
    questions.counter = $(container_selector + " .counter_box");


        questions.counter.reset = function () {
            $('#juggling_counter').html("0");
            _st = Date.now();
            questions.counter.interval = setInterval(function () {
                var currentTimerDisplay = Math.floor((Date.now() - _st) / 1000);
                $('#juggling_counter').html(currentTimerDisplay);
            }, 1000);
        }


        var url = _baseURL + "/qgamestart/" + _view_key;
        $.get(url, {}, function (response, status) {
        console.log('response',response);


        gameDiff = $('#contest-game-level').val();
        questions.counter.reset();
        console.log("Data ", $('#contest-game-level').val())
        var image1 = document.getElementById('contest-scratch-image1').innerText;


        if (response == "OK") {
            console.log("data ", document.getElementById('game_image1'));
            questions.counter.reset();
            var image1 = document.getElementById('game_image1').innerText;

            var imageBall = [];
            imageBall.push(
                {background_image: image1, type: 1, index: null}, {background_image: image1, type: 1, index: null}),

            _st = Date.now();
            juggle(imageBall, _done, "contestJuggle", _st);
        }    
    });  
}