import React from 'react';
import classnames from 'classnames';
import styles from '../styles/Post1.scss';
import PropTypes from 'prop-types';
import img_1 from '../../../../../../static/bitcoin_whitepaper/transactions.svg';
import img_2 from '../../../../../../static/bitcoin_whitepaper/timestamp-server.svg';
import img_3 from '../../../../../../static/bitcoin_whitepaper/proof-of-work.svg';
import img_4 from '../../../../../../static/bitcoin_whitepaper/reclaiming-disk-space.svg';
import img_5 from '../../../../../../static/bitcoin_whitepaper/simplified-payment-verification.svg';
import img_6 from '../../../../../../static/bitcoin_whitepaper/combining-splitting-value.svg';
import img_7 from '../../../../../../static/bitcoin_whitepaper/privacy.svg';

const ClickItem = props => {
  let selected = props.selected === props.item ? styles.selected : '';
  let border = props.selected === props.item ? styles.selectedborder : '';

  return (
    <div className={`row ${styles.flexify}`}>
      <div className={`col-xs-1 ${styles.flexcols} ${styles.selector}`}>
        <div onClick={props.onclick} id={props.item} 
          className={classnames(styles.circle, selected)}
        />
      </div>
      <div className={classnames('col-xs-11', border)}>
        {props.children}
      </div>
    </div>
  );
};

ClickItem.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  item: PropTypes.string,
  onclick: PropTypes.func,
  selected: PropTypes.string,
};

