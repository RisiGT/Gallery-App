const $ = selector => document.querySelector(selector);

const directoryInput = $('#directoryInput');
const directoryPath = $('#directoryPath');

// Mostrar la primera pestaña por defecto al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.tablinks').click();

    const directoryInput = document.getElementById('directoryInput');
    const directoryPath = document.getElementById('directoryPath');

    directoryInput.addEventListener('click', async () => {
        const folder = await window.electron.selectDirectory();
        if (folder) {
            directoryPath.textContent = folder;
        } else {
            directoryPath.textContent = 'No directory selected';
        }
    });
});

directoryInput.addEventListener('change', () => {
    dialog.showOpenDialog({
        properties: ['openDirectory'],
    }).then(result => {
        const folder = result.filePaths[0];
        output.textContent = folder;
    });

    if (directoryInput.files.length > 0) {
        const folderPath = directoryInput.files[0].webkitRelativePath;
        directoryPath.textContent = folderPath.split('/')[0];
    } else {
        directoryPath.textContent = 'No directory selected';
    }
});


function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Ocultar todos los contenidos de las pestañas
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remover la clase "active" de todos los enlaces de pestañas
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Mostrar el contenido de la pestaña actual y agregar la clase "active" al enlace de la pestaña clicada
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}