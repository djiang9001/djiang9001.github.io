import React, { useState, useEffect } from 'react'

export { Link, Router, Location } from '@reach/router'

// This is needed to delay rendering of the router on first load
// This allows Box animations from routed pages to play on first load
// i.e. when the user first visits the site or refreshes the page
export function Wrap(props) {
    const [ready, setReady] = useState(false)

    useEffect(() => {
        const timer = setTimeout(function() {
            setReady(true)
        }.bind(this), 500)
        return () => clearTimeout(timer);
    }, [])
    return ready ? <>{props.children}</> : null;
}
