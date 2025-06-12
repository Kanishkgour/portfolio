var typed = new Typed('#element', {
  strings: ['Web Developer', 'Frontend Developer', 'Backend Explorer', 'Node.js Developer', 'UI/UX Enthusiast', 'Designer'],
  typeSpeed: 100,
});
var typed = new Typed('#owner', {
  strings: ['kanishk'],
  typeSpeed: 100,
});


// Example starter JavaScript for disabling form submissions if there are invalid fields
// (() => {
  // 'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  // const forms = document.querySelectorAll('.needs-validation')

//   // Loop over them and prevent submission
//   Array.from(forms).forEach(form => {
//     form.addEventListener('submit', event => {
//       if (!form.checkValidity()) {
//         event.preventDefault()
//         event.stopPropagation()
//       }

//       form.classList.add('was-validated')
//     }, false)
//   })
// })()


document.addEventListener("DOMContentLoaded", function () {
    var forms = document.querySelectorAll(".needs-validation");

    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener("submit", function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add("was-validated");
        }, false);
    });
});