const WhitePaper = props => (
  <div className='col-xs-12'>
    <div className='page-header'>
      <ClickItem onclick={props.onclick} selected={props.selected} item='id_1'>
        <h1 className='text-center'>
          Bitcoin: <br /> A Peer-to-Peer Electronic Cash System <br /><small>Satoshi Nakamoto</small>
        </h1>
        <h4 className='text-center'>October 31, 2008</h4>
      </ClickItem>
    </div>
    
    <div className='row'>
      <h2 className='col-xs-11 col-xs-offset-1'>Abstract</h2>
    </div>
    <ClickItem onclick={props.onclick} selected={props.selected} item='id_2'>
      <p>
        A purely peer-to-peer version of electronic cash would allow online payments to be sent directly from one party to another without going through a financial institution. Digital signatures provide part of the solution, but the main benefits are lost if a trusted third party is still required to prevent double-spending. We propose a solution to the double-spending problem using a peer-to-peer network. The network timestamps transactions by hashing them into an ongoing chain of hash-based proof-of-work, forming a record that cannot be changed without redoing the proof-of-work. The longest chain not only serves as proof of the sequence of events witnessed, but proof that it came from the largest pool of CPU power. As long as a majority of CPU power is controlled by nodes that are not cooperating to attack the network, they&#39;ll generate the longest chain and outpace attackers. The network itself requires minimal structure. Messages are broadcast on a best effort basis, and nodes can leave and rejoin the network at will, accepting the longest proof-of-work chain as proof of what happened while they were gone.
      </p>
    </ClickItem>
    
    <div className='row'>
      <h2 className='col-xs-11 col-xs-offset-1'>1. Introduction</h2>
    </div>
    <ClickItem onclick={props.onclick} selected={props.selected} item='id_3'>
      <p>
        Commerce on the Internet has come to rely almost exclusively on financial institutions serving as trusted third parties to process electronic payments. While the system works well enough for most transactions, it still suffers from the inherent weaknesses of the trust based model. Completely non-reversible transactions are not really possible, since financial institutions cannot avoid mediating disputes. The cost of mediation increases transaction costs, limiting the minimum practical transaction size and cutting off the possibility for small casual transactions, and there is a broader cost in the loss of ability to make non-reversible payments for non-reversible services. With the possibility of reversal, the need for trust spreads. Merchants must be wary of their customers, hassling them for more information than they would otherwise need. A certain percentage of fraud is accepted as unavoidable. These costs and payment uncertainties can be avoided in person by using physical currency, but no mechanism exists to make payments over a communications channel without a trusted party.
      </p>
    </ClickItem>
    <ClickItem onclick={props.onclick} selected={props.selected} item='id_4'>
      <p>
        What is needed is an electronic payment system based on cryptographic proof instead of trust, allowing any two willing parties to transact directly with each other without the need for a trusted third party. Transactions that are computationally impractical to reverse would protect sellers from fraud, and routine escrow mechanisms could easily be implemented to protect buyers. In this paper, we propose a solution to the double-spending problem using a peer-to-peer distributed timestamp server to generate computational proof of the chronological order of transactions. The system is secure as long as honest nodes collectively control more CPU power than any cooperating group of attacker nodes.
      </p>
    </ClickItem>

    <div className='row'>
      <h2 className='col-xs-11 col-xs-offset-1'>2. Transactions</h2>
    </div>
    <ClickItem onclick={props.onclick} selected={props.selected} item='id_5'>
      <p>
        We define an electronic coin as a chain of digital signatures. Each owner transfers the coin to the next by digitally signing a hash of the previous transaction and the public key of the next owner and adding these to the end of the coin. A payee can verify the signatures to verify the chain of ownership.
      </p>
    </ClickItem>
    <ClickItem onclick={props.onclick} selected={props.selected} item='id_6'>
      <p>
        <img className='img-responsive center-block' src={img_1} />
      </p>
    </ClickItem>
    <ClickItem onclick={props.onclick} selected={props.selected} item='id_7'>
      <p>
        The problem of course is the payee can&#39;t verify that one of the owners did not double-spend the coin. A common solution is to introduce a trusted central authority, or mint, that checks every transaction for double spending. After each transaction, the coin must be returned to the mint to issue a new coin, and only coins issued directly from the mint are trusted not to be double-spent. The problem with this solution is that the fate of the entire money system depends on the company running the mint, with every transaction having to go through them, just like a bank.
      </p>
    </ClickItem>
    <ClickItem onclick={props.onclick} selected={props.selected} item='id_8'>
      <p>
        We need a way for the payee to know that the previous owners did not sign any earlier transactions. For our purposes, the earliest transaction is the one that counts, so we don&#39;t care about later attempts to double-spend. The only way to confirm the absence of a transaction is to be aware of all transactions. In the mint based model, the mint was aware of all transactions and decided which arrived first. To accomplish this without a trusted party, transactions must be publicly announced<sup><a href='#fn1' id='ref1'>[1]</a></sup>, and we need a system for participants to agree on a single history of the order in which they were received. The payee needs proof that at the time of each transaction, the majority of nodes agreed it was the first received.
      </p>
    </ClickItem>

    <div className='row'>
      <h2 className='col-xs-11 col-xs-offset-1'>3. Timestamp Server</h2>
    </div>
    <ClickItem onclick={props.onclick} selected={props.selected} item='id_9'>
      <p>
        The solution we propose begins with a timestamp server. A timestamp server works by taking a hash of a block of items to be timestamped and widely publishing the hash, such as in a newspaper or Usenet post<sup><a href='#fn2' id='ref2'>[2-5]</a></sup>. The timestamp proves that the data must have existed at the time, obviously, in order to get into the hash. Each timestamp includes the previous timestamp in its hash, forming a chain, with each additional timestamp reinforcing the ones before it.
      </p>
    </ClickItem>
    <ClickItem onclick={props.onclick} selected={props.selected} item='id_10'>
      <p>
        <img className='img-responsive center-block' src={img_2} />
      </p>
    </ClickItem>

    <div className='row'>
      <h2 className='col-xs-11 col-xs-offset-1'>4. Proof-of-Work</h2>
    </div>
    <ClickItem onclick={props.onclick} selected={props.selected} item='id_11'>
      <p>
        To implement a distributed timestamp server on a peer-to-peer basis, we will need to use a proof-of-work system similar to Adam Back&#39;s Hashcash<sup><a href='#fn6' id='ref6'>[6]</a></sup>, rather than newspaper or Usenet posts. The proof-of-work involves scanning for a value that when hashed, such as with SHA-256, the hash begins with a number of zero bits. The average work required is exponential in the number of zero bits required and can be verified by executing a single hash.
      </p>
    </ClickItem>
    <ClickItem onclick={props.onclick} selected={props.selected} item='id_12'>
      <p>
        For our timestamp network, we implement the proof-of-work by incrementing a nonce in the block until a value is found that gives the block&#39;s hash the required zero bits. Once the CPU effort has been expended to make it satisfy the proof-of-work, the block cannot be changed without redoing the work. As later blocks are chained after it, the work to change the block would include redoing all the blocks after it.
      </p>
    </ClickItem>
    <ClickItem onclick={props.onclick} selected={props.selected} item='id_13'>
      <p>
        <img className='img-responsive center-block' src={img_3} />
      </p>
    </ClickItem>
    <ClickItem onclick={props.onclick} selected={props.selected} item='id_14'>
      <p>
        The proof-of-work also solves the problem of determining representation in majority decision making. If the majority were based on one-IP-address-one-vote, it could be subverted by anyone able to allocate many IPs. Proof-of-work is essentially one-CPU-one-vote. The majority decision is represented by the longest chain, which has the greatest proof-of-work effort invested in it. If a majority of CPU power is controlled by honest nodes, the honest chain will grow the fastest and outpace any competing chains. To modify a past block, an attacker would have to redo the proof-of-work of the block and all blocks after it and then catch up with and surpass the work of the honest nodes. We will show later that the probability of a slower attacker catching up diminishes exponentially as subsequent blocks are added.
      </p>
    </ClickItem>
    <ClickItem onclick={props.onclick} selected={props.selected} item='id_15'>
      <p>
        To compensate for increasing hardware speed and varying interest in running nodes over time, the proof-of-work difficulty is determined by a moving average targeting an average number of blocks per hour. If they&#39;re generated too fast, the difficulty increases.
      </p>
    </ClickItem>

    <div className='row'>
      <h2 className='col-xs-11 col-xs-offset-1'>5. Network</h2>
    </div>
    <ClickItem onclick={props.onclick} selected={props.selected} item='id_16'>
      <p>The steps to run the network are as follows:</p>
      <ol>
        <li>New transactions are broadcast to all nodes.</li>
        <li>Each node collects new transactions into a block.</li>
        <li>Each node works on finding a difficult proof-of-work for its block.</li>
        <li>When a node finds a proof-of-work, it broadcasts the block to all nodes.</li>
        <li>Nodes accept the block only if all transactions in it are valid and not already spent.</li>
        <li>
          Nodes express their acceptance of the block by working on creating the next block in the chain, using the hash of the accepted block as the previous hash.
        </li>
      </ol>
    </ClickItem>
    <ClickItem onclick={props.onclick} selected={props.selected} item='id_17'>
      <p>
        Nodes always consider the longest chain to be the correct one and will keep working on extending it. If two nodes broadcast different versions of the next block simultaneously, some nodes may receive one or the other first. In that case, they work on the first one they received, but save the other branch in case it becomes longer. The tie will be broken when the next proof-of-work is found and one branch becomes longer; the nodes that were working on the other branch will then switch to the longer one.
      </p>
    </ClickItem>
    <ClickItem onclick={props.onclick} selected={props.selected} item='id_18'>
      <p>
        New transaction broadcasts do not necessarily need to reach all nodes. As long as they reach many nodes, they will get into a block before long. Block broadcasts are also tolerant of dropped messages. If a node does not receive a block, it will request it when it receives the next block and realizes it missed one.
      </p>
    </ClickItem>

    <div className='row'>
      <h2 className='col-xs-11 col-xs-offset-1'>6. Incentive</h2>
    </div>
    <ClickItem onclick={props.onclick} selected={props.selected} item='id_19'>
      <p>
        By convention, the first transaction in a block is a special transaction that starts a new coin owned by the creator of the block. This adds an incentive for nodes to support the network, and provides a way to initially distribute coins into circulation, since there is no central authority to issue them. The steady addition of a constant of amount of new coins is analogous to gold miners expending resources to add gold to circulation. In our case, it is CPU time and electricity that is expended.
      </p>
    </ClickItem>
    <ClickItem onclick={props.onclick} selected={props.selected} item='id_20'>
      <p>
        The incentive can also be funded with transaction fees. If the output value of a transaction is less than its input value, the difference is a transaction fee that is added to the incentive value of the block containing the transaction. Once a predetermined number of coins have entered circulation, the incentive can transition entirely to transaction fees and be completely inflation free.
      </p>
    </ClickItem>
    <ClickItem onclick={props.onclick} selected={props.selected} item='id_21'>
      <p>
        The incentive may help encourage nodes to stay honest. If a greedy attacker is able to assemble more CPU power than all the honest nodes, he would have to choose between using it to defraud people by stealing back his payments, or using it to generate new coins. He ought to find it more profitable to play by the rules, such rules that favour him with more new coins than everyone else combined, than to undermine the system and the validity of his own wealth.
      </p>
    </ClickItem>

    <div className='row'>
      <h2 className='col-xs-11 col-xs-offset-1'>7. Reclaiming Disk Space</h2>
    </div>
    <ClickItem onclick={props.onclick} selected={props.selected} item='id_22'>
      <p>
        Once the latest transaction in a coin is buried under enough blocks, the spent transactions before it can be discarded to save disk space. To facilitate this without breaking the block&#39;s hash, transactions are hashed in a Merkle Tree <sup><a href='#fn7' id='ref7'>[7]</a></sup><sup><a href='#fn2' id='ref2-2'>[2]</a></sup><sup><a href='#fn5' id='ref5'>[5]</a></sup>, with only the root included in the block&#39;s hash. Old blocks can then be compacted by stubbing off branches of the tree. The interior hashes do not need to be stored.
      </p>
    </ClickItem>
    <ClickItem onclick={props.onclick} selected={props.selected} item='id_23'>
      <p>
        <img className='img-responsive center-block' src={img_4} />
      </p>
    </ClickItem>
    <ClickItem onclick={props.onclick} selected={props.selected} item='id_24'>
      <p>
        A block header with no transactions would be about 80 bytes. If we suppose blocks are generated every 10 minutes, 80 bytes * 6 * 24 * 365 = 4.2MB per year. With computer systems typically selling with 2GB of RAM as of 2008, and Moore&#39;s Law predicting current growth of 1.2GB per year, storage should not be a problem even if the block headers must be kept in memory.
      </p>
    </ClickItem>

    <div className='row'>
      <h2 className='col-xs-11 col-xs-offset-1'>8. Simplified Payment Verification</h2>
    </div>
    <ClickItem onclick={props.onclick} selected={props.selected} item='id_25'>
      <p>
        It is possible to verify payments without running a full network node. A user only needs to keep a copy of the block headers of the longest proof-of-work chain, which he can get by querying network nodes until he&#39;s convinced he has the longest chain, and obtain the Merkle branch linking the transaction to the block it&#39;s timestamped in. He can&#39;t check the transaction for himself, but by linking it to a place in the chain, he can see that a network node has accepted it, and blocks added after it further confirm the network has accepted it.
      </p>
    </ClickItem>
    <ClickItem onclick={props.onclick} selected={props.selected} item='id_26'>
      <p>
        <img className='img-responsive center-block' src={img_5} />
      </p>
    </ClickItem>
    <ClickItem onclick={props.onclick} selected={props.selected} item='id_27'>
      <p>
        As such, the verification is reliable as long as honest nodes control the network, but is more vulnerable if the network is overpowered by an attacker. While network nodes can verify transactions for themselves, the simplified method can be fooled by an attacker&#39;s fabricated transactions for as long as the attacker can continue to overpower the network. One strategy to protect against this would be to accept alerts from network nodes when they detect an invalid block, prompting the user&#39;s software to download the full block and alerted transactions to confirm the inconsistency. Businesses that receive frequent payments will probably still want to run their own nodes for more independent security and quicker verification.
      </p>
    </ClickItem>

    <div className='row'>
      <h2 className='col-xs-11 col-xs-offset-1'>9. Combining and Splitting Value</h2>
    </div>
    <ClickItem onclick={props.onclick} selected={props.selected} item='id_28'>
      <p>
        Although it would be possible to handle coins individually, it would be unwieldy to make a separate transaction for every cent in a transfer. To allow value to be split and combined, transactions contain multiple inputs and outputs. Normally there will be either a single input from a larger previous transaction or multiple inputs combining smaller amounts, and at most two outputs: one for the payment, and one returning the change, if any, back to the sender.
      </p>
    </ClickItem>
    <ClickItem onclick={props.onclick} selected={props.selected} item='id_29'>
      <p>
        <img className='img-responsive center-block' width='275' src={img_6} />
      </p>
    </ClickItem>
    <ClickItem onclick={props.onclick} selected={props.selected} item='id_3'>
      <p>
        It should be noted that fan-out, where a transaction depends on several transactions, and those transactions depend on many more, is not a problem here. There is never the need to extract a complete standalone copy of a transaction&#39;s history.
      </p>
    </ClickItem>

    <div className='row'>
      <h2 className='col-xs-11 col-xs-offset-1'>10. Privacy</h2>
    </div>
    <ClickItem onclick={props.onclick} selected={props.selected} item='id_31'>
      <p>
        The traditional banking model achieves a level of privacy by limiting access to information to the parties involved and the trusted third party. The necessity to announce all transactions publicly precludes this method, but privacy can still be maintained by breaking the flow of information in another place: by keeping public keys anonymous. The public can see that someone is sending an amount to someone else, but without information linking the transaction to anyone. This is similar to the level of information released by stock exchanges, where the time and size of individual trades, the &#39;tape&#39;, is made public, but without telling who the parties were.
      </p>
    </ClickItem>
    <ClickItem onclick={props.onclick} selected={props.selected} item='id_32'>
      <p>
        <img className='img-responsive center-block' src={img_7} />
      </p>
    </ClickItem>
    <ClickItem onclick={props.onclick} selected={props.selected} item='id_33'>
      <p>
        As an additional firewall, a new key pair should be used for each transaction to keep them from being linked to a common owner. Some linking is still unavoidable with multi-input transactions, which necessarily reveal that their inputs were owned by the same owner. The risk is that if the owner of a key is revealed, linking could reveal other transactions that belonged to the same owner.
      </p>
    </ClickItem>

    <div className='row'>
      <h2 className='col-xs-11 col-xs-offset-1'>12. Conclusion</h2>
    </div>
    <ClickItem onclick={props.onclick} selected={props.selected} item='id_34'>
      <p>
        We have proposed a system for electronic transactions without relying on trust. We started with the usual framework of coins made from digital signatures, which provides strong control of ownership, but is incomplete without a way to prevent double-spending. To solve this, we proposed a peer-to-peer network using proof-of-work to record a public history of transactions that quickly becomes computationally impractical for an attacker to change if honest nodes control a majority of CPU power. The network is robust in its unstructured simplicity. Nodes work all at once with little coordination. They do not need to be identified, since messages are not routed to any particular place and only need to be delivered on a best effort basis. Nodes can leave and rejoin the network at will, accepting the proof-of-work chain as proof of what happened while they were gone. They vote with their CPU power, expressing their acceptance of valid blocks by working on extending them and rejecting invalid blocks by refusing to work on them. Any needed rules and incentives can be enforced with this consensus mechanism.
      </p>
    </ClickItem>

    <div className='row'>
      <h2 className='col-xs-11 col-xs-offset-1'>References</h2>
    </div>
    <ClickItem onclick={props.onclick} selected={props.selected} item='id_35'>
      <ol>
        <li id="fn1">
          <p>
            W. Dai, <a href="http://nakamotoinstitute.org/b-money/">&#34;b-money,&#34;</a> <a href="http://www.weidai.com/bmoney.txt">http://www.weidai.com/bmoney.txt</a>, 1998.&nbsp;<a href="#ref1" title="Jump back to [1]">↩</a>
          </p>
        </li>
        <li id="fn2">
          <p>
            H. Massias, X.S. Avila, and J.-J. Quisquater, <a href="http://nakamotoinstitute.org/secure-timestamping-service.pdf">&#34;Design of a secure timestamping service with minimal trust requirements,&#34;</a> In <em>20th Symposium on Information Theory in the Benelux</em>, May 1999.&nbsp;<a href="#ref2" title="Jump back to [2-5]">↩</a>&nbsp;<a href="#ref2-2" title="Jump back to [2]">↩</a>
          </p>
        </li>
        <li id="fn3">
          <p>
            S. Haber, W.S. Stornetta, <a href="http://nakamotoinstitute.org/time-stamp-digital-document.pdf">&#34;How to time-stamp a digital document,&#34;</a> In <em>Journal of Cryptology</em>, vol 3, no 2, pages 99-111, 1991.&nbsp;<a href="#ref2" title="Jump back to [2-5]">↩</a>
          </p>
        </li>
        <li id="fn4">
          <p>
            D. Bayer, S. Haber, W.S. Stornetta, <a href="http://nakamotoinstitute.org/improving-time-stamping.pdf">&#34;Improving the efficiency and reliability of digital time-stamping,&#34;</a> In <em>Sequences II: Methods in Communication, Security and Computer Science</em>, pages 329-334, 1993.&nbsp;<a href="#ref2" title="Jump back to [2-5]">↩</a>
          </p>
        </li>
        <li id="fn5">
          <p>
            S. Haber, W.S. Stornetta, <a href="http://nakamotoinstitute.org/secure-names-bit-strings.pdf">&#34;Secure names for bit-strings,&#34;</a> In <em>Proceedings of the 4th ACM Conference on Computer and Communications Security</em>, pages 28-35, April 1997.&nbsp;<a href="#ref2" title="Jump back to [2-5]">↩</a>&nbsp;<a href="#ref5" title="Jump back to [5]">↩</a>
          </p>
        </li>
        <li id="fn6">
          <p>
            A. Back, <a href="http://nakamotoinstitute.org/hashcash.pdf">&#34;Hashcash - a denial of service counter-measure,&#34;</a> <a href="http://www.hashcash.org/papers/hashcash.pdf">http://www.hashcash.org/papers/hashcash.pdf</a>, 2002.&nbsp;<a href="#ref6" title="Jump back to [6]">↩</a>
          </p>
        </li>
        <li id="fn7">
          <p>
            R.C. Merkle, <a href="http://nakamotoinstitute.org/public-key-cryptosystems.pdf">&#34;Protocols for public key cryptosystems,&#34;</a> In <em>Proc. 1980 Symposium on Security and Privacy</em>, IEEE Computer Society, pages 122-133, April 1980.&nbsp;<a href="#ref7" title="Jump back to [7]">↩</a>
          </p>
        </li>
        <li id="fn8">
          <p>
            W. Feller, <a href="http://nakamotoinstitute.org/introduction-probability-theory-vol-i.pdf">&#34;An introduction to probability theory and its applications,&#34;</a> 1957.&nbsp;<a href="#ref8" title="Jump back to [8]">↩</a>
          </p>
        </li>	
      </ol>
    </ClickItem>
  </div>
);

