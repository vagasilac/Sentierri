import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse, ListItemIcon } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import { useNavigate } from 'react-router-dom';

function Sidebar({ sections }) {
  const [openSections, setOpenSections] = useState({});
  const [openSectionsColl, setOpenSectionsColl] = useState(true);
  const navigate = useNavigate();

  const handleClick = (section, link) => {
    setOpenSections(prevState => ({
      ...prevState,
      [section]: !prevState[section],
    }));
    console.log(link);
  };

  // onclick of handleClickLink console.log(item.link) to see what is being passed
  const handleClickLink = link => {
    navigate(link);
  };
  
  const handleClickColl = () => {
    setOpenSectionsColl(!openSectionsColl);
  };


  return (
    <List>
      <ListItem button onClick={() => handleClickColl()}>
        <ListItemIcon>
          <MultipleStopIcon color="primary" />
        </ListItemIcon>
      </ListItem>
      {sections.map(section => (
        <React.Fragment key={section.label}>
          <ListItem button onClick={() => handleClick(section.label, section.link)}>
            <ListItemIcon>
              {<section.icon color="primary" />}
            </ListItemIcon>
            {openSectionsColl && (
              <ListItemText primary={section.label} />
            )}
            {openSectionsColl && section.items && (openSections[section.label] ? <ExpandLess /> : <ExpandMore />)}
          </ListItem>
          <Collapse in={openSections[section.label]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {section.items && section.items.map(item => (
                <ListItem key={item.label} button onClick={() => handleClickLink(item.link)}>
                  <ListItemIcon>
                    <item.icon color="secondary" />
                  </ListItemIcon>
                  {openSectionsColl && (
                    <ListItemText primary={item.label} />
                  )}
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
}

export default Sidebar;

// This code creates a Sidebar component that displays a vertical navigation menu with
// collapsible sections using List, ListItem, ListItemText, and Collapse components from @material-ui/core.
// The sections prop is used to specify the sections and items in the menu.
// Each section should have a label property and an items array.
// Each item in the items array should have a label property.