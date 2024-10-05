import { useState } from "react";
import styles from "./Loading.module.scss";

type Props = {
    width: string;
    background?: string
  };

const Loading = (props: Props) => {

  const [toggleChange, setToggleChange] = useState(false);

  const onToggleChange = () => {
    setToggleChange(!toggleChange)
  }

  return (
    <>
    {
      !toggleChange && 
      <section className={styles.beforeSection} onClick={onToggleChange} style={{
        width: props.width,
        }}>
      <div className={styles.beforeLoader}>
          <span style={{ "--i": 1 } as React.CSSProperties}>L</span>
          <span style={{ "--i": 2 } as React.CSSProperties}>O</span>
          <span style={{ "--i": 3 } as React.CSSProperties}>A</span>
          <span style={{ "--i": 4 } as React.CSSProperties}>D</span>
          <span style={{ "--i": 5 } as React.CSSProperties}>I</span>
          <span style={{ "--i": 6 } as React.CSSProperties}>N</span>
          <span style={{ "--i": 7 } as React.CSSProperties}>G</span>
          <span style={{ "--i": 8 } as React.CSSProperties}>.</span>
          <span style={{ "--i": 9 } as React.CSSProperties}>.</span>
          <span style={{ "--i": 10 } as React.CSSProperties}>.</span>
      </div>
    </section>
    }

    {
      toggleChange && 
      <section className={styles.section} style={{
        width: props.width,
        background: props.background,
        }}>
        <div className={styles.loader}>
          <span style={{ "--i": 1 } as React.CSSProperties}></span>
          <span style={{ "--i": 2 } as React.CSSProperties}></span>
          <span style={{ "--i": 3 } as React.CSSProperties}></span>
          <span style={{ "--i": 4 } as React.CSSProperties}></span>
          <span style={{ "--i": 5 } as React.CSSProperties}></span>
          <span style={{ "--i": 6 } as React.CSSProperties}></span>
          <span style={{ "--i": 7 } as React.CSSProperties}></span>
          <span style={{ "--i": 8 } as React.CSSProperties}></span>
          <span style={{ "--i": 9 } as React.CSSProperties}></span>
          <span style={{ "--i": 10 } as React.CSSProperties}></span>
          <span style={{ "--i": 11 } as React.CSSProperties}></span>
          <span style={{ "--i": 12 } as React.CSSProperties}></span>
          <span style={{ "--i": 13 } as React.CSSProperties}></span>
          <span style={{ "--i": 14 } as React.CSSProperties}></span>
          <span style={{ "--i": 15 } as React.CSSProperties}></span>
          <span style={{ "--i": 16 } as React.CSSProperties}></span>
          <span style={{ "--i": 17 } as React.CSSProperties}></span>
          <span style={{ "--i": 18 } as React.CSSProperties}></span>
          <span style={{ "--i": 19 } as React.CSSProperties}></span>
          <span style={{ "--i": 20 } as React.CSSProperties}></span>
        </div>
      </section>
    }
    </>
  );
};

export default Loading;