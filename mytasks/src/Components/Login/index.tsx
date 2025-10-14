import { FaCalendarCheck } from "react-icons/fa";
import { useState } from "react";
export function Account () {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState("");
    async function handleSubmit (e : React.FormEvent) {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("auth/login", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({email, password})
            });

            if(!response.ok) {
                const errorData = await response.json().catch(() => ({error: "erro inesperado"}));
                throw new Error(errorData.error || "erro ao logar");
            }
            const data = await response.json();
            localStorage.setItem('token', data.token);
        } catch (e : any) {
            setError(e.message);
        }
    }
    return (
        <>
            <h1>MyTasks</h1>
            <h2>Organize seu dia, conquiste seus objetivos.</h2>
            
            <form action="">
                <input type="text" value={email}/>
                <input type="password" />
                <FaCalendarCheck />
                <button type="submit">Entrar</button>
                <button>Criar Conta</button>
                <h3>Esqueci minha senha</h3>
            </form>
        </>
    )
}