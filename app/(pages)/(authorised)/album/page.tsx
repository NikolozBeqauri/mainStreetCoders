import { Header } from "@/app/components/Header/Header";
import { NewsComponent } from "@/app/components/NewsComponent/NewsComponent";
import styles from "./page.module.scss"
import { BurgerMenu } from "@/app/components/BurgerMenu/BurgerMenu";
import { ReusableTable } from "@/app/components/ReusableTable/ReusableTable";
const AlbumPage = () => {
    return (
        <div className={styles.album}>
            <div className={styles.album2}>
                <div className={styles.album1}>
                    <BurgerMenu />
                    <Header />
                </div>
                <div> 
                    <NewsComponent title={"Seek For Marktoop"} count={"Released 07/12/2023"} image={"artistDemoImage"}/>
                    <div className={styles.table}>
                    <ReusableTable />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AlbumPage;