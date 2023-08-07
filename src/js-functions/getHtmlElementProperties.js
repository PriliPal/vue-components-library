function getHeight(id) {
    return window.getComputedStyle(document.getElementById(id), null).height;
}

function getWidth(id) {
    return window.getComputedStyle(document.getElementById(id), null).width;
}

function getMargin(id) {
    return {
        top: window.getComputedStyle(document.getElementById(id), null).marginTop,
        bottom: window.getComputedStyle(document.getElementById(id), null).marginBottom,
        left: window.getComputedStyle(document.getElementById(id), null).marginLeft,
        right: window.getComputedStyle(document.getElementById(id), null).marginRight,
    }
}

function getPadding(id) {
    return {
        top: window.getComputedStyle(document.getElementById(id), null).paddingTop,
        bottom: window.getComputedStyle(document.getElementById(id), null).paddingBottom,
        left: window.getComputedStyle(document.getElementById(id), null).paddingLeft,
        right: window.getComputedStyle(document.getElementById(id), null).paddingRight,
    }
}

export default {getHeight, getWidth, getMargin, getPadding}

