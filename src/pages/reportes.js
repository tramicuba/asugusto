// src/pages/reportes.js
// Página de reportes del sistema AsuGusto

export function paginaReportes() {
    return `
        <div class="page-container">
            <h2>Reportes</h2>
            <p>Generación y consulta de reportes del sistema.</p>

            <div class="reportes-actions">
                <button id="btn-reporte-creditos" class="btn-primary">Reporte de Créditos</button>
                <button id="btn-reporte-carreras" class="btn-secondary">Reporte de Carreras</button>
                <button id="btn-reporte-usuarios" class="btn-secondary">Reporte de Usuarios</button>
            </div>

            <div id="contenedor-reporte" class="reporte-container">
                <p>Seleccione un tipo de reporte para comenzar.</p>
            </div>

            <script>
                const contenedor = document.getElementById('contenedor-reporte');

                document.getElementById('btn-reporte-creditos').addEventListener('click', () => {
                    mostrarReporte('Créditos', [
                        { chofer: "Juan Pérez", saldo: 120 },
                        { chofer: "Mario López", saldo: 80 }
                    ]);
                });

                document.getElementById('btn-reporte-carreras').addEventListener('click', () => {
                    mostrarReporte('Carreras', [
                        { chofer: "Juan Pérez", viajes: 12 },
                        { chofer: "Mario López", viajes: 8 }
                    ]);
                });

                document.getElementById('btn-reporte-usuarios').addEventListener('click', () => {
                    mostrarReporte('Usuarios', [
                        { tipo: "Choferes", cantidad: 25 },
                        { tipo: "Gestores", cantidad: 4 },
                        { tipo: "Administradores", cantidad: 2 }
                    ]);
                });

                function mostrarReporte(titulo, datos) {
                    contenedor.innerHTML = `
                        <h3>Reporte: ${titulo}</h3>
                        <ul>
                            ${datos.map(d => `<li>${Object.values(d).join(" - ")}</li>`).join("")}
                        </ul>
                    `;
                }
            </script>
        </div>
    `;
}
