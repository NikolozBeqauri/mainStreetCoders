"use client";

import React, { useEffect, useState } from "react";
import { Table } from "antd";
import styles from "./ReusubleTable.module.scss";
import { HeartIcon } from "../HeartIcon/HeartIcon";
import { ReusableIcon } from "../ReusableIcon/ReusableIcon";
import axios from "axios";
import Loading from "../Loading/Loading";
import Cookies from "js-cookie";
import { useRecoilState } from "recoil";
import { globalClickerState, albumOnState, isPlayingState, musicOnState, playlistOnState, randomWordsState } from "@/app/states";
import Image from "next/image";

type Props = {
  heartActive?: boolean;
  pageName?: string;
  isTopHitPage?: boolean;
  albumMusics?:boolean;
  include?: string;
  rightArrow?: boolean;
};

export const ReusableTable = (props: Props) => {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("token");
  const [globalClicker, setGlobalClickerState] = useRecoilState(globalClickerState);
  const [albumOn, setAlbumOnState] = useRecoilState(albumOnState);
  const [isPlaying, setIsPlayingState] = useRecoilState(isPlayingState);
  const [musicOn, setMusicOnState] = useRecoilState(musicOnState);
  const [playlistOn, setPlaylistOnState] = useRecoilState(playlistOnState);
  const [randomWords, setRandomWordsState] = useRecoilState(randomWordsState);
  const [albumFullName, setAlbumFullName] = useState<string >('')

  useEffect(() => {
    
    const fetchRecords = async () => {
      try {
        const response = await axios.get(`https://project-spotify-1.onrender.com/${props.pageName}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if(props.albumMusics){
          setRecords(response.data.musics);          
          setAlbumFullName(response.data.title);
        }else{
          console.log(response.data,'s');
          
          setRecords(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };    
    
    setRandomWordsState(`${props.pageName}`)
    fetchRecords();
  }, [token, props.pageName, props.albumMusics]);

  if (loading) {
    return <Loading width="" />;
  }

  const handleRowClick = async (record: { id: number }) => {
    setGlobalClickerState(record.id);
    setAlbumOnState(props.pageName === "album");
    setIsPlayingState(true)
    setMusicOnState((props.pageName === "music/topHits") || (props.pageName === "music/topweek") || props.include === "author/find-all-music-of-author/")
    setPlaylistOnState(false)
  };

  const columns = [
    {
      title: "#",
      key: "index",
      render: (_: any, __: any, index: number) => (
        <div className={styles.key}>{index + 1}</div>
      ),
    },
    {
      title: "Album Cover",
      key: "albumCover",
      render: (record: any) => (
        <img
          src={record.coverImage || record.album?.coverImage || record?.trackImage || "/default-album-cover.png"}
          alt=""
          width={48}
          height={48}
        />
      ),
    },
    {
      title: "Song Name",
      key: "songName",
      render: (record: any) => {
        const firstMusic = record.musics && record.musics.length > 0 ? record.musics[0] : null;
        const trackTitle = firstMusic ? firstMusic.trackTitle : record.trackTitle || record.title || 'Unknown Track';

        return (
          <div className={styles.infoWrapper}>
            <div className={styles.wrapper}>
              <div className={styles.titleWrapper}>
                <div id={`authorTitle-${record.id}`} className={styles.authorTitle}>
                  {trackTitle}
                </div>
              </div>
              <div className={styles.author}>
                {firstMusic ? firstMusic.fullName : record.author?.fullName || record.authorFullName || ``}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: "Album",
      key: "album",
      render: (record: any) => (
        <div className={styles.albumName}>
          {record.title || record.album?.title || albumFullName || "Unknown Album"}
        </div>
      ),
    },
    {
      title: "Duration",
      key: "duration",
      render: (record: any) => (
        <div className={styles.time}>
          {record.duration || (record?.musics?.[0]?.duration ?? 'Unknown Duration')}
        </div>
      ),
    },
    {
      key: "actions",
      render: () => (
        <div className={styles.icon}>
          <HeartIcon active={props.heartActive} />
          <ReusableIcon imgName={"threeDots"} />
        </div>
      ),
    },
  ];

  return (
    <div className={styles.wrapper}>
      {props.rightArrow && <div>
        <Image
              style={{ cursor: 'pointer' }}
              src={`/icons/rightArrow.svg`}
              alt="icon"
              width={42}
              height={42}
          />
      </div>}
      <Table
        columns={columns}
        dataSource={records}
        rowKey="id"
        onRow={(record) => ({
          onMouseEnter: () => {
            const titleElement = document.getElementById(`authorTitle-${record.id}`);
            if (titleElement) {
              titleElement.classList.add(styles.scrolling);
            }
          },
          onMouseLeave: () => {
            const titleElement = document.getElementById(`authorTitle-${record.id}`);
            if (titleElement) {
              titleElement.classList.remove(styles.scrolling);
            }
          },
          onClick: () => handleRowClick(record),
        })}
      />
    </div>
  );
};
