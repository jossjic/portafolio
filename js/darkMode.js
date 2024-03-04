var darkMode = false;
var imageElement = document.getElementById("dark-mode-image");

// Crea el elemento div para el efecto de transición
var effect = document.createElement("div");
effect.id = "transition-effect";
document.body.appendChild(effect);

document
  .getElementById("dark-mode-button")
  .addEventListener("click", function (event) {
    // Antes de la próxima transición
    effect.style.display = "block";
    effect.style.transform = "scale(0)";
    effect.style.opacity = "1";

    // Calcular la posición del click
    var x = event.clientX;
    var y = event.clientY;

    // Mover el efecto a la posición del click y centrarlo
    effect.style.left = x - effect.offsetWidth / 2 + "px";
    effect.style.top = y - effect.offsetHeight / 2 + "px";

    // Expandir y desvanecer el efecto
    effect.style.transform = "scale(100)";
    effect.style.opacity = "0";

    // Restablecer el efecto después de la transición
    setTimeout(function () {
      effect.style.display = "none";
    }, 500);

    if (darkMode) {
      // Si el modo oscuro está activado, cambia a los colores claros
      document.documentElement.style.setProperty("--main-color", "#001240");
      document.documentElement.style.setProperty(
        "--main-color-light",
        "#063fce"
      );
      document.documentElement.style.setProperty(
        "--background-color",
        "#deebfc"
      );
      document.documentElement.style.setProperty("--semi-white", "#fdfdfd");
      darkMode = false;
      imageElement.src = "./assets/images/sun.png";
    } else {
      // Si el modo oscuro no está activado, cambia a los colores oscuros
      document.documentElement.style.setProperty("--main-color", "#cacaca");
      document.documentElement.style.setProperty("--main-color-light", "#888");
      document.documentElement.style.setProperty("--background-color", "#222");
      document.documentElement.style.setProperty("--semi-white", "#444");
      darkMode = true;
      imageElement.src = "./assets/images/moon.png";
    }
  });
