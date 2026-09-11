// src/pages/carreras.js
// Gestión de carreras realizadas por los choferes

export function paginaCarreras() {
    return `
        <div class="page-container">
            <h2>Carreras</h2>
            <p>Registro y control de las carreras realizadas por los choferes.</p>

            <div class="carreras-actions">
                <button id="btn-recargar-carreras" class="btn-primary">Recargar lista</button>
                <button id="btn-agregar-carrera" class="btn-secondary">Agregar carrera</button>
            </div>

            <table class="tabla-carreras">
                <thead>
                    <tr>
                        <th>Chofer</th>
                        <th>Origen</th>
                        <th>Destino</th>
                        <th>Distancia (km)</th>
                        <th>Precio</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="lista-carreras">
                    <tr>
                        <td colspan="7" style="text-align:center; padding:20px;">
                            Cargando carreras...
                        </td>
                    </tr>
                </tbody>
            </table>

            <script>
                // Datos simulados temporalmente
                const carreras = [
                    {
                        chofer: "Juan Pérez",
                        origen: "Vedado",
                        destino: "Playa",
                        distancia: 12,
                        precio: 350,
                        fecha: "2026-09-10"
                    },
                    {
                        chofer: "Mario López",
                        origen: "Centro Habana",
                        destino: "Habana Vieja",
                        distancia: 4,
                        precio: 120,
                        fecha: "2026-09-11"
                    }
                ];

                function cargarCarreras() {
                    const tabla = document.getElementById('lista-carreras');

                    if (!tabla) return;

                    if (carreras.length === 0) {
                        tabla.innerHTML = "<tr><td colspan='7'>No hay carreras registradas.</td></tr>";
                        return;
                    }

                    tabla.innerHTML = carreras.map(c => `
                        <tr>
                            <td>${c.chofer}</td>
                            <td>${c.origen}</td>
                            <td>${c.destino}</td>
                            <td>${c.distancia} km</td>
                            <td>$${c.precio}</td>
                            <td>${c.fecha}</td>
                            <td>
                                <button class="btn-small">Ver</button>
                                <button class="btn-small">Editar</button>
                            </td>
                        </tr>
                    `).join('');
                }

                document.getElementById('btn-recargar-carreras').addEventListener('click', () => {
                    cargarCarreras();
                });

                document.getElementById('btn-agregar-carrera').addEventListener('click', () => {
                    alert('Aquí luego abriremos el formulario para agregar carreras.');
                });

                // Cargar al entrar
                cargarCarreras();
            </script>
        </div>
    `;
}
