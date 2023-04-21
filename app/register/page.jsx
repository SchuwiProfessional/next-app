import styles from "../register/register.module.css"
export default function RegisterPage() {
  return (
    <div className={styles.registerFormContainer}>
      <div className={styles.formContainer}>
        <h2 className={styles.formTitle}>Formulario de Registro</h2>
        <form>
          <div className={styles.formField}>
            <label htmlFor="nombre">Nombres:</label>
            <input type="text" id="nombre" name="nombre" required />
          </div>
          <div className={styles.formField}>
            <label htmlFor="apellidos">Apellidos:</label>
            <input type="text" id="apellidos" name="apellidos" required />
          </div>
          <div className={styles.formField}>
            <label htmlFor="email">Correo electrónico:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className={styles.formField}>
            <label htmlFor="contraseña">Contraseña:</label>
            <input
              type="password"
              id="contraseña"
              name="contraseña"
              minLength={6}
              required
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="confirmar-contraseña">Confirmar contraseña:</label>
            <input
              type="password"
              id="confirmar-contraseña"
              name="confirmar-contraseña"
              minLength={6}
              required
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="rol">Rol:</label>
            <select id="rol" name="rol" required>
              <option value="">Seleccionar rol</option>
              <option value="admin">Administrador</option>
              <option value="worker">Trabajador</option>
            </select>
          </div>
          <div className={styles.formActions}>
            <button type="submit">Registrar</button>
            <p>
              ¿Ya tienes una cuenta? <a href="/login">Iniciar sesión</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
