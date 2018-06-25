/*
 * Input form with user information.
 * Submits to backend that saves the user information in a databse.
 *
 */

export class SimpleFormCustomElement {

    attached() {

        // Send the form data to the backend when button is clicked
        $("#signup-form").submit(function (event) {
            /* Prevent form submitting. */
            event.preventDefault();

            let action = $(this).attr('action');

            let params = {
                "username": $('#name').val(),
                "email": $('#email').val()
            };

            /* Send to backend using jQuery. */
            $.ajax({
                type: "POST",
                url: action,
                data: JSON.stringify(params),
                success: function (data) {
                    // TODO: Positive feedback to user should be given
                },
                error: function (jqXHR) {
                    // TODO: Error feedback to user should be given
                    // var data = jqXHR.responseJSON;
                    // if (data.hasOwnProperty('error')) {
                    //     alert(data.error);
                    // }
                },
                dataType: 'json'
            });
        });
    }
}
