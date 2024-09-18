'use client'
import { useRouter } from "next/navigation";
import { AddLine } from "./AddLIne/AddLine"
import styles from "./AddPlaylist.module.scss";
import { useState } from "react";
import popUpNav from "@/app/enums/popUpNav";
import UploadFile from "./UploadFile/UploadFile";
import { AddPlaylistChackBox } from "./AddPlaylistChackBox/AddPlaylistChackBox";



export const AddPlaylist = () => {
    const router = useRouter()
    const [activeComponent, setActiveComponent] = useState<null | string>(popUpNav.addPlaylist)
   

    return (
        <div>
            {activeComponent === popUpNav.addPlaylist  && <div className={`${styles.container} ${styles.background}`} >
                <AddLine onClick={() => setActiveComponent(popUpNav.addChackBox)} title="Add to playlists" image={"addPlaylistIcon"} />
                <AddLine onClick={() => { router.push('/album') }} title="View Album" image={"viewAlbumIcon"} />
                <AddLine onClick={() => { router.push('/artist') }} title="viewArtist" image={"viewArtistIcon"} />
            </div> }

            {activeComponent === popUpNav.addChackBox && <div>
                <AddPlaylistChackBox onClickBtn={() => setActiveComponent(popUpNav.uploadFile)}/>
            </div>}
            
            {activeComponent === popUpNav.uploadFile && <div >
                <UploadFile setActiveComponent={setActiveComponent} />
            </div>}
            
        </div>
    )
}