// imports
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { LoginStateTypes } from "./Auth";
import { TextDecoratorPrimary, TextDecoratorSecondary } from "@components/Decorators/CustomText";
// context
import useAuth from "context/useAuth";
// styles
import style from "./Auth.module.scss";
import ErrorToast from "@components/ErrorToast";
// types
export type LoginFormProps = {
	handleSwitchState: (state: LoginStateTypes) => void;
};

const LoginForm = ({ handleSwitchState }: LoginFormProps) => {
	// states
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	// hooks
	const auth = useAuth();
	// onSubmit
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		auth?.getSession(username, password);
		setIsLoading(false);
	};

	// inputs handlers
	const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
		setUsername(() => e.target.value);
	};
	const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(() => e.target.value);
	};

	useEffect(() => {
		return () => {};
	}, []);

	return (
		<>
			<Form onSubmit={handleSubmit}>
				<div className={style.form}>
					<ErrorToast />
					<h3 className="mb-4">
						<TextDecoratorPrimary>Login</TextDecoratorPrimary>
					</h3>
					<Form.Group className="mb-3" controlId="username">
						<Form.Label className={style.label}>
							<TextDecoratorSecondary>Usuario:</TextDecoratorSecondary>
						</Form.Label>
						<Form.Control
							type="text"
							placeholder="pizza con piña"
							value={username}
							onChange={handleUsername}
							className={style.input}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="password">
						<Form.Label className={style.label}>
							<TextDecoratorSecondary>Contraseña:</TextDecoratorSecondary>
						</Form.Label>
						<Form.Control type="password" value={password} onChange={handlePassword} className={style.input} />
					</Form.Group>
				</div>
				<div className={`${style.buttonContainer}`}>
					<div className="mb-3">
						<Button variant="outline-dark" className={`${style.button} w-100`} type="submit" disabled={isLoading}>
							<TextDecoratorPrimary>Iniciar Sesión</TextDecoratorPrimary>
						</Button>
					</div>
					<div>
						<Button
							variant="outline-dark w-50"
							className={style.button}
							onClick={() => {
								handleSwitchState("Forgot-Password");
							}}
						>
							<TextDecoratorPrimary>Recuperar contraseña</TextDecoratorPrimary>
						</Button>
						<Button
							variant="outline-dark w-50"
							className={style.button}
							onClick={() => {
								handleSwitchState("Register");
							}}
						>
							<TextDecoratorPrimary>Registrarse</TextDecoratorPrimary>
						</Button>
					</div>
				</div>
			</Form>
		</>
	);
};

export default LoginForm;

// TODO: IMPLEMENT REACT-HOOK-FORM FOR FORM VALIDATIONS
