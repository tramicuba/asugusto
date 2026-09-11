// src/pages/administradores.js
// Gestión de administradores del sistema AsuGusto

export function paginaAdministradores() {
    return `
        <div class="page-container">
            <h2>Administradores</h2>
            <p>Control y administración de los usuarios con permisos máximos.</p>

            <div class="admin-actions">
                <button id="btn-recargar-admins" class="btn-primary">Recargar lista</button>
                <button id="btn-agregar-admin" class="btn-secondary">Agregar administrador</button>
            </div>

            <table class="tabla-admins">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="lista-admins">
                    <tr>
                        <td colspan="4" style="text-align:center; padding:20px;">
                            Cargando administradores...
                        </td>
                    </tr>
                </tbody>
            </table>

            <script>
                // Datos simulados temporalmente
                const admins = [
                    { nombre: "Administrador General", telefono: "53000000", activo: true },
                    { nombre: "Supervisor Central", telefono: "53999999", activo: true }
                ];

                function cargarAdmins() {
                    const tabla = document.getElementById('lista-admins');

                    if (!tabla) return;

                    if (admins.length === 0) {
                        tabla.innerHTML = "<tr><td colspan='4'>No hay administradores registrados.</td></tr>";
                        return;
                    }

                    tabla.innerHTML = admins.map(a => `
                        <tr>
                            <td>${a.nombre}</td>
                            <td>${a.telefono}</td>
                            <td>${a.activo ? "Activo" : "Inactivo"}</td>
                            <td>
                                <button class="btn-small">Ver</button>
                                <button class="btn-small">Editar</button>
                            </td>
                        </tr>
                    `).join('');
                }

                document.getElementById('btn-recargar-admins').addEventListener('click', () => {
                    cargarAdmins();
                });

                document.getElementById('btn-agregar-admin').addEventListener('click', () => {
                    alert('Aquí luego abriremos el formulario para agregar administradores.');
                });

                // Cargar al entrar
                cargarAdmins();
            </script>
        </div>
    `;
}