WhitePaper.propTypes = {
  onclick: PropTypes.func,
  selected: PropTypes.string,
};

export default WhitePaper;

//       <h2>11. Calculations</h2>        
//       <p>
//         We consider the scenario of an attacker trying to generate an alternate chain faster than the honest chain. Even if this is accomplished, it does not throw the system open to arbitrary changes, such as creating value out of thin air or taking money that never belonged to the attacker. Nodes are not going to accept an invalid transaction as payment, and honest nodes will never accept a block containing them. An attacker can only try to change one of his own transactions to take back money he recently spent.
//       </p>
//       <p>
//         The race between the honest chain and an attacker chain can be characterized as a Binomial Random Walk. The success event is the honest chain being extended by one block, increasing its lead by +1, and the failure event is the attacker's chain being extended by one block, reducing the gap by -1.
//       </p>
//       <p>
//         The probability of an attacker catching up from a given deficit is analogous to a Gambler's Ruin problem. Suppose a gambler with unlimited credit starts at a deficit and plays potentially an infinite number of trials to try to reach breakeven. We can calculate the probability he ever reaches breakeven, or that an attacker ever catches up with the honest chain, as follows<sup><a href='#fn8' id='ref8'>[8]</a></sup>:
//       </p>
//       <p>
//         <span className='MathJax_Preview' style='color: inherit; display: none;'></span><div className='MathJax_Display' style='text-align: left;'><span className='MathJax' id='MathJax-Element-1-Frame' tabindex='0' data-mathml='<math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot; display=&quot;block&quot;><mtable columnalign=&quot;right center left&quot; rowspacing=&quot;3pt&quot; columnspacing=&quot;0 thickmathspace&quot; displaystyle=&quot;true&quot;><mtr><mtd><mstyle mathsize=&quot;1.2em&quot;><mi>p</mi></mstyle></mtd><mtd><mi></mi><mo>=</mo></mtd><mtd><mtext>&amp;#xA0;probability an honest node finds the next block</mtext></mtd></mtr><mtr><mtd><mstyle mathsize=&quot;1.2em&quot;><mi>q</mi></mstyle></mtd><mtd><mi></mi><mo>=</mo></mtd><mtd><mtext>&amp;#xA0;probability the attacker finds the next block</mtext></mtd></mtr><mtr><mtd><mstyle mathsize=&quot;1.2em&quot;><msub><mi>q</mi><mi>z</mi></msub></mstyle></mtd><mtd><mi></mi><mo>=</mo></mtd><mtd><mrow><mtext>&amp;#xA0;probability the attacker will ever catch up from&amp;#xA0;</mtext><mrow className=&quot;MJX-TeXAtom-ORD&quot;><mi>z</mi></mrow><mtext>&amp;#xA0;blocks behind</mtext></mrow></mtd></mtr></mtable></math>' role='presentation' style='text-align: left; position: relative;'><nobr aria-hidden='true'><span className='math' id='MathJax-Span-1' style='width: 36.312em; display: inline-block;'><span style='display: inline-block; position: relative; width: 30.241em; height: 0px; font-size: 120%;'><span style='position: absolute; clip: rect(-0.116em 1030.06em 3.991em -999.997em); top: -2.199em; left: 0em;'><span className='mrow' id='MathJax-Span-2'><span className='mtable' id='MathJax-Span-3' style='padding-right: 0.182em; padding-left: 0.182em;'><span style='display: inline-block; position: relative; width: 29.884em; height: 0px;'><span style='position: absolute; clip: rect(2.443em 1001.01em 6.253em -999.997em); top: -4.461em; left: 0em;'><span style='display: inline-block; position: relative; width: 1.015em; height: 0px;'><span style='position: absolute; clip: rect(3.277em 1000.6em 4.408em -999.997em); top: -5.295em; right: 0em;'><span className='mtd' id='MathJax-Span-4'><span className='mrow' id='MathJax-Span-5'><span className='mstyle' id='MathJax-Span-6'><span className='mrow' id='MathJax-Span-7'><span className='mi' id='MathJax-Span-8' style='font-size: 120%; font-family: MathJax_Math-italic;'>p</span></span></span></span></span><span style='display: inline-block; width: 0px; height: 3.991em;'></span></span><span style='position: absolute; clip: rect(3.277em 1000.54em 4.408em -999.997em); top: -3.985em; right: 0em;'><span className='mtd' id='MathJax-Span-16'><span className='mrow' id='MathJax-Span-17'><span className='mstyle' id='MathJax-Span-18'><span className='mrow' id='MathJax-Span-19'><span className='mi' id='MathJax-Span-20' style='font-size: 120%; font-family: MathJax_Math-italic;'>q<span style='display: inline-block; overflow: hidden; height: 1px; width: 0.003em;'></span></span></span></span></span></span><span style='display: inline-block; width: 0px; height: 3.991em;'></span></span><span style='position: absolute; clip: rect(3.277em 1001.01em 4.467em -999.997em); top: -2.616em; right: 0em;'><span className='mtd' id='MathJax-Span-28'><span className='mrow' id='MathJax-Span-29'><span className='mstyle' id='MathJax-Span-30'><span className='mrow' id='MathJax-Span-31'><span className='msubsup' id='MathJax-Span-32'><span style='display: inline-block; position: relative; width: 1.015em; height: 0px;'><span style='position: absolute; clip: rect(3.277em 1000.54em 4.408em -999.997em); top: -3.985em; left: 0em;'><span className='mi' id='MathJax-Span-33' style='font-size: 120%; font-family: MathJax_Math-italic;'>q<span style='display: inline-block; overflow: hidden; height: 1px; width: 0.003em;'></span></span><span style='display: inline-block; width: 0px; height: 3.991em;'></span></span><span style='position: absolute; top: -3.688em; left: 0.539em;'><span className='mi' id='MathJax-Span-34' style='font-size: 84.9%; font-family: MathJax_Math-italic;'>z<span style='display: inline-block; overflow: hidden; height: 1px; width: 0.003em;'></span></span><span style='display: inline-block; width: 0px; height: 3.991em;'></span></span></span></span></span></span></span></span><span style='display: inline-block; width: 0px; height: 3.991em;'></span></span></span><span style='display: inline-block; width: 0px; height: 4.467em;'></span></span><span style='position: absolute; clip: rect(2.205em 1001.01em 5.598em -999.997em); top: -4.045em; left: 1.015em;'><span style='display: inline-block; position: relative; width: 1.074em; height: 0px;'><span style='position: absolute; clip: rect(3.455em 1001.01em 4.17em -999.997em); top: -5.295em; left: 50%; margin-left: -0.533em;'><span className='mtd' id='MathJax-Span-9'><span className='mrow' id='MathJax-Span-10'><span className='mi' id='MathJax-Span-11'></span><span className='mo' id='MathJax-Span-12' style='font-family: MathJax_Main; padding-left: 0.301em;'>=</span></span></span><span style='display: inline-block; width: 0px; height: 3.991em;'></span></span><span style='position: absolute; clip: rect(3.455em 1001.01em 4.17em -999.997em); top: -3.985em; left: 50%; margin-left: -0.533em;'><span className='mtd' id='MathJax-Span-21'><span className='mrow' id='MathJax-Span-22'><span className='mi' id='MathJax-Span-23'></span><span className='mo' id='MathJax-Span-24' style='font-family: MathJax_Main; padding-left: 0.301em;'>=</span></span></span><span style='display: inline-block; width: 0px; height: 3.991em;'></span></span><span style='position: absolute; clip: rect(3.455em 1001.01em 4.17em -999.997em); top: -2.616em; left: 50%; margin-left: -0.533em;'><span className='mtd' id='MathJax-Span-35'><span className='mrow' id='MathJax-Span-36'><span className='mi' id='MathJax-Span-37'></span><span className='mo' id='MathJax-Span-38' style='font-family: MathJax_Main; padding-left: 0.301em;'>=</span></span></span><span style='display: inline-block; width: 0px; height: 3.991em;'></span></span></span><span style='display: inline-block; width: 0px; height: 4.051em;'></span></span><span style='position: absolute; clip: rect(2.384em 1027.44em 6.313em -999.997em); top: -4.58em; left: 2.384em;'><span style='display: inline-block; position: relative; width: 27.503em; height: 0px;'><span style='position: absolute; clip: rect(3.098em 1020.48em 4.348em -999.997em); top: -5.295em; left: 0em;'><span className='mtd' id='MathJax-Span-13'><span className='mrow' id='MathJax-Span-14'><span className='mtext' id='MathJax-Span-15' style='font-family: MathJax_Main;'>&nbsp;probability an honest node finds the next block</span></span></span><span style='display: inline-block; width: 0px; height: 3.991em;'></span></span><span style='position: absolute; clip: rect(3.098em 1019.23em 4.348em -999.997em); top: -3.985em; left: 0em;'><span className='mtd' id='MathJax-Span-25'><span className='mrow' id='MathJax-Span-26'><span className='mtext' id='MathJax-Span-27' style='font-family: MathJax_Main;'>&nbsp;probability the attacker finds the next block</span></span></span><span style='display: inline-block; width: 0px; height: 3.991em;'></span></span><span style='position: absolute; clip: rect(3.098em 1027.44em 4.348em -999.997em); top: -2.616em; left: 0em;'><span className='mtd' id='MathJax-Span-39'><span className='mrow' id='MathJax-Span-40'><span className='mrow' id='MathJax-Span-41'><span className='mtext' id='MathJax-Span-42' style='font-family: MathJax_Main;'>&nbsp;probability the attacker will ever catch up from&nbsp;</span><span className='texatom' id='MathJax-Span-43'><span className='mrow' id='MathJax-Span-44'><span className='mi' id='MathJax-Span-45' style='font-family: MathJax_Math-italic;'>z<span style='display: inline-block; overflow: hidden; height: 1px; width: 0.003em;'></span></span></span></span><span className='mtext' id='MathJax-Span-46' style='font-family: MathJax_Main;'>&nbsp;blocks behind</span></span></span></span><span style='display: inline-block; width: 0px; height: 3.991em;'></span></span></span><span style='display: inline-block; width: 0px; height: 4.586em;'></span></span></span></span></span><span style='display: inline-block; width: 0px; height: 2.205em;'></span></span></span><span style='display: inline-block; overflow: hidden; vertical-align: -1.996em; border-left: 0px solid; width: 0px; height: 4.646em;'></span></span></nobr><span className='MJX_Assistive_MathML MJX_Assistive_MathML_Block' role='presentation'><math xmlns='http://www.w3.org/1998/Math/MathML' display='block'><mtable columnalign='right center left' rowspacing='3pt' columnspacing='0 thickmathspace' displaystyle='true'><mtr><mtd><mstyle mathsize='1.2em'><mi>p</mi></mstyle></mtd><mtd><mi></mi><mo>=</mo></mtd><mtd><mtext>&nbsp;probability an honest node finds the next block</mtext></mtd></mtr><mtr><mtd><mstyle mathsize='1.2em'><mi>q</mi></mstyle></mtd><mtd><mi></mi><mo>=</mo></mtd><mtd><mtext>&nbsp;probability the attacker finds the next block</mtext></mtd></mtr><mtr><mtd><mstyle mathsize='1.2em'><msub><mi>q</mi><mi>z</mi></msub></mstyle></mtd><mtd><mi></mi><mo>=</mo></mtd><mtd><mrow><mtext>&nbsp;probability the attacker will ever catch up from&nbsp;</mtext><mrow className='MJX-TeXAtom-ORD'><mi>z</mi></mrow><mtext>&nbsp;blocks behind</mtext></mrow></mtd></mtr></mtable></math></span></span></div><script type='math/tex; mode=display' id='MathJax-Element-1'>
//         \begin{eqnarray*}
//         \large p &=& \text{ probability an honest node finds the next block}\\
//         \large q &=& \text{ probability the attacker finds the next block}\\
//         \large q_z &=& \text{ probability the attacker will ever catch up from $z$ blocks behind}
//         \end{eqnarray*}
//         </script>
//         </p>
//       <p>
//         <span className='MathJax_Preview' style='color: inherit; display: none;'></span><div className='MathJax_Display' style='text-align: left;'><span className='MathJax' id='MathJax-Element-2-Frame' tabindex='0' data-mathml='<math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot; display=&quot;block&quot;><mstyle mathsize=&quot;1.2em&quot;><msub><mi>q</mi><mi>z</mi></msub><mo>=</mo><mrow><mo>{</mo><mtable rowspacing=&quot;4pt&quot; columnspacing=&quot;1em&quot;><mtr><mtd><mn>1</mn></mtd><mtd><mrow className=&quot;MJX-TeXAtom-ORD&quot;><mtext className=&quot;MJX-tex-mathit&quot; mathvariant=&quot;italic&quot;>if</mtext></mrow><mspace width=&quot;thickmathspace&quot; /><mi>p</mi><mo>&amp;#x2264;</mo><mi>q</mi></mtd></mtr><mtr><mtd><mo stretchy=&quot;false&quot;>(</mo><mi>q</mi><mrow className=&quot;MJX-TeXAtom-ORD&quot;><mo>/</mo></mrow><mi>p</mi><msup><mo stretchy=&quot;false&quot;>)</mo><mi>z</mi></msup></mtd><mtd><mrow className=&quot;MJX-TeXAtom-ORD&quot;><mtext className=&quot;MJX-tex-mathit&quot; mathvariant=&quot;italic&quot;>if</mtext></mrow><mspace width=&quot;thickmathspace&quot; /><mi>p</mi><mo>&amp;gt;</mo><mi>q</mi></mtd></mtr></mtable><mo>}</mo></mrow></mstyle></math>' role='presentation' style='text-align: left; position: relative;'><nobr aria-hidden='true'><span className='math' id='MathJax-Span-47' style='width: 15.36em; display: inline-block;'><span style='display: inline-block; position: relative; width: 12.801em; height: 0px; font-size: 120%;'><span style='position: absolute; clip: rect(1.967em 1012.62em 5.182em -999.997em); top: -3.866em; left: 0em;'><span className='mrow' id='MathJax-Span-48'><span className='mstyle' id='MathJax-Span-49'><span className='mrow' id='MathJax-Span-50'><span className='msubsup' id='MathJax-Span-51'><span style='display: inline-block; position: relative; width: 1.015em; height: 0px;'><span style='position: absolute; clip: rect(3.277em 1000.54em 4.408em -999.997em); top: -3.985em; left: 0em;'><span className='mi' id='MathJax-Span-52' style='font-size: 120%; font-family: MathJax_Math-italic;'>q<span style='display: inline-block; overflow: hidden; height: 1px; width: 0.003em;'></span></span><span style='display: inline-block; width: 0px; height: 3.991em;'></span></span><span style='position: absolute; top: -3.688em; left: 0.539em;'><span className='mi' id='MathJax-Span-53' style='font-size: 84.9%; font-family: MathJax_Math-italic;'>z<span style='display: inline-block; overflow: hidden; height: 1px; width: 0.003em;'></span></span><span style='display: inline-block; width: 0px; height: 3.991em;'></span></span></span></span><span className='mo' id='MathJax-Span-54' style='font-size: 120%; font-family: MathJax_Main; padding-left: 0.301em;'>=</span><span className='mrow' id='MathJax-Span-55' style='padding-left: 0.36em;'><span className='mo' id='MathJax-Span-56' style='vertical-align: 0em;'><span><span style='font-size: 120%; font-family: MathJax_Size3;'>{</span></span></span><span className='mtable' id='MathJax-Span-57' style='padding-right: 0.182em; padding-left: 0.182em;'><span style='display: inline-block; position: relative; width: 7.979em; height: 0px;'><span style='position: absolute; clip: rect(2.265em 1003.16em 5.301em -999.997em); top: -3.985em; left: 0em;'><span style='display: inline-block; position: relative; width: 3.158em; height: 0px;'><span style='position: absolute; clip: rect(3.039em 1000.54em 4.17em -999.997em); top: -4.759em; left: 50%; margin-left: -0.295em;'><span className='mtd' id='MathJax-Span-58'><span className='mrow' id='MathJax-Span-59'><span className='mn' id='MathJax-Span-60' style='font-size: 120%; font-family: MathJax_Main;'>1</span></span></span><span style='display: inline-block; width: 0px; height: 3.991em;'></span></span><span style='position: absolute; clip: rect(2.86em 1003.16em 4.467em -999.997em); top: -3.152em; left: 50%; margin-left: -1.604em;'><span className='mtd' id='MathJax-Span-70'><span className='mrow' id='MathJax-Span-71'><span className='mo' id='MathJax-Span-72' style='font-size: 120%; font-family: MathJax_Main;'>(</span><span className='mi' id='MathJax-Span-73' style='font-size: 120%; font-family: MathJax_Math-italic;'>q<span style='display: inline-block; overflow: hidden; height: 1px; width: 0.003em;'></span></span><span className='texatom' id='MathJax-Span-74'><span className='mrow' id='MathJax-Span-75'><span className='mo' id='MathJax-Span-76' style='font-size: 120%; font-family: MathJax_Main;'>/</span></span></span><span className='mi' id='MathJax-Span-77' style='font-size: 120%; font-family: MathJax_Math-italic;'>p</span><span className='msubsup' id='MathJax-Span-78'><span style='display: inline-block; position: relative; width: 0.955em; height: 0px;'><span style='position: absolute; clip: rect(2.92em 1000.36em 4.467em -999.997em); top: -3.985em; left: 0em;'><span className='mo' id='MathJax-Span-79' style='font-size: 120%; font-family: MathJax_Main;'>)</span><span style='display: inline-block; width: 0px; height: 3.991em;'></span></span><span style='position: absolute; top: -4.58em; left: 0.479em;'><span className='mi' id='MathJax-Span-80' style='font-size: 84.9%; font-family: MathJax_Math-italic;'>z<span style='display: inline-block; overflow: hidden; height: 1px; width: 0.003em;'></span></span><span style='display: inline-block; width: 0px; height: 3.991em;'></span></span></span></span></span></span><span style='display: inline-block; width: 0px; height: 3.991em;'></span></span></span><span style='display: inline-block; width: 0px; height: 3.991em;'></span></span><span style='position: absolute; clip: rect(2.205em 1003.81em 5.241em -999.997em); top: -3.985em; left: 4.17em;'><span style='display: inline-block; position: relative; width: 3.812em; height: 0px;'><span style='position: absolute; clip: rect(2.979em 1003.81em 4.408em -999.997em); top: -4.759em; left: 50%; margin-left: -1.902em;'><span className='mtd' id='MathJax-Span-61'><span className='mrow' id='MathJax-Span-62'><span className='texatom' id='MathJax-Span-63'><span className='mrow' id='MathJax-Span-64'><span className='mtext' id='MathJax-Span-65' style='font-size: 120%; font-family: MathJax_Main-italic;'>i<span style='font-family: MathJax_Main-italic;'>f</span></span></span></span><span className='mspace' id='MathJax-Span-66' style='height: 0em; vertical-align: 0em; width: 0.301em; display: inline-block; overflow: hidden;'></span><span className='mi' id='MathJax-Span-67' style='font-size: 120%; font-family: MathJax_Math-italic;'>p</span><span className='mo' id='MathJax-Span-68' style='font-size: 120%; font-family: MathJax_Main; padding-left: 0.301em;'>≤</span><span className='mi' id='MathJax-Span-69' style='font-size: 120%; font-family: MathJax_Math-italic; padding-left: 0.301em;'>q<span style='display: inline-block; overflow: hidden; height: 1px; width: 0.003em;'></span></span></span></span><span style='display: inline-block; width: 0px; height: 3.991em;'></span></span><span style='position: absolute; clip: rect(2.979em 1003.81em 4.408em -999.997em); top: -3.152em; left: 50%; margin-left: -1.902em;'><span className='mtd' id='MathJax-Span-81'><span className='mrow' id='MathJax-Span-82'><span className='texatom' id='MathJax-Span-83'><span className='mrow' id='MathJax-Span-84'><span className='mtext' id='MathJax-Span-85' style='font-size: 120%; font-family: MathJax_Main-italic;'>i<span style='font-family: MathJax_Main-italic;'>f</span></span></span></span><span className='mspace' id='MathJax-Span-86' style='height: 0em; vertical-align: 0em; width: 0.301em; display: inline-block; overflow: hidden;'></span><span className='mi' id='MathJax-Span-87' style='font-size: 120%; font-family: MathJax_Math-italic;'>p</span><span className='mo' id='MathJax-Span-88' style='font-size: 120%; font-family: MathJax_Main; padding-left: 0.301em;'>&gt;</span><span className='mi' id='MathJax-Span-89' style='font-size: 120%; font-family: MathJax_Math-italic; padding-left: 0.301em;'>q<span style='display: inline-block; overflow: hidden; height: 1px; width: 0.003em;'></span></span></span></span><span style='display: inline-block; width: 0px; height: 3.991em;'></span></span></span><span style='display: inline-block; width: 0px; height: 3.991em;'></span></span></span></span><span className='mo' id='MathJax-Span-90' style='vertical-align: 0em;'><span><span style='font-size: 120%; font-family: MathJax_Size3;'>}</span></span></span></span></span></span></span><span style='display: inline-block; width: 0px; height: 3.872em;'></span></span></span><span style='display: inline-block; overflow: hidden; vertical-align: -1.425em; border-left: 0px solid; width: 0px; height: 3.575em;'></span></span></nobr><span className='MJX_Assistive_MathML MJX_Assistive_MathML_Block' role='presentation'><math xmlns='http://www.w3.org/1998/Math/MathML' display='block'><mstyle mathsize='1.2em'><msub><mi>q</mi><mi>z</mi></msub><mo>=</mo><mrow><mo>{</mo><mtable rowspacing='4pt' columnspacing='1em'><mtr><mtd><mn>1</mn></mtd><mtd><mrow className='MJX-TeXAtom-ORD'><mtext className='MJX-tex-mathit' mathvariant='italic'>if</mtext></mrow><mspace width='thickmathspace'></mspace><mi>p</mi><mo>≤</mo><mi>q</mi></mtd></mtr><mtr><mtd><mo stretchy='false'>(</mo><mi>q</mi><mrow className='MJX-TeXAtom-ORD'><mo>/</mo></mrow><mi>p</mi><msup><mo stretchy='false'>)</mo><mi>z</mi></msup></mtd><mtd><mrow className='MJX-TeXAtom-ORD'><mtext className='MJX-tex-mathit' mathvariant='italic'>if</mtext></mrow><mspace width='thickmathspace'></mspace><mi>p</mi><mo>&gt;</mo><mi>q</mi></mtd></mtr></mtable><mo>}</mo></mrow></mstyle></math></span></span></div><script type='math/tex; mode=display' id='MathJax-Element-2'>\large q_z = \begin{Bmatrix}
//         1 & \textit{if}\; p \leq q\\ 
//         (q/p)^z & \textit{if}\; p > q 
//         \end{Bmatrix}</script>
//       </p>

