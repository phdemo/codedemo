<?php
    /*
     * Backend endpoint (POST) that takes a username and an email and saves it into a database.
     *
     * Expected input:
     *  username: string
     *  email:    string
     *
     * Returns:
     *  {success: 'user saved'}
     * or in case of error:
     *  {error: 'some error message'}
     */

    $postBody = json_decode(file_get_contents('php://input'), true);
    $username = $postBody['username'];
    $email = $postBody['email'];

    if ($username == null || strlen(trim($username)) == 0 || $email == null || strlen(trim($email)) == 0) {
        setHeadersError400();
        echo json_encode(array('error' => 'username or email is missing: '
                . 'username=' . $username .', email=' . $email, 'postbody' => $postBody));
        die();
    }

    // Sanitise user input before saving it into database
    mysqli_real_escape_string($username);
    mysqli_real_escape_string($email);

    // Setups database - sorry, it's hardcoded, no fancy configuration
    $servername = "localhost";
    $dbname = "pawherma_codedemo";
    $dbuser = "pawherma_codedemouser";
    $dbpassword = '4f8D7YqjWumG';

    $connection = new mysqli($servername, $dbuser, $dbpassword, $dbname);
    if ($connection->connect_error) {
        setHeadersError500();
        echo json_encode(array('error' => "Connection failed: " . $connection->connect_error));
        die();
    }

    // Checks that email isn't in the database already
    $result = $connection->query("SELECT id FROM signups WHERE email = '" . $email . "'");
    if ($result->num_rows > 0) {
        setHeadersError400();
        echo json_encode(array('error' => 'user was already in the database'));
        die();
    }

    // Saves the user into the database
    $sql = "INSERT INTO signups (username, email) VALUES ('" . $username . "', '" . $email . "')";
    if ($connection->query($sql) !== TRUE) {
        setHeadersError500();
        echo json_encode(array('error' => "Saving failed: " . $connection->error));
        die();
    }
    $connection->close();

    // Worked! - return in success
    setHeadersOk200();
    echo json_encode(array('success' => 'user saved'));


    /*
     * Returns an ok answer
     */
    function setHeadersOk200() {
        header("HTTP/1.0 200 OK");
        header('Access-Control-Allow-Origin: *');
        header('Content-type: application/json');
    }

    /*
     * Returns a user error answer
     */
    function setHeadersError400() {
        header("HTTP/1.0 400 BAD REQUEST");
        header('Access-Control-Allow-Origin: *');
        header('Content-type: application/json');
    }

    /*
     * Returns a server error answer
     */
    function setHeadersError500() {
        header("HTTP/1.0 500 Internal Server Error");
        header('Access-Control-Allow-Origin: *');
        header('Content-type: application/json');
    }

?>
