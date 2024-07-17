import { HeartIcon } from "../HeartIcon/HeartIcon";
import { ThreeDots } from "../ThreeDots/ThreeDots";
import styles from "./MusicCard.module.scss"
import Image from 'next/image';

type Props = {
    src: string;
    title: string;
    author: string;
    timing: string;
}

export const MusicCard = (props: Props) => {


    return (
        <div className={styles.cardWrapper}>
            <div className={styles.cardinfo}>
                <Image
                    className={styles.cardImg}
                    src={`/images/musicCards/${props.src}`}
                    alt="musician image"
                    width={72}
                    height={72}
                />
                <div className={styles.cardTitles}>
                    <h3>{props.title}</h3>
                    <span>{props.author}</span>
                </div>
            </div>

            <div className={styles.cardAditionalInfo}>
                <span className={styles.timing}>{props.timing}</span>
                <div>
                    <HeartIcon/>
                    <ThreeDots/>
                </div>
            </div>
        </div>
    )
}