//       <p>
//         Given our assumption that <span className='MathJax_Preview' style='color: inherit; display: none;'></span><span className='MathJax' id='MathJax-Element-3-Frame' tabindex='0' data-mathml='<math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;><mi>p</mi><mo>&amp;#x003E;</mo><mi>q</mi></math>' role='presentation' style='position: relative;'><nobr aria-hidden='true'><span className='math' id='MathJax-Span-91' style='width: 2.801em; display: inline-block;'><span style='display: inline-block; position: relative; width: 2.324em; height: 0px; font-size: 120%;'><span style='position: absolute; clip: rect(1.491em 1002.32em 2.562em -999.997em); top: -2.199em; left: 0em;'><span className='mrow' id='MathJax-Span-92'><span className='mi' id='MathJax-Span-93' style='font-family: MathJax_Math-italic;'>p</span><span className='mo' id='MathJax-Span-94' style='font-family: MathJax_Main; padding-left: 0.301em;'>&gt;</span><span className='mi' id='MathJax-Span-95' style='font-family: MathJax_Math-italic; padding-left: 0.301em;'>q<span style='display: inline-block; overflow: hidden; height: 1px; width: 0.003em;'></span></span></span><span style='display: inline-block; width: 0px; height: 2.205em;'></span></span></span><span style='display: inline-block; overflow: hidden; vertical-align: -0.282em; border-left: 0px solid; width: 0px; height: 1.004em;'></span></span></nobr><span className='MJX_Assistive_MathML' role='presentation'><math xmlns='http://www.w3.org/1998/Math/MathML'><mi>p</mi><mo>&gt;</mo><mi>q</mi></math></span></span><script type='math/tex' id='MathJax-Element-3'>p \gt q</script>, the probability drops exponentially as the number of blocks the attacker has to catch up with increases. With the odds against him, if he doesn't make a lucky lunge forward early on, his chances become vanishingly small as he falls further behind.
//       </p>
//       <p>
//         We now consider how long the recipient of a new transaction needs to wait before being sufficiently certain the sender can't change the transaction. We assume the sender is an attacker who wants to make the recipient believe he paid him for a while, then switch it to pay back to himself after some time has passed. The receiver will be alerted when that happens, but the sender hopes it will be too late.
//       </p>

