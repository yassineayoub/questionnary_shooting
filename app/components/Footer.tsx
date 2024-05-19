import React from 'react'
import { BsLinkedin, BsTwitter, BsGithub } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="footer flex flex-col p-10 text-gray-900 bg-slate-100">
      <p className="text-center  mb-3"><strong>Développé par Yassine Ayoub</strong></p>
      <div className="flex gap-2 text-xl justify-center">
        <a target="_blank" href="https://www.linkedin.com/in/yassineayoub//" rel="noreferrer"><BsLinkedin /></a>
        <a target="_blank" href="https://github.com/yassineayoub" rel="noreferrer"><BsGithub /></a>
        <a target="_blank" href="https://twitter.com/Yass_inDev" rel="noreferrer"><BsTwitter /></a>
      </div>
    </footer>
  )
}

export default Footer