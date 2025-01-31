
document.addEventListener('DOMContentLoaded', function () {
    const specialists = [
        {
            id: 1,
            name: 'Катин Петр',
            experience: '5 лет',
            specialization: "Ремонт компьютеров"
        },
        {
            id: 2,
            name: 'Голубев Петр',
            specialization: "Ремонт ноутбуков",
            experience: '3 года',
        },
        {
            id: 3,
            name: 'Васильев Алексей',
            specialization: "Бытремонт",
            experience: '10 лет',
        },
        {
            id: 4,
            name: 'Вешневский Сергей',
            specialization: "Ремонт телефонов",
            experience: '7 лет',
        },
        {
             id: 5,
            name: 'Рудковский Владислав',
             specialization: "Ремонт планшетов",
            experience: '2 года',
        },
           {
            id: 6,
            name: 'Лежнев Константин',
            specialization: "Ремонт аудио",
            experience: '12 лет',
        }
    ];

    const specialistContainer = document.getElementById('specialist-container');
    const selectedSpecialistInput = document.getElementById('selected-specialist');
    specialists.forEach((specialist, index) => {
        const card = document.createElement('div');
        card.classList.add('card', 'm-2', 'specialist-card');
        

        card.innerHTML = `
                         <div class="card-body">
                            <h5 class="card-title">${specialist.name}</h5>
                            <p class="card-text">Профиль: ${specialist.specialization}</p>
                            <p class="experience">Стаж: ${specialist.experience}</p> 
                        </div>`;
        card.addEventListener('click', () => {
            document.querySelectorAll('.specialist-card.active').forEach(activeCard => {
                activeCard.classList.remove('active');
            });
            card.classList.add('active');
            selectedSpecialistInput.value = specialist.id;
        });

        specialistContainer.appendChild(card);
    });
});
    
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const february = new Date(today.getFullYear(), 1, 28);
    let availableDates = [];
    let currentDate = new Date(today);

    function isWeekday(date) {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    }

    while (currentDate <= february) {
        let datesThisWeek = 0;
        let weekStartDate = new Date(currentDate);
         while (currentDate <= february && datesThisWeek < 3) {
            if (isWeekday(currentDate)) {
                availableDates.push(new Date(currentDate));
                 datesThisWeek++;
             }
               currentDate.setDate(currentDate.getDate() + 1);
        }

         while(currentDate <= february && currentDate.getDay() !==1){
                currentDate.setDate(currentDate.getDate() + 1);
        }
     }

    const bookedSlots = [
       { date: '2024-01-15', time: '10:00' },
        { date: '2024-01-20', time: '14:00' }
    ];

        const availableTimes = [
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00"
    ];

        flatpickr("#datetimepicker", {
           enableTime: true,
            dateFormat: "Y-m-d H:i",
            minDate: today,
            maxDate: february,
             minTime: "09:00",
            maxTime: "15:00",
             minuteIncrement: 60,
            locale: 'ru',
          disable: [
            function(date) {
               return !availableDates.find(d => d.toDateString() === date.toDateString())
           },
           function(date){
              const dateString = date.toISOString().slice(0, 10);
              return availableTimes.every(time => {
                    const slot = bookedSlots.find(slot => slot.date === dateString && slot.time === time);
                    return  slot === undefined;
               }) === false;
           },
         ],
            onOpen: function(selectedDates, dateStr, instance) {
            instance.config.enableTime = true;
            const date = selectedDates[0];
               if(date){
                   const dateString = date.toISOString().slice(0, 10);
                 const disabledTime = availableTimes.filter(time =>{
                     const slot = bookedSlots.find(slot => slot.date === dateString && slot.time === time);
                      return slot !== undefined;
                 })
                  instance.set("disableTime", disabledTime)
                }
                const closeIcon = document.createElement('span');
                 closeIcon.classList.add('flatpickr-close-icon');
                closeIcon.innerHTML = '&times;';

                 const calendar = instance.calendarContainer;
                 calendar.appendChild(closeIcon);

                closeIcon.addEventListener('click', function(e) {
                    e.stopPropagation();
                    instance.close();
                });
            },
            onValueUpdate: function(selectedDates, dateStr, instance) {
                if (selectedDates[0]) {
                    const dateString = selectedDates[0].toISOString().slice(0, 10);
                    const disabledTime = availableTimes.filter(time => {
                        const slot = bookedSlots.find(slot => slot.date === dateString && slot.time === time);
                         return slot !== undefined;
                    });
                   instance.set("disableTime", disabledTime);
                 }
            }
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        const phoneInput = document.getElementById('phone');
        const phoneError = document.getElementById('phone-error');
    
        phoneInput.addEventListener('input', formatPhoneNumber);
    
        function formatPhoneNumber() {
            let value = phoneInput.value.replace(/\D/g, '');
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            let formattedNumber = '';
            if (value.startsWith('7')) {
                value = value.slice(1);
                formattedNumber = '+7 ';
            }
            if (value.length > 0) {
                formattedNumber += `(${value.slice(0, 3)})`;
            }
            if (value.length > 3) {
                formattedNumber += ` ${value.slice(3, 6)}`;
            }
            if (value.length > 6) {
                formattedNumber += `-${value.slice(6, 8)}`;
            }
            if (value.length > 8) {
                formattedNumber += `-${value.slice(8, 10)}`;
            }
    
            phoneInput.value = formattedNumber;
            validatePhone();
        }
    
         function validatePhone() {
             const phone = phoneInput.value.trim();
            const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
            if (phone !== "") {
                if (phoneRegex.test(phone)) {
                  phoneError.textContent = '';
                } else {
                   phoneError.textContent = 'Неверный формат номера телефона. Пример: +7 (XXX) XXX-XX-XX';
                }
            } else {
               phoneError.textContent = '';
            }
        }
    });

document.addEventListener('DOMContentLoaded', function() {

    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');

    emailInput.addEventListener('blur', validateEmail); 

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

        if (emailRegex.test(email)) {
            emailError.textContent = ''; 
        } else if (email !== "") {
            emailError.textContent = 'Неверный формат электронной почты'; 
        } else {
            emailError.textContent = ''; 
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {

    const submitButton = document.getElementById('submit-button');
    const successMessage = document.getElementById('success-message');
    const formFields = [
        document.getElementById('name'),
        document.getElementById('phone'),
        document.getElementById('email'),
        document.getElementById('datetimepicker')

    ];
    const formErrorMessage = document.getElementById('form-error-message');
    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
  const confirmSubmitBtn = document.getElementById('confirm-submit');


  submitButton.addEventListener('click', function(event) {
        event.preventDefault(); // Предотвращаем отправку формы по умолчанию
        const areAllFieldsFilled = formFields.every(field => field.value.trim() !== '');
        const phoneError = document.getElementById('phone-error');
       const emailError = document.getElementById('email-error');
        const isPhoneValid = phoneError.textContent === '';
        const isEmailValid = emailError.textContent === '';

      if (areAllFieldsFilled && isPhoneValid && isEmailValid) {
            formErrorMessage.style.display = 'none';
           confirmationModal.show();
      } else {
          formErrorMessage.style.display = 'block';
     }
   });
   confirmSubmitBtn.addEventListener('click', function() {
         successMessage.style.display = 'block';
         document.getElementById('personal-form').reset();
        confirmationModal.hide();
    });
});



document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav').classList.toggle('show');
  });




