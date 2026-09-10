import { Link } from "react-router-dom";
import SideNav from "../components/SideNav.jsx";
import ParticleBackground from "../components/ParticleBackground.jsx";
import "../styles/full-letter.css";

export default function FullLetter() {
  return (
    <div className="full-letter-shell">
      <ParticleBackground subtle />
      <SideNav />
      <article className="full-letter-inner">
        <p className="letter-kicker">A letter for you.</p>
        <h1 className="letter-title">Hey.</h1>

        <div className="letter-body">
          <p>I need to say something.</p>

          <p>
            I’m really sorry. 😔<br />
            I know I hurt you. And knowing that honestly hurts me too.
          </p>

          <p>
            I never wanted you to feel like I didn’t care.<br />
            I never wanted you to think I was ignoring you.<br />
            I just haven’t been getting my phone or any other device.
          </p>

          <p>
            Today, the only thing I got was my laptop. And even that was only because of the science project work that’s
            coming up.
          </p>

          <p>
            And honestly... I don’t even know how long I’ll have it.<br />
            They’re probably going to take it away again.
          </p>

          <p>
            And then there’s my SEE this year. There’s just a lot happening right now.<br />
            A lot of pressure. A lot of expectations.
          </p>

          <p>
            But I know that doesn’t make what happened hurt any less.<br />
            I know you were waiting for me.<br />
            And I’m really sorry.
          </p>

          <p>
            I wish I could’ve been there when you needed me.<br />
            I know I can’t change what happened yesterday.<br />
            And I’m really sorry for making you cry. 🥲
          </p>

          <p>
            Even if I can’t get my phone or my laptop...<br />
            I’ll still try my best to talk to you whenever I can.<br />
            Even if it’s only one day a week. Even if it’s only for a little while.
          </p>

          <p>
            Because things are probably going to get even busier soon. Our midterms are coming from the beginning of
            Ashoj... And after that, it’s going to be pure chaos because of SEE. 💀 And you have your BLE this year too.
          </p>

          <p>
            So I know we’re both going to have a lot going on.<br />
            But that doesn’t mean I care about you any less. ❤️
          </p>

          <p>
            Even when I’m quiet...<br />
            Even when I disappear for a while...<br />
            Please don’t mistake that silence for me not caring.<br />
            Because I do care. A lot.
          </p>

          <p>
            I still think about you.<br />
            I still miss talking to you.<br />
            I miss telling you random things.<br />
            I miss just being able to talk to you whenever I wanted.
          </p>

          <p>
            And I know an apology can’t magically fix everything. But I really want to make things better.<br />
            I want to do better whenever I get the chance.
          </p>

          <p>
            I don’t want you thinking you’re unimportant to me.<br />
            You’re not. Not even close.
          </p>

          <p>
            So whenever I get my phone...<br />
            Whenever I get my laptop...<br />
            Whenever I get even a little bit of time...<br />
            I’ll try to use it to talk to you.
          </p>

          <p>
            I can’t promise that everything will suddenly become easy.<br />
            But I can promise that I’ll keep trying.<br />
            Because you matter to me. ❤️ And I don’t want one bad day to make you doubt that.
          </p>

          <p>
            Please take care of yourself too.<br />
            Study. Do your best.<br />
            And please don’t forget to smile sometimes. 🫶
          </p>

          <p>
            I want to see you do well.<br />
            I want to be there to see you succeed.<br />
            Even if things get difficult for both of us.
          </p>

          <p>
            I’m still here.<br />
            And I’m still trying.
          </p>
        </div>

        <p className="letter-closing">I’m sorry... 🥲</p>

        <p className="letter-ps hp-ps">
          <span className="hp-ps-icon" aria-hidden>⚡</span> p.s. I’m sending this as a website link cuz I told my parents I was doing research for the flash flood project
          when making this — and as it was just coding they didn’t suspect. I can’t really use Instagram right now.
          This single page should show you what I really wanted to tell you. In the future I’ll add more messages to{" "}
          <Link to="/new-msgs" className="ps-link">
            /new-msgs
          </Link>{" "}
          on this site, so stay tuned ;)
        </p>


      </article>
    </div>
  );
}
