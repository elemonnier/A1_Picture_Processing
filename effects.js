/*Made by LEMONNIER Etienne and MERLE Hugo*/

function clone(width, height, oldPixels, newPixels){
    for(let i = 0; i < 4 * width * height; i++){
        newPixels[i] = oldPixels[i];
    }
}


function negative(width, height, oldPixels, newPixels){ // Reversal of the RGB pixels but opacity is conserved
    for(let i = 0; i < 4 * width * height; i+=4) {
        newPixels[i] = 255 - oldPixels[i];
        newPixels[i + 1] = 255 - oldPixels[i + 1];
        newPixels[i + 2] = 255 - oldPixels[i + 2];
        newPixels[i + 3] = oldPixels[i + 3];
    }
}


function mirror(width, height, oldPixels, newPixels){
    // Reversal of the entire array
    for(let line = 0; line < height; line++) {
        for (let i = 0; i < 4 * width; i++) {
            newPixels[i + line * 4 * width] = oldPixels[4 * line * width - i - 1];
        }
    }
    // Then we reverse 4 by 4 because the array is of the form ABGR instead of RGBA, so we need to invert R and A, just as B and G
    for(let j = 0; j < 4 * height * width; j+=4){
        let tmp = newPixels[j+3];
        newPixels[j+3] = newPixels[j];
        newPixels[j] = tmp;
        tmp = newPixels[j+2];
        newPixels[j+2] = newPixels[j+1];
        newPixels[j+1] = tmp;
    }
}


function grayscale(width, height, oldPixels, newPixels){ // Calculation of the average of the pixels. The opacity is conserved
    for(let i = 0; i < 4 * width * height; i+=4){
        newPixels[i] = (oldPixels[i] + oldPixels[i+1] + oldPixels[i+2])/3;
        newPixels[i+1] = (oldPixels[i] + oldPixels[i+1] + oldPixels[i+2])/3;
        newPixels[i+2] = (oldPixels[i] + oldPixels[i+1] + oldPixels[i+2])/3;
        newPixels[i+3] = oldPixels[i+3];
    }
}


function constrast(width, height, oldPixels, newPixels, c){
    for(let i = 0; i < 4 * width * height; i++){
        let f = (259 * (c + 255))/(255 * (259 - c));
        newPixels[i] = (oldPixels[i] - 128) * f + 128;
    }
}


//Definition of 2 utilitarian functions for the function edgeDetection, to avoid doing repetition of code: difference and factor
function difference(width, height, oldPixels, i) {
    return Math.abs(((oldPixels[i - 4] + oldPixels[i - 3] + oldPixels[i - 2])/3) - (oldPixels[i + 4] + oldPixels[i + 5] + oldPixels[i + 6])/3) + Math.abs(((oldPixels[i - 4*width] + oldPixels[i - 4*width+1] + oldPixels[i - 4*width + 2])/3) - ((oldPixels[i + 4*width] + oldPixels[i + 4*width+1] + oldPixels[i + 4*width + 2])/3));
}

function factor(i, d, threshold, newPixels) {
    if(d > threshold){
        newPixels[i] = 0;
        newPixels[i+1] = 0;
        newPixels[i+2] = 0;
        newPixels[i+3] = 255;
    }
    else{
        newPixels[i] = 255;
        newPixels[i+1] = 255;
        newPixels[i+2] = 255;
        newPixels[i+3] = 255;
    }
}

function edgeDetection(width, height, oldPixels, newPixels, threshold) {
    for(let i = 0; i < 4 * width * height; i+=4){
        //--------Special cases------------
        if(i <= (4 * width) || i >= (4*(height-1)*width+1) || i%(4*width) === 0 || i%(4*width) === 4*width-4){
            let d = 0; //The difference of luminosity is equal to 0 if the pixel belongs to the edge or the corner
            factor(i, d, threshold, newPixels);
        }
        //---------General case------------
        else{
            let d = difference(width, height, oldPixels, i);
            factor(i, d, threshold, newPixels);
        }
    }
}

/*Made by LEMONNIER Etienne and MERLE Hugo*/