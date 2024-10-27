import React from 'react';
import Image from 'next/image';
import style from './TrackDisplay.module.scss';
import { useRecoilState } from 'recoil';
import { playerDisplayState } from '@/app/states';

interface TrackDisplayProps {
    currentTrack: {
        title: string;
        artist: string;
        albumArt: string;
    };
    onAlbumArtClick: () => void; // Added the onAlbumArtClick prop
}

const TrackDisplay: React.FC<TrackDisplayProps> = ({ currentTrack, onAlbumArtClick }) => {
    const [playerDisplay, setPlayerDisplay] = useRecoilState<any>(playerDisplayState)

    if (!currentTrack) {
        // Return a default placeholder or nothing if no currentTrack is provided
        return (
            <div className={style.container}>
                <p>No track selected</p>
            </div>
        );
    }

    return (
        <div className={style.container} onClick={onAlbumArtClick} >
            <div className={style.albumArt} > {/* Clickable area */}
                <img
                    src={playerDisplay?.album?.coverImage || '/defaultAlbumArt.jpg'} // Fallback if albumArt is missing
                    alt="AlbumArt"
                    width={80}
                    height={80}
                    className={style.img}
                />
            </div>
            <div className={style.like}>
                <div className={style.text}>
                    <div className={style.likebtn}>
                        {/* <HeartShapeBtn
                            isActive={true}
                            isDisabled={false}
                            onClick={() => { }}
                        /> */}
                    </div>
                    <div className={style.wrapper}>
                        <span className={style.titleWrapper}>{playerDisplay.trackTitle || 'Unknown Title'}</span> {/* Fallback for title */}
                        <span className={style.artist}>{playerDisplay.author?.fullName || 'Unknown Artist'}</span> {/* Fallback for artist */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrackDisplay;