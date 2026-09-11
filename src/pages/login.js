// src/pages/login.js
// Página de inicio de sesión para AsuGusto

export function paginaLogin() {
    return `
        <div class="login-container">
            <h1>AsuGusto</h1>
            <h3>Acceso al sistema</h3>

            <form id="form-login" class="login-form">
                <label>Teléfono</label>
                <input type="text" id="login-telefono" placeholder="Ej: 53555555" required>

                <label>Contraseña</label>
                <input type="password" id="login-password" placeholder="••••••••" required>

                <button type="submit">Entrar</button>
            </form>

            <p class="login-info">
                Plataforma de gestión para administradores, gestores y choferes.
            </p>
        </div>

        <script>
            document.getElementById('form-login').addEventListener('submit', (e) => {
                e.preventDefault();

                const telefono = document.getElementById('login-telefono').value.trim();
                const password = document.getElementById('login-password').value.trim();

                if (!telefono || !password) {
                    alert('Debe completar todos los campos');
                    return;
                }

                // Aquí luego conectamos con Supabase
                console.log('Intentando iniciar sesión con:', telefono);

                // Redirigir temporalmente al dashboard
                window.location.hash = '#dashboard';
            });
        </script>
    `;
}
