import React from 'react';
import classes from './Sidebar.module.scss';

const Sidebar = ({ children }) => {
  return (
    <aside className={classes.Sidebar}>
      <div className={classes.SidebarChildren}>{children}</div>
    </aside>
  );
};

export default Sidebar;
