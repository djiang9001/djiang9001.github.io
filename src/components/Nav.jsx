import React from 'react'
import styled from 'styled-components'

export const Nav = styled.nav`
width: 100%;
text-align: center;
display: flex;
padding: 1rem;
gap: 1rem;
justify-content: flex-end;
box-sizing: border-box;
`

export function AnimatedNav(props) {
    var navLinks = React.Children.toArray(props.children).slice(0,-1);
    var navToggle = React.Children.toArray(props.children).at(-1);
    function deleteLinks() {
        console.log('deleteLinks called');
        console.log('deleting' + navLinks);
    }
    return <Nav>{navLinks}<button style={{ all: 'unset', cursor: 'pointer' }} onClick={ deleteLinks }>{navToggle}</button></Nav>
}

export default Nav