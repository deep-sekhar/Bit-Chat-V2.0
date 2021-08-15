import React from 'react'
import '../css/Footer.css'

export const Footer = () => {
    return (
        <div>
                <footer>
        <p>Copyright&copy;deep-sekhar.github.io 2021 All rights reserved </p><span id="footlink"></span>
        
        <span>Follow us on:</span>
        <span class="footlogo">
            <a href="https://www.instagram.com/sekhharr/" target="_blank">
                <i class="fab fa-instagram-square fa-2x"></i>
            </a>
        </span>
        <span class="footlogo">
            <a href="https://www.facebook.com/Sekhharr/" target="_blank">
                <i class="fab fa-facebook-square fa-2x"></i>
            </a>
        </span>
        <span class="footlogo">
            <a href="https://discord.com/channels/787387160101650452/787387162441678890" target="_blank"></a>
            <i class="fab fa-discord fa-2x"></i>
        </span>
        <span class="footlogo">
            <a href="https://github.com/deep-sekhar" target="_blank">
                <i class="fab fa-github fa-2x"></i>
            </a>
        </span>
        <span class="footlogo">
            <a href="https://in.linkedin.com/in/deep-sekhar-ghosh-23478b208" target="_blank">
                <i class="fab fa-linkedin fa-2x"></i>
            </a>
        </span>
    </footer>
        </div>
    )
}
