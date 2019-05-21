import React, { useRef } from 'react';

import classes from './Navbar.module.css';

const hidden = { display: 'none' };

const Navbar = ({ createBoard, readFile }) => {
    const fileInput = useRef(null);

    return (
        <div className={classes["navbar"]}>
            <form encType="multipart/form-data" onChange={e => readFile(e.target.files[0])} onClick={e => e.target.value = null}>
                <input ref={fileInput} style={hidden} type="file" accept="text/plain" />
            </form>
            <span onClick={() => fileInput.current.click()}
                className={classes["navbar__options"]}> Choose input file </span>
            <span onClick={createBoard} className={classes["navbar__options"]}> Create board </span>
        </div>
    )
};

export default Navbar;