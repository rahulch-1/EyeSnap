const accordions = document.querySelectorAll('.accordian');

accordions.forEach(accordion => {
    const question = accordion.querySelector('.question');
    const icon = question.querySelector('.icon'); // Update to use the class in your HTML
    const answer = accordion.querySelector('.answer');

    question.addEventListener('click', () => {
        if (icon.classList.contains('active')) {
            icon.classList.remove('active');
            answer.style.maxHeight = null;
        } else {
            icon.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});

// let profilePic = document.getElementById("profile-pic");
// // let inputFile = document.getElementById("imageUpload");
// let inputFile = document.getElementById("upload-file");


// inputFile.onchange = function () {
//     profilePic.src = URL.createObjectURL(inputFile.files[0]);
// }
$(document).ready(function () {
    $('.loader').hide();
    $('#result').hide();

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#selectedImage').attr('src', e.target.result);
                $('#selectedImage').show(); // Show the image preview
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    

    $("#imageUpload").change(function () {
        readURL(this);
    });

    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);
        $(this).hide();
        $('.loader').show();
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').html('Result: ' + data.result);
                console.log('Success!');
            },
        });
    });
});



function login() {
    var username = $("#username").val();
    var password = $("#password").val();

    $.post("login.php", { username: username, password: password }, function (data) {
        if (data === "success") {
            alert("Login successful");
            window.location.href = "index.html"; // Redirect to index.html
        } else {
            alert("Login failed: " + data);
        }
    });
}