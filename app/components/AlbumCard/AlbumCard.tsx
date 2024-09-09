import Image from 'next/image';
import styles from './AlbumCard.module.scss'
import { HeartIcon } from '../HeartIcon/HeartIcon';
import { ReusableIcon } from '../ReusableIcon/ReusableIcon';

type Props = {
    title?: string;
    author: string;
    img: string;
    onClick?: () => void;
}

export const AlbumCard = (props: Props) => {
    const stylesClass = [styles.cardIconsBackground]
    if(!props.title) stylesClass.push(styles.cardIconsCircleBackground)
    
    const cardImageStyle = [styles.defaultCardStyles]
    if(!props.title) cardImageStyle.push(styles.cardImage)
        
    return (
        <div className={styles.cardWrapper}>
            <div className={styles.cardImageWrapper}>
                <img className={cardImageStyle.join(" ").trim()}
                    src={`/images/${props.img}.png`}
                    alt="musician image"
                    tabIndex={0}
                />
                <div>
                    <div className={styles.cardIconsWrapper}>
                        <HeartIcon background />
                        <ReusableIcon imgName={'threeDots'} background/>
                    </div>
                    <div className={stylesClass.join(" ").trim()} onClick={props.onClick}>

                    </div>
                </div>
            </div>

            <div className={styles.cardTitles}>
                {props.title ? <span>{props.author}</span> : <h3>{props.author}</h3>}
                {props.title ? <h3>{props.title}</h3> : null}
            </div>
        </div>
    )
}