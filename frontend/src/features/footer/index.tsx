import * as React from 'react'

import { Link } from 'react-router-dom'

const Footer: React.FC = (): JSX.Element => {
  const supportLinks = ['Contact Us', 'Help Center', 'FAQ', 'Return Policy', 'Delivery']
  const companyLinks = ['About Us', 'Community', 'Press', 'Careers']
  const storeLinks = ['Store Locator', 'Appointments']

  const footerColumnLinks = (links: string[]) => {
     return links.map((link, index) => {
      return (
        <li className='footer-column-link' key={`${index}_${link}`}>
          <Link to='#'>{link}</Link>
        </li>
      )
    })
  }

  const footerColumnList = (title: string, links: string[]) => {
    return (
      <div className='footer-column'>
        <h4>{title}</h4>
        <div className='divider'></div>
        <ul className='footer-column-links'>
          {footerColumnLinks(links)}
        </ul>
      </div>
    )
  }

  return (
    <footer className='footer'>
      <div className='footer-columns'>
        {footerColumnList('Support', supportLinks)}
        {footerColumnList('Company', companyLinks)}
        {footerColumnList('Store', storeLinks)}
        <div className='footer-column'>
            <form className='email-signup-form'>
              <label className='email-signup-form-label'>Join our mailing list!</label>
              <input type='email' className='email-signup-form-input'/>
              <button className='email-signup-form-button'>Join</button>
            </form>
        </div>
      </div>
      <div className='footer-copyright'>
        <div className='divider'></div>
        &copy;2023 FURNI - Pamela Whisenhunt
      </div>
    </footer>
  )
}

export default Footer