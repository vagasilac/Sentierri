import React from 'react';
import { Breadcrumbs, Link } from '@material-ui/core';

function Breadcrumbs({ path }) {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {path.map((item, index) => (
        <Link key={index} color="inherit" href={item.href}>
          {item.label}
        </Link>
      ))}
    </Breadcrumbs>
  );
}

export default Breadcrumbs;

// This code creates a BreadcrumbsComponent that displays a Breadcrumbs component from @material-ui/core.
// The path prop is used to specify the navigation hierarchy of the current page.
// Each item in the path array represents a level in the hierarchy and should have a label and href property.