//       <p>
//         The receiver generates a new key pair and gives the public key to the sender shortly before signing. This prevents the sender from preparing a chain of blocks ahead of time by working on it continuously until he is lucky enough to get far enough ahead, then executing the transaction at that moment. Once the transaction is sent, the dishonest sender starts working in secret on a parallel chain containing an alternate version of his transaction.
//       </p>

//       <p>
//         The recipient waits until the transaction has been added to a block and <span className='MathJax_Preview' style='color: inherit; display: none;'></span><span className='MathJax' id='MathJax-Element-4-Frame' tabindex='0' data-mathml='<math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;><mi>z</mi></math>' role='presentation' style='position: relative;'><nobr aria-hidden='true'><span className='math' id='MathJax-Span-96' style='width: 0.598em; display: inline-block;'><span style='display: inline-block; position: relative; width: 0.479em; height: 0px; font-size: 120%;'><span style='position: absolute; clip: rect(1.61em 1000.48em 2.384em -999.997em); top: -2.199em; left: 0em;'><span className='mrow' id='MathJax-Span-97'><span className='mi' id='MathJax-Span-98' style='font-family: MathJax_Math-italic;'>z<span style='display: inline-block; overflow: hidden; height: 1px; width: 0.003em;'></span></span></span><span style='display: inline-block; width: 0px; height: 2.205em;'></span></span></span><span style='display: inline-block; overflow: hidden; vertical-align: -0.068em; border-left: 0px solid; width: 0px; height: 0.718em;'></span></span></nobr><span className='MJX_Assistive_MathML' role='presentation'><math xmlns='http://www.w3.org/1998/Math/MathML'><mi>z</mi></math></span></span><script type='math/tex' id='MathJax-Element-4'>z</script> blocks have been linked after it. He doesn't know the exact amount of progress the attacker has made, but assuming the honest blocks took the average expected time per block, the attacker's potential progress will be a Poisson distribution with expected value:
//       </p>
//       <p>
//         <span className='MathJax_Preview' style='color: inherit; display: none;'></span><div className='MathJax_Display' style='text-align: left;'><span className='MathJax' id='MathJax-Element-5-Frame' tabindex='0' data-mathml='<math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot; display=&quot;block&quot;><mstyle mathsize=&quot;1.2em&quot;><mi>&amp;#x03BB;</mi><mo>=</mo><mi>z</mi><mfrac><mi>q</mi><mi>p</mi></mfrac></mstyle></math>' role='presentation' style='text-align: left; position: relative;'><nobr aria-hidden='true'><span className='math' id='MathJax-Span-99' style='width: 4.765em; display: inline-block;'><span style='display: inline-block; position: relative; width: 3.932em; height: 0px; font-size: 120%;'><span style='position: absolute; clip: rect(0.836em 1003.93em 3.634em -999.997em); top: -2.378em; left: 0em;'><span className='mrow' id='MathJax-Span-100'><span className='mstyle' id='MathJax-Span-101'><span className='mrow' id='MathJax-Span-102'><span className='mi' id='MathJax-Span-103' style='font-size: 120%; font-family: MathJax_Math-italic;'>λ</span><span className='mo' id='MathJax-Span-104' style='font-size: 120%; font-family: MathJax_Main; padding-left: 0.301em;'>=</span><span className='mi' id='MathJax-Span-105' style='font-size: 120%; font-family: MathJax_Math-italic; padding-left: 0.301em;'>z<span style='display: inline-block; overflow: hidden; height: 1px; width: 0.003em;'></span></span><span className='mfrac' id='MathJax-Span-106'><span style='display: inline-block; position: relative; width: 0.777em; height: 0px; margin-right: 0.122em; margin-left: 0.122em;'><span style='position: absolute; clip: rect(3.277em 1000.54em 4.408em -999.997em); top: -4.818em; left: 50%; margin-left: -0.295em;'><span className='mi' id='MathJax-Span-107' style='font-size: 120%; font-family: MathJax_Math-italic;'>q<span style='display: inline-block; overflow: hidden; height: 1px; width: 0.003em;'></span></span><span style='display: inline-block; width: 0px; height: 3.991em;'></span></span><span style='position: absolute; clip: rect(3.277em 1000.6em 4.408em -999.997em); top: -3.152em; left: 50%; margin-left: -0.295em;'><span className="mi" id="MathJax-Span-108" style="font-size: 120%; font-family: MathJax_Math-italic;">p</span><span style="display: inline-block; width: 0px; height: 3.991em;"></span></span><span style="position: absolute; clip: rect(0.836em 1000.78em 1.253em -999.997em); top: -1.307em; left: 0em;"><span style="display: inline-block; overflow: hidden; vertical-align: 0em; border-top: 1.3px solid; width: 0.777em; height: 0px;"></span><span style="display: inline-block; width: 0px; height: 1.074em;"></span></span></span></span></span></span></span><span style="display: inline-block; width: 0px; height: 2.384em;"></span></span></span><span style="display: inline-block; overflow: hidden; vertical-align: -1.354em; border-left: 0px solid; width: 0px; height: 3.004em;"></span></span></nobr><span className="MJX_Assistive_MathML MJX_Assistive_MathML_Block" role="presentation"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mstyle mathsize="1.2em"><mi>λ</mi><mo>=</mo><mi>z</mi><mfrac><mi>q</mi><mi>p</mi></mfrac></mstyle></math></span></span></div><script type="math/tex; mode=display" id="MathJax-Element-5">\large \lambda = z \frac qp</script>
//       </p>

