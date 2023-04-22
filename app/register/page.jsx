"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../register/register.module.css"

export default function RegisterPage() {
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [rol, setRol] = useState("");
    const { push } = useRouter();

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nombre, apellidos, email, password, confirmPassword, rol }),
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data); 
            push("/login"); 
        }
    };

    return (
        <>
            <div className={styles.registerFormContainer}>
                <div className={styles.formContainer}>
                    <h2 className={styles.formTitle}>Formulario de Registro</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formField}>
                            <label htmlFor="nombre">Nombres:</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                required
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>
                        <div className={styles.formField}>
                            <label htmlFor="apellidos">Apellidos:</label>
                            <input
                                type="text"
                                id="apellidos"
                                name="apellidos"
                                required
                                value={apellidos}
                                onChange={(e) => setApellidos(e.target.value)}
                            />
                        </div>
                        <div className={styles.formField}>
                            <label htmlFor="email">Correo electrónico:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className={styles.formField}>
                            <label htmlFor="contraseña">Contraseña:</label>
                            <input
                                type="password"
                                id="contraseña"
                                name="contraseña"
                                minLength={6}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className={styles.formField}>
                            <label htmlFor="rol">Rol:</label>
                            <select
                                id="rol"
                                name="rol"
                                required
                                value={rol}
                                onChange={(e) => setRol(e.target.value)}
                            >
                                <option value="">Seleccionar rol</option>
                                <option value="admin">Administrador</option>
                                <option value="user">Usuario</option>
                            </select>
                        </div>
                        <div className={styles.formField}>
                            <button type="submit">Registrarse</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}