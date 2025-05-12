import React from "react";

const LoginHeader = () => {
  return (
    <header className="home-header">
      <nav className="nav">
        <div className="home-logo">
          <a href="home">
            <img src={logo} alt="24 fit camp logo" />
          </a>
          <span>24-Fit Camp</span>
        </div>
        <ul className={`links ${open ? "active-nav" : ""}`} ref={navRef}>
          <li>
            <a href="#home" onClick={() => setOpen(false)}>
              Home
            </a>
          </li>
          <li>
            <a href="#programs" onClick={() => setOpen(false)}>
              Programs
            </a>
          </li>
          <li>
            <a href="#products" onClick={() => setOpen(false)}>
              Products
            </a>
          </li>
          <li>
            <a href="#pricing" onClick={() => setOpen(false)}>
              Pricing
            </a>
          </li>
          
        </ul>
        <HamburgerMenu navRef={navRef} open={open} setOpen={setOpen} />
      </nav>
    </header>
  );
};

export default LoginHeader;