//       <p>
//         To get the probability the attacker could still catch up now, we multiply the Poisson density for each amount of progress he could have made by the probability he could catch up from that point:
//       </p>
//       <p>
//         <span className="MathJax_Preview" style="color: inherit; display: none;"></span><div className="MathJax_Display" style="text-align: left;"><span className="MathJax" id="MathJax-Element-6-Frame" tabindex="0" data-mathml="<math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot; display=&quot;block&quot;><mstyle mathsize=&quot;1.2em&quot;><munderover><mo>&amp;#x2211;</mo><mrow className=&quot;MJX-TeXAtom-ORD&quot;><mi>k</mi><mo>=</mo><mn>0</mn></mrow><mrow className=&quot;MJX-TeXAtom-ORD&quot;><mi mathvariant=&quot;normal&quot;>&amp;#x221E;</mi></mrow></munderover><mfrac><mrow><msup><mi>&amp;#x03BB;</mi><mi>k</mi></msup><msup><mi>e</mi><mrow className=&quot;MJX-TeXAtom-ORD&quot;><mo>&amp;#x2212;</mo><mi>&amp;#x03BB;</mi></mrow></msup></mrow><mrow><mi>k</mi><mo>!</mo></mrow></mfrac><mo>&amp;#x22C5;</mo><mrow><mo>{</mo><mtable rowspacing=&quot;4pt&quot; columnspacing=&quot;1em&quot;><mtr><mtd><mo stretchy=&quot;false&quot;>(</mo><mi>q</mi><mrow className=&quot;MJX-TeXAtom-ORD&quot;><mo>/</mo></mrow><mi>p</mi><msup><mo stretchy=&quot;false&quot;>)</mo><mrow className=&quot;MJX-TeXAtom-ORD&quot;><mo stretchy=&quot;false&quot;>(</mo><mi>z</mi><mo>&amp;#x2212;</mo><mi>k</mi><mo stretchy=&quot;false&quot;>)</mo></mrow></msup></mtd><mtd><mrow className=&quot;MJX-TeXAtom-ORD&quot;><mtext className=&quot;MJX-tex-mathit&quot; mathvariant=&quot;italic&quot;>if</mtext></mrow><mspace width=&quot;thickmathspace&quot; /><mi>k</mi><mo>&amp;#x2264;</mo><mi>z</mi></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mrow className=&quot;MJX-TeXAtom-ORD&quot;><mtext className=&quot;MJX-tex-mathit&quot; mathvariant=&quot;italic&quot;>if</mtext></mrow><mspace width=&quot;thickmathspace&quot; /><mi>k</mi><mo>&amp;gt;</mo><mi>z</mi></mtd></mtr></mtable><mo>}</mo></mrow></mstyle></math>" role="presentation" style="text-align: left; position: relative;"><nobr aria-hidden="true"><span className="math" id="MathJax-Span-109" style="width: 21.729em; display: inline-block;"><span style="display: inline-block; position: relative; width: 18.098em; height: 0px; font-size: 120%;"><span style="position: absolute; clip: rect(1.789em 1017.92em 5.539em -999.997em); top: -3.866em; left: 0em;"><span className="mrow" id="MathJax-Span-110"><span className="mstyle" id="MathJax-Span-111"><span className="mrow" id="MathJax-Span-112"><span className="munderover" id="MathJax-Span-113"><span style="display: inline-block; position: relative; width: 1.729em; height: 0px;"><span style="position: absolute; clip: rect(2.682em 1001.67em 4.705em -999.997em); top: -3.985em; left: 0em;"><span className="mo" id="MathJax-Span-114" style="font-size: 120%; font-family: MathJax_Size2; vertical-align: 0em;">∑</span><span style="display: inline-block; width: 0px; height: 3.991em;"></span></span><span style="position: absolute; clip: rect(3.217em 1001.49em 4.289em -999.997em); top: -2.676em; left: 0.122em;"><span className="texatom" id="MathJax-Span-115"><span className="mrow" id="MathJax-Span-116"><span className="mi" id="MathJax-Span-117" style="font-size: 84.9%; font-family: MathJax_Math-italic;">k</span><span className="mo" id="MathJax-Span-118" style="font-size: 84.9%; font-family: MathJax_Main;">=</span><span className="mn" id="MathJax-Span-119" style="font-size: 84.9%; font-family: MathJax_Main;">0</span></span></span><span style="display: inline-block; width: 0px; height: 3.991em;"></span></span><span style="position: absolute; clip: rect(3.336em 1000.78em 4.17em -999.997em); top: -5.354em; left: 0.42em;"><span className="texatom" id="MathJax-Span-120"><span className="mrow" id="MathJax-Span-121"><span className="mi" id="MathJax-Span-122" style="font-size: 84.9%; font-family: MathJax_Main;">∞</span></span></span><span style="display: inline-block; width: 0px; height: 3.991em;"></span></span></span></span><span className="mfrac" id="MathJax-Span-123" style="padding-left: 0.182em;"><span style="display: inline-block; position: relative; width: 3.158em; height: 0px; margin-right: 0.122em; margin-left: 0.122em;"><span style="position: absolute; clip: rect(2.741em 1003.04em 4.17em -999.997em); top: -4.818em; left: 50%; margin-left: -1.545em;"><span className="mrow" id="MathJax-Span-124"><span className="msubsup" id="MathJax-Span-125"><span style="display: inline-block; position: relative; width: 1.253em; height: 0px;"><span style="position: absolute; clip: rect(2.979em 1000.66em 4.17em -999.997em); top: -3.985em; left: 0em;"><span className="mi" id="MathJax-Span-126" style="font-size: 120%; font-family: MathJax_Math-italic;">λ</span><span style="display: inline-block; width: 0px; height: 3.991em;"></span></span><span style="position: absolute; top: -4.461em; left: 0.717em;"><span className="mi" id="MathJax-Span-127" style="font-size: 84.9%; font-family: MathJax_Math-italic;">k</span><span style="display: inline-block; width: 0px; height: 3.991em;"></span></span></span></span><span className="msubsup" id="MathJax-Span-128"><span style="display: inline-block; position: relative; width: 1.789em; height: 0px;"><span style="position: absolute; clip: rect(3.277em 1000.54em 4.17em -999.997em); top: -3.985em; left: 0em;"><span className="mi" id="MathJax-Span-129" style="font-size: 120%; font-family: MathJax_Math-italic;">e</span><span style="display: inline-block; width: 0px; height: 3.991em;"></span></span><span style="position: absolute; top: -4.402em; left: 0.539em;"><span className="texatom" id="MathJax-Span-130"><span className="mrow" id="MathJax-Span-131"><span className="mo" id="MathJax-Span-132" style="font-size: 84.9%; font-family: MathJax_Main;">−</span><span className="mi" id="MathJax-Span-133" style="font-size: 84.9%; font-family: MathJax_Math-italic;">λ</span></span></span><span style="display: inline-block; width: 0px; height: 3.991em;"></span></span></span></span></span><span style="display: inline-block; width: 0px; height: 3.991em;"></span></span><span style="position: absolute; clip: rect(2.979em 1000.9em 4.17em -999.997em); top: -3.152em; left: 50%; margin-left: -0.473em;"><span className="mrow" id="MathJax-Span-134"><span className="mi" id="MathJax-Span-135" style="font-size: 120%; font-family: MathJax_Math-italic;">k</span><span className="mo" id="MathJax-Span-136" style="font-size: 120%; font-family: MathJax_Main;">!</span></span><span style="display: inline-block; width: 0px; height: 3.991em;"></span></span><span style="position: absolute; clip: rect(0.836em 1003.16em 1.253em -999.997em); top: -1.307em; left: 0em;"><span style="display: inline-block; overflow: hidden; vertical-align: 0em; border-top: 1.3px solid; width: 3.158em; height: 0px;"></span><span style="display: inline-block; width: 0px; height: 1.074em;"></span></span></span></span><span className="mo" id="MathJax-Span-137" style="font-size: 120%; font-family: MathJax_Main; padding-left: 0.241em;">⋅</span><span className="mrow" id="MathJax-Span-138" style="padding-left: 0.241em;"><span className="mo" id="MathJax-Span-139" style="vertical-align: 0em;"><span><span style="font-size: 120%; font-family: MathJax_Size3;">{</span></span></span><span className="mtable" id="MathJax-Span-140" style="padding-right: 0.182em; padding-left: 0.182em;"><span style="display: inline-block; position: relative; width: 9.824em; height: 0px;"><span style="position: absolute; clip: rect(1.967em 1004.94em 5.182em -999.997em); top: -3.985em; left: 0em;"><span style="display: inline-block; position: relative; width: 4.943em; height: 0px;"><span style="position: absolute; clip: rect(2.622em 1004.94em 4.467em -999.997em); top: -4.64em; left: 50%; margin-left: -2.438em;"><span className="mtd" id="MathJax-Span-141"><span className="mrow" id="MathJax-Span-142"><span className="mo" id="MathJax-Span-143" style="font-size: 120%; font-family: MathJax_Main;">(</span><span className="mi" id="MathJax-Span-144" style="font-size: 120%; font-family: MathJax_Math-italic;">q<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.003em;"></span></span><span className="texatom" id="MathJax-Span-145"><span className="mrow" id="MathJax-Span-146"><span className="mo" id="MathJax-Span-147" style="font-size: 120%; font-family: MathJax_Main;">/</span></span></span><span className="mi" id="MathJax-Span-148" style="font-size: 120%; font-family: MathJax_Math-italic;">p</span><span className="msubsup" id="MathJax-Span-149"><span style="display: inline-block; position: relative; width: 2.741em; height: 0px;"><span style="position: absolute; clip: rect(2.92em 1000.36em 4.467em -999.997em); top: -3.985em; left: 0em;"><span className="mo" id="MathJax-Span-150" style="font-size: 120%; font-family: MathJax_Main;">)</span><span style="display: inline-block; width: 0px; height: 3.991em;"></span></span><span style="position: absolute; top: -4.58em; left: 0.479em;"><span className="texatom" id="MathJax-Span-151"><span className="mrow" id="MathJax-Span-152"><span className="mo" id="MathJax-Span-153" style="font-size: 84.9%; font-family: MathJax_Main;">(</span><span className="mi" id="MathJax-Span-154" style="font-size: 84.9%; font-family: MathJax_Math-italic;">z<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.003em;"></span></span><span className="mo" id="MathJax-Span-155" style="font-size: 84.9%; font-family: MathJax_Main;">−</span><span className="mi" id="MathJax-Span-156" style="font-size: 84.9%; font-family: MathJax_Math-italic;">k</span><span className="mo" id="MathJax-Span-157" style="font-size: 84.9%; font-family: MathJax_Main;">)</span></span></span><span style="display: inline-block; width: 0px; height: 3.991em;"></span></span></span></span></span></span><span style="display: inline-block; width: 0px; height: 3.991em;"></span></span><span style="position: absolute; clip: rect(3.039em 1000.54em 4.17em -999.997em); top: -2.973em; left: 50%; margin-left: -0.295em;"><span className="mtd" id="MathJax-Span-167"><span className="mrow" id="MathJax-Span-168"><span className="mn" id="MathJax-Span-169" style="font-size: 120%; font-family: MathJax_Main;">1</span></span></span><span style="display: inline-block; width: 0px; height: 3.991em;"></span></span></span><span style="display: inline-block; width: 0px; height: 3.991em;"></span></span><span style="position: absolute; clip: rect(2.324em 1003.87em 5.42em -999.997em); top: -3.985em; left: 5.955em;"><span style="display: inline-block; position: relative; width: 3.872em; height: 0px;"><span style="position: absolute; clip: rect(2.979em 1003.87em 4.408em -999.997em); top: -4.64em; left: 50%; margin-left: -1.902em;"><span className="mtd" id="MathJax-Span-158"><span className="mrow" id="MathJax-Span-159"><span className="texatom" id="MathJax-Span-160"><span className="mrow" id="MathJax-Span-161"><span className="mtext" id="MathJax-Span-162" style="font-size: 120%; font-family: MathJax_Main-italic;">i<span style="font-family: MathJax_Main-italic;">f</span></span></span></span><span className="mspace" id="MathJax-Span-163" style="height: 0em; vertical-align: 0em; width: 0.301em; display: inline-block; overflow: hidden;"></span><span className="mi" id="MathJax-Span-164" style="font-size: 120%; font-family: MathJax_Math-italic;">k</span><span className="mo" id="MathJax-Span-165" style="font-size: 120%; font-family: MathJax_Main; padding-left: 0.301em;">≤</span><span className="mi" id="MathJax-Span-166" style="font-size: 120%; font-family: MathJax_Math-italic; padding-left: 0.301em;">z<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.003em;"></span></span></span></span><span style="display: inline-block; width: 0px; height: 3.991em;"></span></span><span style="position: absolute; clip: rect(2.979em 1003.87em 4.408em -999.997em); top: -2.973em; left: 50%; margin-left: -1.902em;"><span className="mtd" id="MathJax-Span-170"><span className="mrow" id="MathJax-Span-171"><span className="texatom" id="MathJax-Span-172"><span className="mrow" id="MathJax-Span-173"><span className="mtext" id="MathJax-Span-174" style="font-size: 120%; font-family: MathJax_Main-italic;">i<span style="font-family: MathJax_Main-italic;">f</span></span></span></span><span className="mspace" id="MathJax-Span-175" style="height: 0em; vertical-align: 0em; width: 0.301em; display: inline-block; overflow: hidden;"></span><span className="mi" id="MathJax-Span-176" style="font-size: 120%; font-family: MathJax_Math-italic;">k</span><span className="mo" id="MathJax-Span-177" style="font-size: 120%; font-family: MathJax_Main; padding-left: 0.301em;">&gt;</span><span className="mi" id="MathJax-Span-178" style="font-size: 120%; font-family: MathJax_Math-italic; padding-left: 0.301em;">z<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.003em;"></span></span></span></span><span style="display: inline-block; width: 0px; height: 3.991em;"></span></span></span><span style="display: inline-block; width: 0px; height: 3.991em;"></span></span></span></span><span className="mo" id="MathJax-Span-179" style="vertical-align: 0em;"><span><span style="font-size: 120%; font-family: MathJax_Size3;">}</span></span></span></span></span></span></span><span style="display: inline-block; width: 0px; height: 3.872em;"></span></span></span><span style="display: inline-block; overflow: hidden; vertical-align: -1.854em; border-left: 0px solid; width: 0px; height: 4.218em;"></span></span></nobr><span className="MJX_Assistive_MathML MJX_Assistive_MathML_Block" role="presentation"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mstyle mathsize="1.2em"><munderover><mo>∑</mo><mrow className="MJX-TeXAtom-ORD"><mi>k</mi><mo>=</mo><mn>0</mn></mrow><mrow className="MJX-TeXAtom-ORD"><mi mathvariant="normal">∞</mi></mrow></munderover><mfrac><mrow><msup><mi>λ</mi><mi>k</mi></msup><msup><mi>e</mi><mrow className="MJX-TeXAtom-ORD"><mo>−</mo><mi>λ</mi></mrow></msup></mrow><mrow><mi>k</mi><mo>!</mo></mrow></mfrac><mo>⋅</mo><mrow><mo>{</mo><mtable rowspacing="4pt" columnspacing="1em"><mtr><mtd><mo stretchy="false">(</mo><mi>q</mi><mrow className="MJX-TeXAtom-ORD"><mo>/</mo></mrow><mi>p</mi><msup><mo stretchy="false">)</mo><mrow className="MJX-TeXAtom-ORD"><mo stretchy="false">(</mo><mi>z</mi><mo>−</mo><mi>k</mi><mo stretchy="false">)</mo></mrow></msup></mtd><mtd><mrow className="MJX-TeXAtom-ORD"><mtext className="MJX-tex-mathit" mathvariant="italic">if</mtext></mrow><mspace width="thickmathspace"></mspace><mi>k</mi><mo>≤</mo><mi>z</mi></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mrow className="MJX-TeXAtom-ORD"><mtext className="MJX-tex-mathit" mathvariant="italic">if</mtext></mrow><mspace width="thickmathspace"></mspace><mi>k</mi><mo>&gt;</mo><mi>z</mi></mtd></mtr></mtable><mo>}</mo></mrow></mstyle></math></span></span></div><script type="math/tex; mode=display" id="MathJax-Element-6">\large \sum_{k=0}^{\infty} \frac{\lambda^k e^{-\lambda}}{k!} \cdot
//         \begin{Bmatrix}
//         (q/p)^{(z-k)} & \textit{if}\;k\leq z\\ 
//         1 & \textit{if} \; k > z
//         \end{Bmatrix}</script>
//       </p>
//       <p>
//         Rearranging to avoid summing the infinite tail of the distribution...
//       </p>
//       <p>
//         <span className="MathJax_Preview" style="color: inherit; display: none;"></span><div className="MathJax_Display" style="text-align: left;"><span className="MathJax" id="MathJax-Element-7-Frame" tabindex="0" data-mathml="<math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot; display=&quot;block&quot;><mstyle mathsize=&quot;1.2em&quot;><mn>1</mn><mo>&amp;#x2212;</mo><munderover><mo>&amp;#x2211;</mo><mrow className=&quot;MJX-TeXAtom-ORD&quot;><mi>k</mi><mo>=</mo><mn>0</mn></mrow><mrow className=&quot;MJX-TeXAtom-ORD&quot;><mi>z</mi></mrow></munderover><mfrac><mrow><msup><mi>&amp;#x03BB;</mi><mi>k</mi></msup><msup><mi>e</mi><mrow className=&quot;MJX-TeXAtom-ORD&quot;><mo>&amp;#x2212;</mo><mi>&amp;#x03BB;</mi></mrow></msup></mrow><mrow><mi>k</mi><mo>!</mo></mrow></mfrac><mrow><mo>(</mo><mrow><mn>1</mn><mo>&amp;#x2212;</mo><mo stretchy=&quot;false&quot;>(</mo><mi>q</mi><mrow className=&quot;MJX-TeXAtom-ORD&quot;><mo>/</mo></mrow><mi>p</mi><msup><mo stretchy=&quot;false&quot;>)</mo><mrow className=&quot;MJX-TeXAtom-ORD&quot;><mo stretchy=&quot;false&quot;>(</mo><mi>z</mi><mo>&amp;#x2212;</mo><mi>k</mi><mo stretchy=&quot;false&quot;>)</mo></mrow></msup></mrow><mo>)</mo></mrow></mstyle></math>" role="presentation" style="text-align: left; position: relative;"><nobr aria-hidden="true"><span className="math" id="MathJax-Span-180" style="width: 18.872em; display: inline-block;"><span style="display: inline-block; position: relative; width: 15.717em; height: 0px; font-size: 120%;"><span style="position: absolute; clip: rect(1.551em 1015.48em 5.301em -999.997em); top: -3.628em; left: 0em;"><span className="mrow" id="MathJax-Span-181"><span className="mstyle" id="MathJax-Span-182"><span className="mrow" id="MathJax-Span-183"><span className="mn" id="MathJax-Span-184" style="font-size: 120%; font-family: MathJax_Main;">1</span><span className="mo" id="MathJax-Span-185" style="font-size: 120%; font-family: MathJax_Main; padding-left: 0.241em;">−</span><span className="munderover" id="MathJax-Span-186" style="padding-left: 0.241em;"><span style="display: inline-block; position: relative; width: 1.729em; height: 0px;"><span style="position: absolute; clip: rect(2.682em 1001.67em 4.705em -999.997em); top: -3.985em; left: 0em;"><span className="mo" id="MathJax-Span-187" style="font-size: 120%; font-family: MathJax_Size2; vertical-align: 0em;">∑</span><span style="display: inline-block; width: 0px; height: 3.991em;"></span></span><span style="position: absolute; clip: rect(3.217em 1001.49em 4.289em -999.997em); top: -2.676em; left: 0.122em;"><span className="texatom" id="MathJax-Span-188"><span className="mrow" id="MathJax-Span-189"><span className="mi" id="MathJax-Span-190" style="font-size: 84.9%; font-family: MathJax_Math-italic;">k</span><span className="mo" id="MathJax-Span-191" style="font-size: 84.9%; font-family: MathJax_Main;">=</span><span className="mn" id="MathJax-Span-192" style="font-size: 84.9%; font-family: MathJax_Main;">0</span></span></span><span style="display: inline-block; width: 0px; height: 3.991em;"></span></span><span style="position: absolute; clip: rect(3.336em 1000.42em 4.17em -999.997em); top: -5.354em; left: 0.658em;"><span className="texatom" id="MathJax-Span-193"><span className="mrow" id="MathJax-Span-194"><span className="mi" id="MathJax-Span-195" style="font-size: 84.9%; font-family: MathJax_Math-italic;">z<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.003em;"></span></span></span></span><span style="display: inline-block; width: 0px; height: 3.991em;"></span></span></span></span><span className="mfrac" id="MathJax-Span-196" style="padding-left: 0.182em;"><span style="display: inline-block; position: relative; width: 3.158em; height: 0px; margin-right: 0.122em; margin-left: 0.122em;"><span style="position: absolute; clip: rect(2.741em 1003.04em 4.17em -999.997em); top: -4.818em; left: 50%; margin-left: -1.545em;"><span className="mrow" id="MathJax-Span-197"><span className="msubsup" id="MathJax-Span-198"><span style="display: inline-block; position: relative; width: 1.253em; height: 0px;"><span style="position: absolute; clip: rect(2.979em 1000.66em 4.17em -999.997em); top: -3.985em; left: 0em;"><span className="mi" id="MathJax-Span-199" style="font-size: 120%; font-family: MathJax_Math-italic;">λ</span><span style="display: inline-block; width: 0px; height: 3.991em;"></span></span><span style="position: absolute; top: -4.461em; left: 0.717em;"><span className="mi" id="MathJax-Span-200" style="font-size: 84.9%; font-family: MathJax_Math-italic;">k</span><span style="display: inline-block; width: 0px; height: 3.991em;"></span></span></span></span><span className="msubsup" id="MathJax-Span-201"><span style="display: inline-block; position: relative; width: 1.789em; height: 0px;"><span style="position: absolute; clip: rect(3.277em 1000.54em 4.17em -999.997em); top: -3.985em; left: 0em;"><span className="mi" id="MathJax-Span-202" style="font-size: 120%; font-family: MathJax_Math-italic;">e</span><span style="display: inline-block; width: 0px; height: 3.991em;"></span></span><span style="position: absolute; top: -4.402em; left: 0.539em;"><span className="texatom" id="MathJax-Span-203"><span className="mrow" id="MathJax-Span-204"><span className="mo" id="MathJax-Span-205" style="font-size: 84.9%; font-family: MathJax_Main;">−</span><span className="mi" id="MathJax-Span-206" style="font-size: 84.9%; font-family: MathJax_Math-italic;">λ</span></span></span><span style="display: inline-block; width: 0px; height: 3.991em;"></span></span></span></span></span><span style="display: inline-block; width: 0px; height: 3.991em;"></span></span><span style="position: absolute; clip: rect(2.979em 1000.9em 4.17em -999.997em); top: -3.152em; left: 50%; margin-left: -0.473em;"><span className="mrow" id="MathJax-Span-207"><span className="mi" id="MathJax-Span-208" style="font-size: 120%; font-family: MathJax_Math-italic;">k</span><span className="mo" id="MathJax-Span-209" style="font-size: 120%; font-family: MathJax_Main;">!</span></span><span style="display: inline-block; width: 0px; height: 3.991em;"></span></span><span style="position: absolute; clip: rect(0.836em 1003.16em 1.253em -999.997em); top: -1.307em; left: 0em;"><span style="display: inline-block; overflow: hidden; vertical-align: 0em; border-top: 1.3px solid; width: 3.158em; height: 0px;"></span><span style="display: inline-block; width: 0px; height: 1.074em;"></span></span></span></span><span className="mrow" id="MathJax-Span-210"><span className="mo" id="MathJax-Span-211" style="vertical-align: 0em;"><span><span style="font-size: 120%; font-family: MathJax_Size2;">(</span></span></span><span className="mrow" id="MathJax-Span-212"><span className="mn" id="MathJax-Span-213" style="font-size: 120%; font-family: MathJax_Main;">1</span><span className="mo" id="MathJax-Span-214" style="font-size: 120%; font-family: MathJax_Main; padding-left: 0.241em;">−</span><span className="mo" id="MathJax-Span-215" style="font-size: 120%; font-family: MathJax_Main; padding-left: 0.241em;">(</span><span className="mi" id="MathJax-Span-216" style="font-size: 120%; font-family: MathJax_Math-italic;">q<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.003em;"></span></span><span className="texatom" id="MathJax-Span-217"><span className="mrow" id="MathJax-Span-218"><span className="mo" id="MathJax-Span-219" style="font-size: 120%; font-family: MathJax_Main;">/</span></span></span><span className="mi" id="MathJax-Span-220" style="font-size: 120%; font-family: MathJax_Math-italic;">p</span><span className="msubsup" id="MathJax-Span-221"><span style="display: inline-block; position: relative; width: 2.741em; height: 0px;"><span style="position: absolute; clip: rect(2.92em 1000.36em 4.467em -999.997em); top: -3.985em; left: 0em;"><span className="mo" id="MathJax-Span-222" style="font-size: 120%; font-family: MathJax_Main;">)</span><span style="display: inline-block; width: 0px; height: 3.991em;"></span></span><span style="position: absolute; top: -4.58em; left: 0.479em;"><span className="texatom" id="MathJax-Span-223"><span className="mrow" id="MathJax-Span-224"><span className="mo" id="MathJax-Span-225" style="font-size: 84.9%; font-family: MathJax_Main;">(</span><span className="mi" id="MathJax-Span-226" style="font-size: 84.9%; font-family: MathJax_Math-italic;">z<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.003em;"></span></span><span className="mo" id="MathJax-Span-227" style="font-size: 84.9%; font-family: MathJax_Main;">−</span><span className="mi" id="MathJax-Span-228" style="font-size: 84.9%; font-family: MathJax_Math-italic;">k</span><span className="mo" id="MathJax-Span-229" style="font-size: 84.9%; font-family: MathJax_Main;">)</span></span></span><span style="display: inline-block; width: 0px; height: 3.991em;"></span></span></span></span></span><span className="mo" id="MathJax-Span-230" style="vertical-align: 0em;"><span><span style="font-size: 120%; font-family: MathJax_Size2;">)</span></span></span></span></span></span></span><span style="display: inline-block; width: 0px; height: 3.634em;"></span></span></span><span style="display: inline-block; overflow: hidden; vertical-align: -1.854em; border-left: 0px solid; width: 0px; height: 4.218em;"></span></span></nobr><span className="MJX_Assistive_MathML MJX_Assistive_MathML_Block" role="presentation"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mstyle mathsize="1.2em"><mn>1</mn><mo>−</mo><munderover><mo>∑</mo><mrow className="MJX-TeXAtom-ORD"><mi>k</mi><mo>=</mo><mn>0</mn></mrow><mrow className="MJX-TeXAtom-ORD"><mi>z</mi></mrow></munderover><mfrac><mrow><msup><mi>λ</mi><mi>k</mi></msup><msup><mi>e</mi><mrow className="MJX-TeXAtom-ORD"><mo>−</mo><mi>λ</mi></mrow></msup></mrow><mrow><mi>k</mi><mo>!</mo></mrow></mfrac><mrow><mo>(</mo><mrow><mn>1</mn><mo>−</mo><mo stretchy="false">(</mo><mi>q</mi><mrow className="MJX-TeXAtom-ORD"><mo>/</mo></mrow><mi>p</mi><msup><mo stretchy="false">)</mo><mrow className="MJX-TeXAtom-ORD"><mo stretchy="false">(</mo><mi>z</mi><mo>−</mo><mi>k</mi><mo stretchy="false">)</mo></mrow></msup></mrow><mo>)</mo></mrow></mstyle></math></span></span></div><script type="math/tex; mode=display" id="MathJax-Element-7">\large 1 - \sum_{k=0}^{z} \frac{\lambda^k e^{-\lambda}}{k!}
//         \left ( 1-(q/p)^{(z-k)} \right )</script>
//       </p>
//       <p>
//         Converting to C code...
//       </p>
//       <pre>#include <math.h>
// double AttackerSuccessProbability(double q, int z)
// {
//   double p = 1.0 - q;
//   double lambda = z * (q / p);
//   double sum = 1.0;
//   int i, k;
//   for (k = 0; k &lt;= z; k++)
//   {
//     double poisson = exp(-lambda);
//     for (i = 1; i &lt;= k; i++)
//       poisson *= lambda / i;
//     sum -= poisson * (1 - pow(q / p, z - k));
//   }
//   return sum;
// }
//       </math.h></pre>

