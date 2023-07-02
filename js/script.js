window.addEventListener('DOMContentLoaded', () => {
    const headerlist = document.querySelector('.header__list'),
    menuLink = document.querySelectorAll('.header__link'),
    hamburger = document.querySelector('.header__hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('header__hamburger_active');
        headerlist.classList.toggle('header__list_active');
    });

    menuLink.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            headerlist.classList.toggle('menu_active');
        })
    })
})
 /// тут нужно полность слик переписывать это не то
$(document).ready(function(){
	$('.guests__slider').slick({
		infinite: false,
		slidesToShow: 2.18,
		slidesToScroll: 2,
		speed: 2000, 
		arrows: true,
		prevArrow: '<button type="button" class="guests__slider-prev"></button>',
		nextArrow: '<button type="button" class="guests__slider-next"></button>',
 		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
				breakpoint: 768,
				settings: {
					arrows: false,
					slidesToShow: 2,
					slidesToScroll: 1,
				},
				breakpoint: 576,
				settings: {
					arrows: false,
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			} 
		]
	});
});

	//Modal window
	$('[data-modal=book-now]').on('click', function() { //кнопка book now вызов окно - с именем и телефоном
		$('.overlay, #book-now').fadeIn('slow');
	});
	$('[data-modal=contact]').on('click', function() {
		$('.overlay, #contact').fadeIn('slow');
	});
	$('.footer-form').on('click', function() {
		$('#answer').fadeIn('slow');
	});

	$('.modal__close').on('click', function() { // команда кот будет закр модальные окна через крестик
		$('.overlay, #book-now, #contact, #answer').fadeOut('fast');
	});

	function validateForms(form){
		$(form).validate( {
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				phone: "required",
				email: {
					required: true,
					email: true
				},
				textarea: {
					required: true
				}
			},
			messages: {
				name: {
					required: "Please, word your name", // текст если что-то не так введено
				},
				phone: "Please, word your phone number",
				email: {
					required: "Please, word your email",
					email: "Wrong email"
				},
				textarea: {
					required: "Describe your question",
				}
			}
		});
	};

	validateForms('#book-now form');
	validateForms('#contact form');
	validateForms('#footer-form form');

	$('input[name=phone]').mask("+7 (999) 999-99-99");

	new WOW().init();

	$('form').submit(function(e){
		e.preventDefault();

		if (!$(this).valid()) {
			return;
		}

		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input, textarea").val("");
			$('#book-now, #contact').fadeOut();
			$('.overlay, #answer').fadeIn('slow');

			$('form').trigger('reset');
		});
		return false;
	});
 