import React from 'react';
import styles from './styles/Post1.scss';
import WhitePaper from './components/WhitePaper';


const Post1 = () => {
  return (
    <div className={`row ${styles.page}`}>
      <div className='col-xs-12 col-md-6'>
        <WhitePaper />
      </div>
      <div className={`'col-xs-12 col-md-6 ${styles.comments}`}>
        <div />
      </div>
    </div>
  );
};

export default Post1;
