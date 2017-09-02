import React from 'react';
import styles from './styles/explanation.scss';
import me from '../../../../static/HeadShot.jpg';

const Explanation = () => {
  return (
    <div id='Author' className={`row ${styles.container}`}>
      <div className={styles.container1} />      
      <div className={`${styles.text} col-lg-6 col-md-8 col-xs-10 col-xs-offset-1`}>
        <h1>Who am I?</h1>
        <div className='row'>
          <div className='col-md-5 col-xs-10 col-xs-offset-1'>
            <h3>One last caveat</h3>
            <p>
              Before reading the thoughts and opinions of some stranger
              on the internet, I get that you probably want to know a little about
              who I am. Before launching into my bio, let me again say that I do not
              profess to be an expert in the blockchain field. This site is intended
              to form a community dedicated to learning about this topic.
              <br /><br />
            </p>
          </div>
          <div className='col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0' >
            <img src={me} alt='My face' className={styles.img} />
          </div>
        </div>
        <h3>About me personally</h3>
        <p>
          I&#39;ve had a circuitous path to software development. I graduated
          from a liberal arts school with a major in Spanish Literature and minor
          in Economics. I called over 500 alumni from my alma mater searching for a summer
          internship, which resulted in joining The J.P. Morgan Private Bank as a Summer Analyst.
          I taught myself finance (and maybe more importantly the intricacies of
          Excel) and wound up in New York working for The J.P. Morgan Private Bank&#39;s
          Hedge Fund Principals Group full-time. Upon arriving, I began automating small
          tasks using Excel VBA. After two years, I joined the Stanford Consulting Group
          in Silicon Valley assessing damages in class-action, securities-fraud cases.
          Here, I completed the CFA exams and earned the charter while continuing to teach myself
          programming. On an work-sponsored sabbatical, I attended a three-month software development
          boot-camp to further improve my coding skills, which happened to be in high-demand
          at my company. During this bootcamp, I was first exposed to blockchain via working
          on an open-source Ethereum-based CraigsList. I have now returned to my company and
          completed automating our multivariate regression analyses and am searching for new career opportunities.
          <br /><br />
          If you are an employer (especially in the blockchain space), I would love to speak with you.
          Find out more about me and my work experience 
          <a className={styles.link} href='http://www.matthewlmartin.com'> here</a>.
          <br /><br />
        </p>
      </div>
    </div>
  );
};

export default Explanation;
