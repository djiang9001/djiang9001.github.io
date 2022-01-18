import React, { useState, useEffect } from 'react'

export { Link, Router, Location } from '@reach/router'

export function Wrap(props) {
    const [ready, setReady] = useState(false)

    useEffect(() => {
        if (typeof window !== undefined) {
        const timer = setTimeout(function() { //Start the timer
            setReady(true) //After 1 second, set render to true
        }.bind(this), 500)
        return () => clearTimeout(timer);
    }
    }, [])
    return ready ? <>{props.children}</> : null;
}
