$(function () {

    var sumPlayer = $('.sum-player'), //получаем количество выбранных игроков
        playerRegisterBlock = $('.player-registration'), // получаем блок с регистрацией игроков
        btnRandom = '<button type="button" class="btn btn-dark btn-random" disabled>Рандом</button>', //сохраняем кнопку далее
        btnPrint = $('.print');//сохраняем кнопку печать

    //Сохраняем value инпута в масив
    function saveValue(player, input) {
        input.each(function () {
            player.push($(this).val())
        });
    }

    //Функция рандомной сортировки Игроков
    function compareRandom() {
        return Math.random() - 0.5;
    }

// проверяем какое количество игроков было выбранно в селекте, если 4 значит добавляем 4 инпута. аналогично работают другие if
    function checkValPlayer(valSelect) {
        if (valSelect.val() === '4') {
            numberPlayers(4);
            playerRegisterBlock.append(btnRandom);
            $('#fraction-1-2').css('display', 'flex');
        } else {
            $('#fraction-1-2').hide();
        }
        if (valSelect.val() === '8') {
            numberPlayers(8);
            playerRegisterBlock.append(btnRandom);
            $('#fraction-1-4').css('display', 'flex');
        } else {
            $('#fraction-1-4').hide();
        }
        if (valSelect.val() === '16') {
            numberPlayers(16);
            playerRegisterBlock.append(btnRandom);
            $('#fraction-1-8').css('display', 'flex');
        } else {
            $('#fraction-1-8').hide();
        }
    }


    //в зависимости от value указанного в select добавляем количство инпутов для регистрации на турнире
    function numberPlayers(val) {

        for (var i = 1; i <= val; i++) {
            playerRegisterBlock
                .append('<input class="form-control mb-16 name-player empty_field" type="text">');
        }

// делаем нумерацию инпутов и добавляем placeholder
        function saveIndex() {
            var inp = playerRegisterBlock.find('input');
            inp.each(function (index) {
                $(this).attr("placeholder", ++index + '. Имя игрока');
            });
        }

        saveIndex()
    }
// проверям инпуты на заполненность, если инпут не заполнен - кнопка "рандом" disabled
    function checkInput() {
        var input = $('input');
        var btn = $('.btn-random');
        input.each(function () {
            if ($(this).val() !== '') {
                // Если поле не пустое удаляем класс-указание
                $(this).removeClass('empty_field');
            } else {
                // Если поле пустое добавляем класс-указание
                $(this).addClass('empty_field');
                btn.attr('disabled');
            }
        });
    }
    // Событие change для input
    $(document).on('change', 'input', function () {
        var btn = $('.btn-random');

        var input = $('input'),
            player = [];
        saveValue(player, input);
        checkInput();
        if (!input.hasClass('empty_field')) {
            btn.removeAttr('disabled');
        }

    });

    // Событие click для кнопки рандом
    $(document).on('click', '.btn-random', function () {
        var input = $('input'),
            namePlayerResult,
            player = [];
        saveValue(player, input);
        player.sort(compareRandom);
        if (sumPlayer.val() === '4') {
            namePlayerResult = $('#fraction-1-2 p.name-player');
        }
        if (sumPlayer.val() === '8') {
            namePlayerResult = $('#fraction-1-4 p.name-player');
        }
        if (sumPlayer.val() === '16') {
            namePlayerResult = $('#fraction-1-8 p.name-player');
        }
        namePlayerResult.each(function (index) {
            $(this).text([index + 1 + '. '] + player[index]);
        });
        btnPrint.fadeIn(100); // после нажатия кнопки рандом показываем кнопку "Печать"
    });
// событие change для select= 'selected'
    $(document).on('change', '.sum-player', function () {
        var namePlayer = $('p.name-player');
        if (playerRegisterBlock.find('input').length > 0) {
            playerRegisterBlock.find('input').remove();
            playerRegisterBlock.find('button').remove();
            namePlayer.text('');
            checkValPlayer(sumPlayer);
        } else {
            checkValPlayer(sumPlayer);
        }
    });

});