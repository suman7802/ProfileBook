import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import aboutAnimation from '../assets/about.svg';
import SocialButton from '../components/SocialButton';

const socialButtons = [
  {
    icon: faEnvelope,
    url: 'mailto:suman7802@gmail.com',
  },
  {
    icon: faLinkedinIn,
    url: 'https://www.linkedin.com/in/suman7802/2',
  },
  {
    icon: faGithub,
    url: 'https://github.com/suman7802',
  },
  {
    icon: faFacebookF,
    url: 'https://www.facebook.com/suman7802',
  },
  {
    icon: faInstagram,
    url: 'https://www.instagram.com/suman_sharma7802',
  },
];

export default function About() {
  return (
    <div className="flex min-h-[90vh] flex-col items-center justify-center gap-8 p-5 py-5">
      <img src={aboutAnimation} alt="contact" className="md:w-[30vw]" />
      <div className="aboutMe flex flex-col items-center px-5 text-center text-2xl md:w-[50%]">
        <span>
          Hi, I am&nbsp;
          <span className="font-semibold">Suman Sharma</span>.
        </span>
        <span>
          A
          <span className="font-semibold text-indigo-500">
            &nbsp;web developer&nbsp;
          </span>
          &
          <span className="font-semibold text-indigo-500">
            &nbsp;CS student&nbsp;
          </span>
        </span>
        <span>
          at&nbsp;
          <span className="font-semibold">Patan Multiple Campus.</span>
        </span>
        <div className="social mt-4 flex flex-row gap-3">
          {(socialButtons || []).map((button, index) => (
            <SocialButton key={index} icon={button.icon} url={button.url} />
          ))}
        </div>
      </div>
    </div>
  );
}
