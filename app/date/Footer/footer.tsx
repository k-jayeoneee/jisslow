import styles from "./footer.module.css"
export default function Footer() {
   return( 
   <div className={styles.container}>
        <div className= {styles.icon}>sharing</div>
        <div className= {styles.icon}>message</div>
        <div className= {styles.icon}>calendar</div>
        <div className= {styles.icon}>setting</div>
    </div>
    )
}