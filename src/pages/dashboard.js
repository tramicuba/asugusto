// src/pages/dashboard.js
// Dashboard principal de AsuGusto

export function paginaDashboard() {
    return `
        <div class="dashboard-container">

            <header class="dashboard-header">
                <h2>Panel de Control</h2>
                <p>Bienvenido al sistema AsuGusto</p>
            </header>

            <nav class="dashboard-menu">
                <ul>
                    <li><a href="#choferes">Choferes</a></li>
                    <li><a href="#gestores">Gestores</a></li>
                    <li><a href="#administradores">Administradores</a></li>
                    <li><a href="#carreras">Carreras</a></li>
                    <li><a href="#reportes">Reportes</a></li>
                    <li><a href="#login">Cerrar sesión</a></li>
                </ul>
            </nav>

            <section class="dashboard-content">
                <h3>Resumen general</h3>
                <p>Seleccione una opción del menú para comenzar.</p>
            </section>

        </div>
    `;
}
