import React from 'react';
import { MDBFooter, MDBBtn, MDBIcon } from 'mdbreact';

const Footer = () => {
    return (
        <MDBFooter color="blue" className="text-center font-small darken-2">
            <div className="pt-4">
                <MDBBtn outline color="white" tag="a" href="https://github.com/wederson/brain-back" target="_blank">Faça o download no Github <MDBIcon fab icon="github" className="ml-2"/></MDBBtn>
                <hr className="my4"/>
            </div>
            <div className="pb-4">
                <a href="https://web.facebook.com/brainagriculture"><MDBIcon fab icon="facebook" className="mr-3"/></a>
            </div>
            <p className="footer-copyright mb-0 py-3 text-center">
                &copy; {new Date().getFullYear()} Copyright: <a href="https://brain.agr.br/"> https://brain.agr.br/ </a>
            </p>
        </MDBFooter>
    );
}

export default Footer;