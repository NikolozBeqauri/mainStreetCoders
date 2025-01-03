'use client'
import React from 'react';
import Image from "next/image";
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './UploadFile.module.scss';
import axios from 'axios';
import { ReusableIcon } from '../../ReusableIcon/ReusableIcon';
import ReusableButton from '../../ReusableButton/ReusableButton';
import popUpNav from '@/app/enums/popUpNav';
import Cookies from 'js-cookie';
import { useRecoilState } from 'recoil';
import { threeDotClickedState } from '@/app/states';

type FormValues = {
    name: string;
    file: FileList;
};

type Props = {
    setActiveComponent: Function;
    refetchPlaylists?: () => void;
    withOutArrow?: boolean;
}

export const UploadFile = (props: Props) => {
    const [, setThreeDotClicked] = useRecoilState(threeDotClickedState);


    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = (values) => {
        const data = new FormData();
        data.append("name", values.name);
        data.append("file", values.file[0]);
        const token = Cookies.get("token");

        axios.post('https://project-spotify-83tj.onrender.com/playlist', data, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(res => {
                console.log(res);
                if (props.refetchPlaylists) {
                    props.refetchPlaylists();
                }
                props.setActiveComponent(null);
                setThreeDotClicked(false);
            })
            .catch(err => {
                console.log(err);
                props.setActiveComponent(null);
            })
    };

    return (
        <div className={styles.formWrapper}>
            <div className={styles.titleWrapper}>
                <div onClick={() => props.setActiveComponent(popUpNav.addChackBox)}>
                    <ReusableIcon imgName={"rightArrow"} />
                </div>
                <h2>Create New Playlist</h2>
            </div>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Playlist Name"
                    {...register("name", { required: "Playlist name is required" })}
                />
                {errors.name && <span className={styles.error}>{errors.name.message}</span>}

                <div className={styles.dragAndDrop}>
                    <label htmlFor="forFile">
                        <Image
                            src={`/icons/dragAndDrop.svg`}
                            alt="icon"
                            width={88}
                            height={79}
                        />
                    </label>
                    <input
                        id='forFile'
                        type="file"
                        accept=".png,.jpg,.jpeg,.webp"
                        {...register("file", {
                            required: "Please upload a file",
                            validate: {
                                isValidType: (fileList: FileList) => {
                                    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
                                    return allowedTypes.includes(fileList[0]?.type) || "Only .png, .jpg, .jpeg, and .webp files are allowed";
                                },
                            },
                        })}
                    />

                </div>

                {errors.file && <span className={styles.error}>{errors.file.message}</span>}

                <ReusableButton title={"Save"} />
            </form>
        </div>
    );
};

export default UploadFile;
