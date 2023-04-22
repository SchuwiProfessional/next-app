"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../register/register.module.css"

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [rol, setRol] = useState("");
    const { push } = useRouter();

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3002/user ", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, lastname, email, password, confirmPassword, rol }),
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
                            <label htmlFor="name">Nombres:</label>
                            <input
                                type="name"
                                id="name"
                                name="name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className={styles.formField}>
                            <label htmlFor="lastname">Apellidos:</label>
                            <input
                                type="lastname"
                                id="lastname"
                                name="lastname"
                                required
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
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
                                id="password"
                                name="password"
                                minLength={6}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className={styles.formField}>
                            <label htmlFor="confirmPassword">Confirmar contraseña:</label>
                            <input
                                type="confirmPassword"
                                id="confirmPassword"
                                name="confirmPassword"
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