//       <p>
//         Running some results, we can see the probability drop off exponentially with <span className="MathJax_Preview" style="color: inherit; display: none;"></span><span className="MathJax" id="MathJax-Element-8-Frame" tabindex="0" data-mathml="<math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;><mi>z</mi></math>" role="presentation" style="position: relative;"><nobr aria-hidden="true"><span className="math" id="MathJax-Span-231" style="width: 0.598em; display: inline-block;"><span style="display: inline-block; position: relative; width: 0.479em; height: 0px; font-size: 120%;"><span style="position: absolute; clip: rect(1.61em 1000.48em 2.384em -999.997em); top: -2.199em; left: 0em;"><span className="mrow" id="MathJax-Span-232"><span className="mi" id="MathJax-Span-233" style="font-family: MathJax_Math-italic;">z<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.003em;"></span></span></span><span style="display: inline-block; width: 0px; height: 2.205em;"></span></span></span><span style="display: inline-block; overflow: hidden; vertical-align: -0.068em; border-left: 0px solid; width: 0px; height: 0.718em;"></span></span></nobr><span className="MJX_Assistive_MathML" role="presentation"><math xmlns="http://www.w3.org/1998/Math/MathML"><mi>z</mi></math></span></span><script type="math/tex" id="MathJax-Element-8">z</script>.
//       </p>
//       <pre>q=0.1
// z=0    P=1.0000000
// z=1    P=0.2045873
// z=2    P=0.0509779
// z=3    P=0.0131722
// z=4    P=0.0034552  
// z=5    P=0.0009137
// z=6    P=0.0002428
// z=7    P=0.0000647
// z=8    P=0.0000173
// z=9    P=0.0000046
// z=10   P=0.0000012

// q=0.3
// z=0    P=1.0000000
// z=5    P=0.1773523
// z=10   P=0.0416605
// z=15   P=0.0101008
// z=20   P=0.0024804
// z=25   P=0.0006132
// z=30   P=0.0001522
// z=35   P=0.0000379
// z=40   P=0.0000095
// z=45   P=0.0000024
// z=50   P=0.0000006
//       </pre>

//       <p>
//         Solving for P less than 0.1%...
//       </p>
//       <pre>P &lt; 0.001
// q=0.10   z=5
// q=0.15   z=8
// q=0.20   z=11
// q=0.25   z=15
// q=0.30   z=24
// q=0.35   z=41
// q=0.40   z=89
// q=0.45   z=340	
//       </pre>
