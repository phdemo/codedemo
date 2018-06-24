<?php
    /*
     * Backend endpoint that returns either a list of available files or image-content
     * coded as base64 strings.
     *
     * .../codedemo/backend/images
     *   returns a json array of filenames.
     *
     * .../codedemo/backend/images?image=<filename>
     *   returns a json object with an imagedata property if the file is found,
     *   otherwise returns an empty json object.
     */
    header("HTTP/1.0 200 OK");
    header('Access-Control-Allow-Origin: *');
    header('Content-type: application/json');

    $filename = $_GET['image'];
    if (!isset($filename) || trim($filename) === '') {
        // No image asked for: return json list of images
        echo json_encode(getFilenames());

    } else {
        // Return the asked-for image as base64 string packed into json
        $object = array('imagedata' => getFile($filename), 'name' => $filename);
        echo json_encode($object);
    }



    /*
     * Finds and returns all filenames in the images folder.
     */
    function getFilenames() {
        $names = [];
        foreach(glob('images/*.*') as $file) {
            array_push($names, basename($file));
        }
        return $names;
    }

    /*
     * Finds and returns the given file as a base64 coded string.
     * If the file is not found an empty string is returned.
     */
    function getFile($filename) {

        $path = 'images/' . $filename;
        $base64 = '';
        if (file_exists($path)) {
            $type = pathinfo($path, PATHINFO_EXTENSION);
            $data = file_get_contents($path);
            $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
        }

        return $base64;
    }

?>
