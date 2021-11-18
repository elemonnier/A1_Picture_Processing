function showEffect(image, effect, argument){

    let distanceBetweenImages = 50; // in px
    let canvas = document.getElementById("images");

    // resizing canvas
    canvas.height = image.height;
    canvas.width = 2*image.width + distanceBetweenImages;

    // drawing original image
    let context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);

    // reading original image pixels
    let imageData = context.getImageData(0, 0, image.width, image.height);

    // cloning pixels
    let newImageData = context.createImageData(imageData);

    // computing new pixels
    effect(imageData.width, imageData.height, imageData.data, newImageData.data, argument);

    // showing result
    context.putImageData(newImageData, image.width + distanceBetweenImages, 0);

}

function applyEffect(fileName, effect, argument){

    let image = new Image();
    image.onload = showEffect.bind(this, image, effect, argument);
    image.src = fileName;
}


