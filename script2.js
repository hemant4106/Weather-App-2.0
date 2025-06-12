function startTypewriterEffect() {
    const text = "Hello.... Here you can see weather for your place.";
    const targetDiv = document.querySelector(".Section2RightContentText");
    let index = 0;

    function type() {
        if (!targetDiv) return;
        if (index < text.length) {
            targetDiv.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, 80);
        } else {
            setTimeout(() => {
                targetDiv.innerHTML = "";
                index = 0;
                type();
            }, 2000); // delay before restarting
        }
    }

    targetDiv.innerHTML = "";
    type();
}

window.onload = () => {
    // other setup code...
    startTypewriterEffect();
};
