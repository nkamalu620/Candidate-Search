// import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <div>
      <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/potential candidates">Potential Candidates</Link>
                </li>
           
            </ul>
        </nav>
    </div>
  )
};

export default Nav;
