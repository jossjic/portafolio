const browserDetect = () => {
  let agent = navigator.userAgent.toLowerCase();
  let browser = "";
  if (agent.indexOf("edge") > -1) {
    browser = "edge";
  } else if (agent.indexOf("chrome") > -1 && !!window.chrome) {
    browser = "chrome";
  } else if (agent.indexOf("safari") > -1) {
    browser = "safari";
  } else if (agent.indexOf("firefox") > -1) {
    browser = "firefox";
  } else if (agent.indexOf("opera") > -1 && !!window.opera) {
    browser = "opera";
  } else if (agent.indexOf("msie") > -1) {
    browser = "ie";
  } else {
    browser = "unknown";
  }
  document.body.classList.add(browser);
  document.querySelector(".waves").classList.add(browser);
};

const pSection = document.getElementById("Proyectos");

const crearProyecto = (proyecto) => {
  let tecnologiasHTML = "";
  proyecto.tecnologias.forEach((tecnologia) => {
    tecnologiasHTML += `<img src="assets/images/${tecnologia.toLowerCase()}.png" alt="${tecnologia}">`;
  });

  const template = `
  <a href="${proyecto.link}" target="_blank" style="display: block; color: inherit; text-decoration: none;">
    <div class="proyect-up">
        <div class="proyect-up__info">
            <h3>${proyecto.titulo}</h3>
            <p>${proyecto.descripcion}</p>
        </div>
        <div class="proyect-up__image">
            <img src="${proyecto.ruta_imagen}" alt="${proyecto.titulo}">
        </div>
    </div>
    <div class="proyect-down">
        <div class="proyect-down__icons">
            ${tecnologiasHTML}
        </div>
        <div class="proyect-down__date">
            <p>${proyecto.fecha}</p>
        </div>
    </div>
  </a>
  `;

  const divElement = document.createElement("div");
  divElement.classList.add("proyect");
  divElement.innerHTML = template;
  return divElement;
};

const readJson = async () => {
  const data = await fetch("js/proyects.json")
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log("Error:", error));

  const isPortfolio = window.location.pathname.includes("portfolio.html");

  data.proyectos.forEach(function (proyecto) {
    // Si estamos en 'portfolio.html', usamos los datos en inglés
    if (isPortfolio) {
      proyecto.titulo = proyecto.title;
      proyecto.fecha = proyecto.date;
      console.log(proyecto.fecha); // Añade esta línea
      proyecto.descripcion = proyecto.description;
      proyecto.tecnologias = proyecto.technologies;
      proyecto.ruta_imagen = proyecto.image_path;
    }

    const proyectoElement = crearProyecto(proyecto);
    console.log(proyectoElement); // Añade esta línea
    pSection.appendChild(proyectoElement);
  });
  applyRotation();
};

document.addEventListener("DOMContentLoaded", function () {
  readJson();
  browserDetect();
});

const applyRotation = () => {
  const cards = document.querySelectorAll(".proyect");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      e.preventDefault();
      const rect = card.getBoundingClientRect();
      const x = (rect.width / 2 - (e.clientX - rect.left)) / 10;
      const y = -(rect.height / 2 - (e.clientY - rect.top)) / 5;

      card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;

      const brightness = 1 - (2 * y) / rect.height;
      card.style.filter = `brightness(${brightness})`;
    });

    card.addEventListener("mouseleave", (e) => {
      e.preventDefault();
      card.style.transform = `rotateY(0deg) rotateX(0deg)`;
      card.style.filter = "brightness(1)";
    });
  });
};
