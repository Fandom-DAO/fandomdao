import React from 'react';
import styles from './Loader.module.css';
import { FaRocket, FaCloud} from 'react-icons/fa';
import { IoIosCloudOutline} from 'react-icons/io';
import { IoRocketOutline} from 'react-icons/io5';
import { BiRocket} from 'react-icons/bi';
import {ReactComponent as Rocket} from '../assets/rocket2.svg'


function Loader() {
  return (
    <div className={styles.container}>
      <div class={styles.loader}>
        <div class={styles.rocket}>
          <Rocket className={styles.farocket} styles={{backgroundColor:'red'}}/>
          <IoIosCloudOutline class={styles.facloud1}/>
          <IoIosCloudOutline class={styles.facloud2}/>
          <IoIosCloudOutline class={styles.facloud3}/>
          <IoIosCloudOutline class={styles.facloud4}/>
        </div>
        <span>
          <i></i>
        </span>
      </div>
    </div>
  )
}

export default Loader