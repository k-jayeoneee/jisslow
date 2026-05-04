import styles from "./login.module.css"
export default function Login() {
    return(
    <div className={styles.container}>
        <div className= {styles.logoContainer}>
            <div className={styles.logo}>
                <div className={styles.logo2}>
                    <span>slow<br/>down</span>
                </div>
            </div>
        </div>
        <h1 className={styles.title}>
        J is slow
        </h1>
        <button className={styles.KaKaoBtn}>
            카카오톡 로그인 연동 중
        </button>
        <button className={styles.LoginBtn}>
            Did you forget the KaKao-id
        </button>
        <div className= {styles.footer}>
            아이디 | 비밀번호 | 회원가입
        </div>
    </div>
    )
}