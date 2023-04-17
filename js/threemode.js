var current_fan_mode = "1";
var drop_button = $('#drop-btn');
var select_menu = document.getElementsByTagName('select')[0];

drop_button.click(function() {
    var temp_dropdown = $('#temp-dropdown');
    var drop_content = $('#drop-content');

    if(temp_dropdown.css('height') !== '0px') {
        drop_button.text("Xem thêm");

        temp_dropdown.css('height', '0px');
        drop_content.css('visibility', 'hidden');

        drop_button.attr('disabled','disabled');
        setTimeout(function(){
            drop_button.removeAttr('disabled');
        },3000)
    }
    else {
        drop_button.text("Chọn");

        temp_dropdown.css('height', '28px');
        drop_content.css('visibility', 'visible');

        select_menu.value = current_fan_mode;
    }
});

select_menu.addEventListener('change', function() {
    if(select_menu.value === "1") {
        current_fan_mode = "1";
    }
    else if(select_menu.value === "2") {
        current_fan_mode = "2";
    }
    else {
        current_fan_mode = "3";
    }
}, false);