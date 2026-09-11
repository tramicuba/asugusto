// src/pages/choferes.js
// Página de gestión de choferes

export function paginaChoferes() {
    return `
        <div class="page-container">
            <h2>Gestión de Choferes</h2>
            <p>Listado de choferes registrados en el sistema.</p>

            <div class="choferes-actions">
                <button id="btn-recargar-choferes">Recargar lista</button>
                <button id="btn-agregar-chofer">Agregar chofer</button>
            </div>

            <table class="tabla-choferes">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Vehículo</th>
                        <th>Placa</th>
                        <th>Saldo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="lista-choferes">
                    <tr>
                        <td colspan="6" style="text-align:center; padding:20px;">
                            Cargando choferes...
                        </td>
                    </tr>
                </tbody>
            </table>

            <script>
                // Recargar lista de choferes
                document.getElementById('btn-recargar-choferes').addEventListener('click', () => {
                    cargarChoferes();
                });

                // Agregar chofer (luego conectamos con Supabase)
                document.getElementById('btn-agregar-chofer').addEventListener('click', () => {
                    alert('Función de agregar chofer pendiente de integrar.');
                });

                // Simulación temporal de datos
                function cargarChoferes() {
                    const tabla = document.getElementById('lista-choferes');

                    tabla.innerHTML = `
                        <tr>
                            <td>Juan Pérez</td>
                            <td>53555555</td>
                            <td>Hyundai Accent</td>
                            <td>P12345</td>
                            <td>$120</td>
                            <td><button>Ver</button></td>
                        </tr>
                        <tr>
                            <td>Mario López</td>
                            <td>53444444</td>
                            <td>Kia Rio</td>
                            <td>P54321</td>
                            <td>$80</td>
                            <td><button>Ver</button></td>
                        </tr>
                    `;
                }

                // Cargar al entrar
                cargarChoferes();
            </script>
        </div>
    `;
}
