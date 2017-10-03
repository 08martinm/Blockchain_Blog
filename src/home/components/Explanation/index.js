import React from 'react';
import styles from './styles/explanation.scss';
import me from '../../../../static/HeadShot.jpg';
import { Link } from 'react-router-dom';

const Explanation = () => {
  return (
    <div id='Author' className={`row ${styles.container}`}>
      <div className={styles.container1} />      
      <div className={`${styles.text} col-lg-6 col-md-8 col-xs-10 col-xs-offset-1`}>
        <h1>Who is the author?</h1>
        <div className='row'>
          <div className='col-md-5 col-xs-10 col-xs-offset-1'>
            <h3>A Word About Community</h3>
            <p>
              I am eager to create lessons for all of you; however, I cannot stress enough the importance
              of making this a collective learning platform. The first step is <Link className={styles.link} to='/login'>siging up </Link>
              and leaving comments on <Link className={styles.link} to='/lesson_1'>the Bitcoin Whitepaper</Link>.
              <br /><br />
              I do not profess to be some blockchain savant; so, if you disagree with me or want to add to the
              conversation, then comment and contribute! I intend to make all of the lessons interactive so that your voice may be heard.
              <br /><br />
            </p>
          </div>
          <div className='col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0' >
            <img src={me} alt='My face' className={styles.img} />
          </div>
        </div>
        <h3>About me personally</h3>
        <p>
          I&#39;ve had a circuitous path to software development. At some point while attending a liberal arts college,
          I realized that I&#39;d need to find a job. With little in the way of hard skills, I called over 500 alumni
          from my alma mater seeking a summer internship, which resulted in working for The J.P. Morgan Private Bank as a
          Summer Analyst. There, I taught myself finance (generally by frantically reading Investopedia while hoping no one
          realized that I majored in Spanish Literature) and wound up with a full-time position with The J.P. Morgan Private Bank&#39;s
          Hedge Fund Principals Group in New York. Upon arriving, I began automating small
          tasks using Excel VBA. After two years, I joined the Stanford Consulting Group
          in Silicon Valley assessing damages in class-action, securities-fraud cases.
          Here, I completed the CFA exams and earned the charter while continuing to teach myself
          programming. I implemented an automated multivariate regression analysis, which significantly reduced the time
          required to complete our analyses and subsequently built a user interface using React, Express, Node, and MongoDB.
          Outside of work, I worked with a team building an open-source Ethereum-based CraigsList, which served as my first 
          exposure to blockchain technology. Since then, I have continued to learn about and program on the blockchain.
          In my spare time, I toil endlessly to create content for ultra-picky and ungrateful users of free, online content.
          <br /><br />
        </p>
        <div className='alert alert-info'>
          <b>Shameless plug</b>: I am currently seeking new career opportunities! If you are an employer (especially in the blockchain space),
          I would love to speak with you. Find out more about me and my work experience 
          <b><a className={''} href='http://www.matthewlmartin.com'> here</a></b>.
        </div>
      </div>
    </div>
  );
};

export default Explanation;
