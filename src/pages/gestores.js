// src/pages/gestores.js
// Gestión de gestores en AsuGusto

export function paginaGestores() {
    return `
        <div class="page-container">
            <h2>Gestores</h2>
            <p>Administración de gestores del sistema.</p>

            <div class="gestores-actions">
                <button id="btn-recargar-gestores" class="btn-primary">Recargar lista</button>
                <button id="btn-agregar-gestor" class="btn-secondary">Agregar gestor</button>
            </div>

            <table class="tabla-gestores">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="lista-gestores">
                    <tr>
                        <td colspan="4" style="text-align:center; padding:20px;">
                            Cargando gestores...
                        </td>
                    </tr>
                </tbody>
            </table>

            <script>
                // Datos simulados temporalmente
                const gestores = [
                    { nombre: "Ana Rodríguez", telefono: "53123456", activo: true },
                    { nombre: "Pedro Martínez", telefono: "53987654", activo: false }
                ];

                function cargarGestores() {
                    const tabla = document.getElementById('lista-gestores');

                    if (!tabla) return;

                    if (gestores.length === 0) {
                        tabla.innerHTML = "<tr><td colspan='4'>No hay gestores registrados.</td></tr>";
                        return;
                    }

                    tabla.innerHTML = gestores.map(g => `
                        <tr>
                            <td>${g.nombre}</td>
                            <td>${g.telefono}</td>
                            <td>${g.activo ? "Activo" : "Inactivo"}</td>
                            <td>
                                <button class="btn-small">Ver</button>
                                <button class="btn-small">Editar</button>
                            </td>
                        </tr>
                    `).join('');
                }

                document.getElementById('btn-recargar-gestores').addEventListener('click', () => {
                    cargarGestores();
                });

                document.getElementById('btn-agregar-gestor').addEventListener('click', () => {
                    alert('Aquí luego abriremos el formulario para agregar gestores.');
                });

                // Cargar al entrar
                cargarGestores();
            </script>
        </div>
    `;
}
