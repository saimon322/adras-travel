import {WOW} from 'wowjs';
import '@fancyapps/fancybox/dist/jquery.fancybox.min';
import './svg-sprite';

$(document).ready(function () {
    'use strict';

    // init fancybox
    $('[data-fancybox]').fancybox({
        backFocus: false,
    });

    // init wow
    let wow = new WOW ();
    wow.init();

}); // end ready
