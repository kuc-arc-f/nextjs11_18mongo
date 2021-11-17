import React, { Component } from 'react';
import Link from 'next/link';

//
const IndexRow = props => (
  <tr>
    <td>
      <h3>
      <Link href={`/apollo/notes/${props.id}`}>
        <a>{props.title}</a>
      </Link>
      </h3>
      ID: {props.id}
    </td>
    <td>
      <Link href={`/apollo/notes/edit/${props.id}`}>
        <a className="btn btn-sm btn-outline-primary"> Edit</a>
      </Link>
    </td>
  </tr>  
);
export default IndexRow;