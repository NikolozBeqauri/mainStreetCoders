'use client'
import { useForm } from "react-hook-form";
import styles from "./SignIn.module.scss"
import { signInState, signUpState } from "@/app/states";
import { useRecoilState } from "recoil";
type FormValues = {
    email: string;
    password: string;
    chackbox: boolean;
};

export const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        console.log(data);
    };

    const [signUp, setsignUp] = useRecoilState(signUpState);
    const [signIn, setsignIn] = useRecoilState(signInState);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.fromWrapper}>
            <input
                placeholder="Email"
                type="email"
                {...register("email", { required: "Email is required" })}
            />
            {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}

            <input
                placeholder="Password"
                type="password"
                {...register("password", {
                    required: "Password is required",
                    minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                    },
                    validate: {
                        hasUpperCase: value => /[A-Z]/.test(value) || "Password must contain at least one uppercase letter",
                        hasNumber: value => /\d/.test(value) || "Password must contain at least one number"
                    }
                })}
            />
            {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}

            <div className={styles.memoryWrapper}>
                <div className={styles.checkbox}>
                    <input type="checkbox" id="remember" {...register("chackbox")} />
                    <label htmlFor="remember">Remember me</label>
                </div>
                <span className={styles.forgotPassword}>Forgot your password?</span>
            </div>

            <input type="submit" value="Sign Up" />

            <p className={styles.haveAccount} >Already have  an account? <span onClick={() => {setsignUp(true); setsignIn(false)}}>Sign Up</span></p>
        </form>
    );
};